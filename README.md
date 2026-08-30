# dsh-disk-browser

DeepSeek Harness (DSH) web 插件:侧边栏一键浏览**服务器磁盘任意目录**(含隐藏文件夹),支持文件预览、下载与上传。

English summary: a sidebar plugin for `dsh web` to browse any folder on the server disk (including hidden ones), with text preview, download and upload.

## 功能

- 📂 侧边栏「文件夹」按钮,打开全屏/弹窗式磁盘浏览器(默认从 `/` 开始)
- 🕶 隐藏文件默认显示(可关闭);隐藏项半透明标记
- 🧭 面包屑导航、路径输入框跳转、上一级 / 家目录快捷按钮
- 👁 文本文件预览(前 256 KB,二进制只显示大小)
- ⬇️ 文件下载:行内下载按钮 + 预览面板下载按钮(流式,支持中文文件名)
- ⬆️ 文件上传:工具栏多选上传 + 直接拖拽进列表;同名弹确认后可覆盖;单文件上限 1 GB
- 📱 响应式:宽侧边栏显示「图标 + 文件夹」,窄栏(手机)仅图标;弹窗在移动端全屏

## 兼容性

- dsh web 0.1.x(在 0.1.1-rc.2 验证)
- Node.js ≥ 20
- 零第三方依赖

## 安装

```bash
git clone https://github.com/yanj26/dsh-disk-browser.git
cd dsh-disk-browser
dsh plugin --profile web add .
```

然后重启 `dsh web`(或对应的 systemd 服务),浏览器强制刷新即可在侧边栏底部看到「文件夹」按钮。

### 反向代理子路径部署注意

如果你的 DSH 通过 nginx 等反代挂在子路径(如 `https://example.com/dsh/`),
需要把插件的根路径接口也转发到 DSH,否则打开面板报错:

```nginx
location ~ ^/disk-browser(/|$) {
    proxy_pass http://127.0.0.1:<DSH端口>;
    proxy_http_version 1.1;
    proxy_read_timeout 600s;
    proxy_send_timeout 600s;
    proxy_buffering off;
}
```

直接以根路径暴露的部署无需任何额外配置。

## HTTP API

| 路径 | 说明 |
|---|---|
| `GET /disk-browser/api/list?path=&hidden=1` | 列目录(目录优先,上限 2000 项) |
| `GET /disk-browser/api/read?path=` | 读取文件头部(≤256KB,二进制检测) |
| `GET /disk-browser/api/download?path=` | 流式下载(中文文件名安全) |
| `POST /disk-browser/api/upload?dir=&name=[&overwrite=1]` | 上传(请求体即文件内容,≤1GB) |

## ⚠️ 安全提示

- 该插件对**任何已登录 DSH 的用户**开放整盘只读浏览与任意目录写入(上传),请以 root/普通用户的实际权限理解它;不要在共享多人的 DSH 上安装,或安装前自行收紧路由
- 上传接口会校验文件名(禁止路径穿越),同名默认拒绝、显式 `overwrite=1` 才覆盖

## 卸载

```bash
dsh plugin --profile web remove dsh-disk-browser
```

## License

MIT

## 作者 / Author

- yanJ26 — <yanj.rvs@gmail.com>
