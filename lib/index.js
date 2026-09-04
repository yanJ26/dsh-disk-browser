import { readdir, stat, open, unlink, mkdir } from 'node:fs/promises'
import { createReadStream, createWriteStream } from 'node:fs'
import { resolve, dirname, join, basename, extname } from 'node:path'
import os from 'node:os'

const MAX_LIST = 2000
const READ_MAX = 262144
const MAX_UPLOAD = 1073741824

function writeJson(res, value, status = 200) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-cache',
  })
  res.end(JSON.stringify(value))
}

function fail(e) {
  const code = e && e.code
  if (code === 'ENOENT') return { ok: false, error: 'not-found' }
  if (code === 'EACCES' || code === 'EPERM') return { ok: false, error: 'forbidden' }
  return { ok: false, error: String((e && e.message) || e) }
}

function query(req) {
  return new URL(req.url, 'http://localhost').searchParams
}

export const name = 'dsh-disk-browser'
export const inject = ['webServer']

export function apply(ctx) {
  ctx.webServer.register({
    kind: 'exact',
    path: '/disk-browser/api/list',
    handler: async (req, res) => {
      try {
        const q = query(req)
        const showHidden = q.get('hidden') === '1'
        const abs = resolve(q.get('path') || os.homedir())
        const st = await stat(abs)
        if (!st.isDirectory()) return writeJson(res, { ok: false, error: 'not-directory' }, 400)
        const dirents = await readdir(abs, { withFileTypes: true })
        const entries = []
        for (const d of dirents) {
          const hidden = d.name.startsWith('.')
          if (!showHidden && hidden) continue
          let size = 0
          let mtime = 0
          let dir = d.isDirectory()
          try {
            const s = await stat(join(abs, d.name))
            size = s.size
            mtime = s.mtimeMs
            dir = s.isDirectory()
          } catch {}
          entries.push({ name: d.name, dir, size, mtime, hidden, link: d.isSymbolicLink() })
        }
        entries.sort((a, b) => (b.dir ? 1 : 0) - (a.dir ? 1 : 0) || a.name.localeCompare(b.name))
        const truncated = entries.length > MAX_LIST
        const parent = dirname(abs)
        writeJson(res, {
          ok: true,
          path: abs,
          parent: parent === abs ? null : parent,
          entries: entries.slice(0, MAX_LIST),
          truncated,
          home: os.homedir(),
        })
      } catch (e) {
        writeJson(res, fail(e), 400)
      }
    },
  })

  ctx.webServer.register({
    kind: 'exact',
    path: '/disk-browser/api/read',
    handler: async (req, res) => {
      try {
        const q = query(req)
        const p = q.get('path')
        if (!p) return writeJson(res, { ok: false, error: 'missing-path' }, 400)
        const abs = resolve(p)
        const st = await stat(abs)
        if (st.isDirectory()) return writeJson(res, { ok: false, error: 'is-directory' }, 400)
        const fh = await open(abs, 'r')
        try {
          const len = Math.min(st.size, READ_MAX)
          const buf = Buffer.alloc(len)
          await fh.read(buf, 0, len, 0)
          const binary = buf.includes(0)
          writeJson(res, {
            ok: true,
            path: abs,
            size: st.size,
            mtime: st.mtimeMs,
            truncated: st.size > READ_MAX,
            binary,
            text: binary ? null : buf.toString('utf8'),
          })
        } finally {
          await fh.close()
        }
      } catch (e) {
        writeJson(res, fail(e), 400)
      }
    },
  })

  const IMAGE_TYPES = {
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.gif': 'image/gif', '.webp': 'image/webp', '.bmp': 'image/bmp',
    '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.avif': 'image/avif',
  }

  ctx.webServer.register({
    kind: 'exact',
    path: '/disk-browser/api/image',
    handler: async (req, res) => {
      try {
        const p = query(req).get('path')
        if (!p) return writeJson(res, { ok: false, error: 'missing-path' }, 400)
        const abs = resolve(p)
        const type = IMAGE_TYPES[extname(abs).toLowerCase()]
        if (!type) return writeJson(res, { ok: false, error: 'not-image' }, 400)
        const st = await stat(abs)
        if (st.isDirectory()) return writeJson(res, { ok: false, error: 'is-directory' }, 400)
        res.writeHead(200, {
          'content-type': type,
          'content-length': st.size,
          'cache-control': 'no-store',
        })
        const rs = createReadStream(abs)
        rs.pipe(res)
        await new Promise((ok, bad) => {
          rs.on('end', ok)
          rs.on('error', bad)
          res.on('error', bad)
        })
      } catch (e) {
        if (!res.headersSent) writeJson(res, fail(e), 400)
        else res.end()
      }
    },
  })

  ctx.webServer.register({
    kind: 'exact',
    path: '/disk-browser/api/download',
    handler: async (req, res) => {
      try {
        const p = query(req).get('path')
        if (!p) return writeJson(res, { ok: false, error: 'missing-path' }, 400)
        const abs = resolve(p)
        const st = await stat(abs)
        if (st.isDirectory()) return writeJson(res, { ok: false, error: 'is-directory' }, 400)
        res.writeHead(200, {
          'content-type': 'application/octet-stream',
          'content-length': st.size,
          'content-disposition': "attachment; filename*=UTF-8''" + encodeURIComponent(basename(abs)),
          'cache-control': 'no-store',
        })
        const rs = createReadStream(abs)
        rs.pipe(res)
        await new Promise((ok, bad) => {
          rs.on('end', ok)
          rs.on('error', bad)
          res.on('error', bad)
        })
      } catch (e) {
        if (!res.headersSent) writeJson(res, fail(e), 400)
        else res.end()
      }
    },
  })

  ctx.webServer.register({
    kind: 'exact',
    path: '/disk-browser/api/upload',
    handler: async (req, res) => {
      try {
        if (req.method !== 'POST' && req.method !== 'PUT') {
          return writeJson(res, { ok: false, error: 'method-not-allowed' }, 405)
        }
        const q = query(req)
        const dir = resolve(q.get('dir') || '')
        const rawName = q.get('name') || ''
        const nm = basename(rawName)
        if (!nm || nm === '.' || nm === '..' || nm !== rawName) {
          return writeJson(res, { ok: false, error: 'bad-name' }, 400)
        }
        const ds = await stat(dir).catch(() => null)
        if (!ds || !ds.isDirectory()) return writeJson(res, { ok: false, error: 'bad-dir' }, 400)
        const dst = join(dir, nm)
        if (q.get('overwrite') !== '1') {
          const ex = await stat(dst).catch(() => null)
          if (ex) return writeJson(res, { ok: false, error: 'exists' }, 409)
        }
        const ws = createWriteStream(dst)
        let size = 0
        let tooLarge = false
        try {
          for await (const chunk of req) {
            size += chunk.length
            if (size > MAX_UPLOAD) {
              tooLarge = true
              break
            }
            if (!ws.write(chunk)) await new Promise((r) => ws.once('drain', r))
          }
        } finally {
          ws.end()
          await new Promise((r) => ws.once('close', r))
        }
        if (tooLarge) {
          await unlink(dst).catch(() => {})
          return writeJson(res, { ok: false, error: 'too-large' }, 413)
        }
        writeJson(res, { ok: true, size })
      } catch (e) {
        writeJson(res, fail(e), 400)
      }
    },
  })

  ctx.webServer.register({
    kind: 'exact',
    path: '/disk-browser/api/mkdir',
    handler: async (req, res) => {
      try {
        if (req.method !== 'POST') {
          return writeJson(res, { ok: false, error: 'method-not-allowed' }, 405)
        }
        const q = query(req)
        const dir = resolve(q.get('dir') || '')
        const rawName = q.get('name') || ''
        const nm = basename(rawName)
        if (!nm || nm === '.' || nm === '..' || nm !== rawName) {
          return writeJson(res, { ok: false, error: 'bad-name' }, 400)
        }
        const ds = await stat(dir).catch(() => null)
        if (!ds || !ds.isDirectory()) return writeJson(res, { ok: false, error: 'bad-dir' }, 400)
        const dst = join(dir, nm)
        const ex = await stat(dst).catch(() => null)
        if (ex) return writeJson(res, { ok: false, error: 'exists' }, 409)
        await mkdir(dst, { mode: 0o755 })
        writeJson(res, { ok: true, path: dst })
      } catch (e) {
        writeJson(res, fail(e), 400)
      }
    },
  })
}
