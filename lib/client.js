window.__ModuleLoader__.load({
  id: "dsh-disk-browser",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    var react = require("react");
    var h = react.createElement;
    var useState = react.useState;
    var useEffect = react.useEffect;
    var useCallback = react.useCallback;
    var useRef = react.useRef;

    var CSS = [
      ".dshdb-sbbtn{display:flex;align-items:center;gap:8px;width:100%;border:0;background:transparent;color:var(--dsw-alias-label-secondary,#9a9a9a);font:inherit;font-size:13px;padding:7px 10px;border-radius:10px;cursor:pointer;text-align:left;white-space:nowrap}",
      ".dshdb-sbbtn:hover{background:var(--dsw-alias-interactive-bg-hover,#8080801f);color:var(--dsw-alias-label-primary,#e8e8e8)}",
      ".dshdb-sbbtn svg{flex:none}",
      ".dshdb-sbbtn--narrow{justify-content:center;padding:8px 0}",
      ".dshdb-sbbtn--narrow span{display:none}",
      ".dshdb-layer{position:fixed;inset:0;z-index:120;background:#0006;display:flex;align-items:center;justify-content:center}",
      ".dshdb-dlg{background:var(--dsw-alias-bg-layer-2,#262626);color:var(--dsw-alias-label-primary,#e8e8e8);border:1px solid var(--dsw-alias-border-inverted,#80808047);border-radius:16px;box-shadow:var(--dsw-shadow-lv3,0 12px 32px #00000059);width:min(760px,96vw);height:min(72vh,760px);min-height:320px;display:flex;flex-direction:column;overflow:hidden;font:13px/1.45 -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Microsoft YaHei,sans-serif}",
      "@media (max-width:700px){.dshdb-dlg{width:100vw;height:100dvh;border-radius:0;border:0}}",
      ".dshdb-head{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid var(--dsw-alias-border-l3,#80808033);flex:none}",
      ".dshdb-title{font-size:14px;font-weight:600;flex:none}",
      ".dshdb-path{flex:1;min-width:0;height:30px;border:1px solid var(--dsw-alias-border-l2,#80808059);background:transparent;color:var(--dsw-alias-label-primary,#e8e8e8);border-radius:8px;padding:0 8px;font:inherit;font-size:12px}",
      ".dshdb-path:focus{outline:none;border-color:var(--dsw-alias-state-business-primary,#4176e6)}",
      ".dshdb-img{display:block;margin:12px auto;max-width:calc(100% - 24px);max-height:calc(100% - 24px);object-fit:contain}",
      ".dshdb-btn{flex:none;height:30px;border:1px solid var(--dsw-alias-border-l2,#80808059);background:transparent;color:var(--dsw-alias-label-secondary,#9a9a9a);border-radius:8px;padding:0 10px;font:inherit;font-size:12px;cursor:pointer;display:inline-flex;align-items:center;gap:4px}",
      ".dshdb-btn:hover{color:var(--dsw-alias-label-primary,#e8e8e8);background:var(--dsw-alias-interactive-bg-hover,#8080801f)}",
      ".dshdb-btn:disabled{opacity:.5;cursor:not-allowed}",
      ".dshdb-toolbar{display:flex;align-items:center;gap:10px;padding:8px 14px;border-bottom:1px solid var(--dsw-alias-border-l3,#80808033);flex:none;flex-wrap:wrap}",
      ".dshdb-crumb{display:flex;align-items:center;gap:2px;flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;flex:1;min-width:0;font-size:12px;color:var(--dsw-alias-label-secondary,#9a9a9a)}",
      ".dshdb-crumb::-webkit-scrollbar{display:none}",
      ".dshdb-seg{border:0;background:transparent;color:var(--dsw-alias-label-secondary,#9a9a9a);font:inherit;font-size:12px;cursor:pointer;padding:2px 4px;border-radius:6px;flex:none;white-space:nowrap}",
      ".dshdb-seg:hover{color:var(--dsw-alias-label-primary,#e8e8e8);background:var(--dsw-alias-interactive-bg-hover,#8080801f)}",
      ".dshdb-check{display:inline-flex;align-items:center;gap:5px;font-size:12px;color:var(--dsw-alias-label-secondary,#9a9a9a);cursor:pointer;flex:none}",
      ".dshdb-body{flex:1;display:flex;min-height:0;overflow:hidden;position:relative}",
      ".dshdb-list{flex:1;overflow:auto;padding:4px 8px}",
      ".dshdb-list--drop{outline:2px dashed var(--dsw-alias-state-business-primary,#4176e6);outline-offset:-6px;border-radius:12px}",
      ".dshdb-row{display:flex;align-items:center;gap:8px;width:100%;border:0;background:transparent;color:inherit;font:inherit;text-align:left;padding:5px 10px;border-radius:8px;cursor:pointer;white-space:nowrap}",
      ".dshdb-row:hover{background:var(--dsw-alias-interactive-bg-hover,#8080801f)}",
      ".dshdb-name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;font-size:12.5px}",
      ".dshdb-dir .dshdb-name{font-weight:600}",
      ".dshdb-hidden{opacity:.62}",
      ".dshdb-meta{flex:none;color:var(--dsw-alias-label-caption,#8a8a8a);font-size:11px;font-variant-numeric:tabular-nums}",
      "@media (max-width:700px){.dshdb-meta-time{display:none}}",
      ".dshdb-dl{flex:none;width:24px;height:24px;border:0;border-radius:6px;background:transparent;color:var(--dsw-alias-label-caption,#8a8a8a);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;opacity:0}",
      ".dshdb-row:hover .dshdb-dl{opacity:1}",
      ".dshdb-dl:hover{background:var(--dsw-alias-interactive-bg-hover,#80808024);color:var(--dsw-alias-state-business-primary,#4176e6)}",
      "@media (hover:none){.dshdb-dl{opacity:.85}}",
      ".dshdb-preview{flex:none;width:min(340px,42%);border-left:1px solid var(--dsw-alias-border-l3,#80808033);display:flex;flex-direction:column;min-width:0;background:var(--dsw-alias-bg-layer-1,#222)}",
      "@media (max-width:700px){.dshdb-preview{position:absolute;inset:0;width:auto;border:0;z-index:2}}",
      ".dshdb-pvhead{display:flex;align-items:center;gap:6px;padding:10px 12px;border-bottom:1px solid var(--dsw-alias-border-l3,#80808033);flex:none}",
      ".dshdb-pvname{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12.5px;font-weight:600}",
      ".dshdb-pre{flex:1;margin:0;padding:10px 12px;overflow:auto;white-space:pre;color:var(--dsw-alias-label-primary,#e8e8e8);font:11.5px/1.6 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}",
      ".dshdb-note{padding:14px 16px;color:var(--dsw-alias-label-caption,#8a8a8a);font-size:12px}",
      ".dshdb-note-err{color:var(--dsw-alias-state-error-primary,#e5484d)}",
      ".dshdb-status{padding:10px 14px;color:var(--dsw-alias-label-caption,#8a8a8a);font-size:12px;flex:none;border-top:1px solid var(--dsw-alias-border-l3,#80808033)}"
    ].join("\n");

    if (typeof document !== "undefined" && !document.querySelector("style[data-plugin-css=\"dsh-disk-browser\"]")) {
      var tag = document.createElement("style");
      tag.dataset.plugin = "dsh-disk-browser";
      tag.dataset.pluginCss = "dsh-disk-browser";
      tag.textContent = CSS;
      document.head.appendChild(tag);
    }

    function api(name, params) {
      var qs = new URLSearchParams(params).toString();
      return fetch("/disk-browser/api/" + name + "?" + qs).then(function (r) { return r.json(); });
    }

    function fullPath(cwd, name) {
      return cwd.replace(/\/+$/, "") + "/" + name;
    }

    function isImage(name) {
      return /\.(png|jpe?g|gif|webp|bmp|svg|ico|avif)$/i.test(name);
    }

    function download(path) {
      var a = document.createElement("a");
      a.href = "/disk-browser/api/download?path=" + encodeURIComponent(path);
      a.download = "";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }

    function fmtSize(n) {
      if (n >= 1073741824) return (n / 1073741824).toFixed(1) + " GB";
      if (n >= 1048576) return (n / 1048576).toFixed(1) + " MB";
      if (n >= 1024) return (n / 1024).toFixed(1) + " KB";
      return n + " B";
    }

    function fmtTime(ms) {
      if (!ms) return "";
      var d = new Date(ms);
      var p = function (x) { return String(x).padStart(2, "0"); };
      return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes());
    }

    var FOLDER = h("svg", { width: 15, height: 15, viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": true },
      h("path", { d: "M1.5 3.25c0-.69.56-1.25 1.25-1.25h3.379a1.25 1.25 0 0 1 .947.434l.672.816c.236.287.589.434.952.434h4.55c.69 0 1.25.56 1.25 1.25v7.316c0 .69-.56 1.25-1.25 1.25h-10.5c-.69 0-1.25-.56-1.25-1.25V3.25Z" }));
    var FILE = h("svg", { width: 13, height: 13, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", "aria-hidden": true },
      h("path", { d: "M4 1.5h5.5L13 5v9.5H4V1.5Z", strokeWidth: 1.2 }),
      h("path", { d: "M9.5 1.5V5H13", strokeWidth: 1.2 }));
    var DL = h("svg", { width: 12, height: 12, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.6, "aria-hidden": true },
      h("path", { d: "M8 2v8m0 0 3-3M8 10 5 7M2.5 13.5h11" }));
    var UL = h("svg", { width: 12, height: 12, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.6, "aria-hidden": true },
      h("path", { d: "M8 10V2m0 0 3 3M8 2 5 5M2.5 13.5h11" }));

    function Browser(props) {
      var cwd0 = useState(props.initialPath || "/");
      var cwd = cwd0[0], setCwd = cwd0[1];
      var input0 = useState(cwd);
      var input = input0[0], setInput = input0[1];
      var hidden0 = useState(true);
      var hidden = hidden0[0], setHidden = hidden0[1];
      var data0 = useState(null);
      var data = data0[0], setData = data0[1];
      var err0 = useState("");
      var err = err0[0], setErr = err0[1];
      var loading0 = useState(false);
      var loading = loading0[0], setLoading = loading0[1];
      var pv0 = useState(null);
      var pv = pv0[0], setPv = pv0[1];
      var up0 = useState("");
      var upStatus = up0[0], setUpStatus = up0[1];
      var drop0 = useState(false);
      var dropping = drop0[0], setDropping = drop0[1];
      var fileRef = useRef(null);

      var load = useCallback(function (p) {
        setLoading(true); setErr(""); setPv(null); setInput(p);
        api("list", { path: p, hidden: hidden ? "1" : "0" }).then(function (r) {
          if (r.ok) { setData(r); setCwd(r.path); setInput(r.path); }
          else setErr(r.error || "error");
        }).catch(function () { setErr("network"); }).finally(function () { setLoading(false); });
      }, [hidden]);

      useEffect(function () { load(cwd); }, [hidden]);

      // 移动端优化：路径变化后把输入框滚到末尾，避免长路径只显示开头
      useEffect(function () {
        var el = document.querySelector(".dshdb-path");
        if (el && document.activeElement !== el) {
          try { el.setSelectionRange(el.value.length, el.value.length); } catch (e) { /* 忽略 */ }
        }
      }, [input]);

      // 移动端优化：面包屑横向滚动到当前目录段
      useEffect(function () {
        var el = document.querySelector(".dshdb-crumb");
        if (el) el.scrollLeft = el.scrollWidth;
      }, [cwd]);

      var openFile = function (name) {
        var p = fullPath(cwd, name);
        if (isImage(name)) { setPv({ name: name, path: p, image: true }); return; }
        setPv({ name: name, path: p, loading: true });
        api("read", { path: p }).then(function (r) {
          setPv({ name: name, path: p, loading: false, r: r });
        }).catch(function () { setPv({ name: name, path: p, loading: false, err: "network" }); });
      };

      var uploadFiles = function (files) {
        var list = Array.from(files || []);
        if (!list.length) return;
        var dir = cwd;
        var i = 0;
        var chain = Promise.resolve();
        list.forEach(function (f) {
          chain = chain.then(function () {
            i += 1;
            setUpStatus("\u4e0a\u4f20\u4e2d " + i + "/" + list.length + ":" + f.name + "\uff08" + fmtSize(f.size) + "\uff09");
            var attempt = function (overwrite) {
              var qs = new URLSearchParams({ dir: dir, name: f.name });
              if (overwrite) qs.set("overwrite", "1");
              return fetch("/disk-browser/api/upload?" + qs.toString(), { method: "POST", body: f })
                .then(function (r) { return r.json().then(function (j) { return { status: r.status, j: j }; }); });
            };
            return attempt(false).then(function (o) {
              if (o.status === 409 && o.j.error === "exists") {
                var yes = window.confirm("\u6587\u4ef6\u5df2\u5b58\u5728\uff0c\u8986\u76d6\u5417\uff1f\n" + f.name);
                if (yes) return attempt(true);
              }
              if (!o.j.ok) throw new Error(o.j.error || "upload-failed");
            });
          }).catch(function (e) {
            setUpStatus("\u4e0a\u4f20\u5931\u8d25:" + String(e.message || e));
          });
        });
        chain.then(function () {
          setUpStatus("");
          load(dir);
        });
      };

      var segs = cwd === "/" ? [""] : cwd.split("/");
      var crumbs = [];
      var acc = "";
      segs.forEach(function (s, i) {
        if (i === 0 && s === "") { acc = "/"; }
        else { acc = acc === "/" ? "/" + s : acc + "/" + s; }
        var target = acc;
        crumbs.push(h("button", { key: i, className: "dshdb-seg", onClick: function () { load(target); } }, i === 0 ? "/" : s));
        if (i < segs.length - 1 && !(i === 0 && s === "")) crumbs.push(h("span", { key: "s" + i }, "/"));
        if (i === 0 && segs.length > 1) crumbs.push(h("span", { key: "s0" }, ""));
      });

      return h("div", { className: "dshdb-layer", onClick: props.onClose },
        h("div", { className: "dshdb-dlg", onClick: function (e) { e.stopPropagation(); } },
          h("div", { className: "dshdb-head" },
            h("span", { className: "dshdb-title" }, "\u78c1\u76d8\u6587\u4ef6"),
            h("input", {
              className: "dshdb-path", value: input, spellCheck: false,
              onChange: function (e) { setInput(e.target.value); },
              onKeyDown: function (e) { if (e.key === "Enter") load(input); }
            }),
            h("button", { className: "dshdb-btn", onClick: function () { load(input); } }, "\u8df3\u8f6c"),
            h("button", { className: "dshdb-btn", onClick: props.onClose }, "\u2715")),
          h("div", { className: "dshdb-toolbar" },
            h("div", { className: "dshdb-crumb" }, crumbs),
            data && data.parent ? h("button", { className: "dshdb-btn", onClick: function () { load(data.parent); } }, "\u2191 \u4e0a\u7ea7") : null,
            data ? h("button", { className: "dshdb-btn", onClick: function () { load(data.home); } }, "\u5bb6\u76ee\u5f55") : null,
            h("button", { className: "dshdb-btn", disabled: !!upStatus, onClick: function () { if (fileRef.current) fileRef.current.click(); } }, UL, "\u4e0a\u4f20"),
            h("input", {
              ref: fileRef, type: "file", multiple: true, style: { display: "none" },
              onChange: function (e) { uploadFiles(e.target.files); e.target.value = ""; }
            }),
            h("label", { className: "dshdb-check" },
              h("input", { type: "checkbox", checked: hidden, onChange: function (e) { setHidden(e.target.checked); } }),
              "\u663e\u793a\u9690\u85cf\u6587\u4ef6")),
          h("div", { className: "dshdb-body" },
            h("div", {
              className: "dshdb-list" + (dropping ? " dshdb-list--drop" : ""),
              onDragOver: function (e) { e.preventDefault(); setDropping(true); },
              onDragLeave: function () { setDropping(false); },
              onDrop: function (e) { e.preventDefault(); setDropping(false); uploadFiles(e.dataTransfer && e.dataTransfer.files); }
            },
              loading ? h("div", { className: "dshdb-note" }, "\u52a0\u8f7d\u4e2d\u2026") :
              err ? h("div", { className: "dshdb-note dshdb-note-err" }, "\u52a0\u8f7d\u5931\u8d25:" + err) :
              data && data.entries.length === 0 ? h("div", { className: "dshdb-note" }, "\u7a7a\u76ee\u5f55\uff08\u53ef\u62d6\u62fd\u6587\u4ef6\u5230\u6b64\u5904\u4e0a\u4f20\uff09") :
              data ? data.entries.map(function (e) {
                return h("button", {
                  key: e.name,
                  className: "dshdb-row" + (e.dir ? " dshdb-dir" : "") + (e.hidden ? " dshdb-hidden" : ""),
                  onClick: function () { if (e.dir) load(fullPath(cwd, e.name)); else openFile(e.name); }
                },
                  e.dir ? FOLDER : FILE,
                  h("span", { className: "dshdb-name" }, e.name + (e.link ? " \u2192" : "")),
                  h("span", { className: "dshdb-meta" }, e.dir ? "" : fmtSize(e.size)),
                  h("span", { className: "dshdb-meta dshdb-meta-time" }, fmtTime(e.mtime)),
                  e.dir ? null : h("span", {
                    role: "button", className: "dshdb-dl", title: "\u4e0b\u8f7d",
                    onClick: function (ev) { ev.stopPropagation(); download(fullPath(cwd, e.name)); }
                  }, DL));
              }) : null,
              data && data.truncated ? h("div", { className: "dshdb-note" }, "\u6761\u76ee\u8fc7\u591a\uff0c\u4ec5\u663e\u524d 2000 \u9879") : null),
            pv ? h("div", { className: "dshdb-preview" },
              h("div", { className: "dshdb-pvhead" },
                h("span", { className: "dshdb-pvname" }, pv.name),
                h("button", { className: "dshdb-btn", onClick: function () { download(pv.path); } }, DL, "\u4e0b\u8f7d"),
                h("button", { className: "dshdb-btn", onClick: function () { setPv(null); } }, "\u2715")),
              pv.loading ? h("div", { className: "dshdb-note" }, "\u52a0\u8f7d\u4e2d\u2026") :
              pv.err ? h("div", { className: "dshdb-note dshdb-note-err" }, pv.err) :
              pv.image ? h("img", { className: "dshdb-img", src: "/disk-browser/api/image?path=" + encodeURIComponent(pv.path), alt: pv.name }) :
              pv.r && !pv.r.ok ? h("div", { className: "dshdb-note dshdb-note-err" }, String(pv.r.error)) :
              pv.r && pv.r.binary ? h("div", { className: "dshdb-note" }, "\u4e8c\u8fdb\u5236\u6587\u4ef6\uff0c" + fmtSize(pv.r.size)) :
              pv.r ? [
                h("pre", { key: "p", className: "dshdb-pre" }, pv.r.text),
                pv.r.truncated ? h("div", { className: "dshdb-note", key: "t" }, "\u6587\u4ef6\u8f83\u5927\uff0c\u4ec5\u9884\u89c8\u524d 256 KB") : null
              ] : null) : null),
          h("div", { className: "dshdb-status" },
            upStatus || (data ? cwd + " \u00b7 " + data.entries.length + " \u9879" : ""))));
    }

    function SidebarButton(props) {
      var st = useState(false);
      var open = st[0], setOpen = st[1];
      var wide = props && props.wide;
      return h(react.Fragment, null,
        h("button", {
          className: "dshdb-sbbtn" + (wide ? "" : " dshdb-sbbtn--narrow"),
          onClick: function () { setOpen(true); },
          title: "\u78c1\u76d8\u6587\u4ef6\u6d4f\u89c8"
        }, FOLDER, h("span", null, "\u6587\u4ef6\u5939")),
        open ? h(Browser, { onClose: function () { setOpen(false); }, initialPath: "/" }) : null);
    }

    function apply(ctx) {
      var slots = ctx.get("slots");
      if (slots === void 0) return;
      slots.inject("sidebar.footer.action", function () {
        return slots.register({
          name: "sidebar.footer.action",
          id: "dsh-disk-browser",
          order: 50
        }, function (props) { return h(SidebarButton, props || {}); });
      });
    }

    exports.apply = apply;
    exports.inject = ["slots"];
    return module.exports;
  }
});
