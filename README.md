# NYC Driver Tracker — 最终交付包

## 4 个需要上传到 GitHub 的文件

| 文件 | 作用 | 大小 |
|---|---|---|
| `app.js` | 主程序 v30 | ~270 KB |
| `index.html` | 入口（引用 v=30）| ~4.5 KB |
| `sw.js` | Service Worker (cache v6) | ~4.4 KB |
| `manifest.json` | PWA 清单 | ~540 B |

## 你还要带的（从你电脑/旧仓库拿）

- `icon-192.png`
- `icon-512.png`

总共 **6 个文件**丢到 GitHub 仓库根目录。

## 当前版本信息

- App version: **v30**
- Cache version: **nyc-driver-v6**
- 部署地址: https://nyc775885.github.io/nyc-driver-app/

## 上传到 GitHub（重要规则）

⚠️ **绝对不要在浏览器或编辑器里复制粘贴文本** — 否则文件会被压成 1 行或编码损坏。

正确做法：
1. 解压本 zip 包
2. GitHub 仓库 → 删掉旧的 4 个同名文件 → commit
3. "Add file" → "Upload files" → **直接拖** 4 个文件（不要打开任何一个）
4. commit
5. 等 30-60 秒 GitHub Pages 部署生效

## 主要功能（v30）

- ✅ 收入/支出记账（按周/月/年汇总）
- ✅ 月结类别（拥堵费、平台费等）
- ✅ 固定月费自动生成
- ✅ TLC 执照到期提醒
- ✅ 税务中心（Schedule C/SE 估算 + 联邦+州+市税估算）
- ✅ 税务 PDF 导出（按 IRS 年度里程率）
- ✅ Google Drive 自动同步
- ✅ 中英文双语
- ✅ 闲置 1 小时自动登出
- ✅ 自定义类别 + 自定义大类
- ✅ 自定义平台
- ✅ 备注/记事本
- ✅ Android 装到主屏幕（PWA）

## 以后改代码怎么更新

每次改完 `app.js` 后：
1. 把 `index.html` 里的 `?v=30` 改成下个数字（按跳 4 规则：30 → 31 → ... → 33 → 35 → ...）
2. 把 `sw.js` 里 `'./app.js?v=30'` 改成同样数字
3. 如果改了 sw.js 的逻辑（不只是版本号），把 `CACHE_VERSION = 'nyc-driver-v6'` 也升一级（v6 → v7）
4. 上传变化的文件
5. 等部署生效

## OAuth Client ID

写死在 `app.js` 里：
```
191679830947-efrr8o2em07oo9q88co37rd57qnnb0ai.apps.googleusercontent.com
```

如果以后换部署域名，必须在 Google Cloud Console:
1. APIs & Services → Credentials
2. 找到这个 Client ID 编辑
3. Authorized JavaScript origins 加上新域名

## 常见问题排查

| 现象 | 通常原因 |
|---|---|
| 白屏 | index.html 上传时被压成 1 行 → 重传 |
| 满屏 ?? | 文件编码错（不是 UTF-8）→ 用记事本另存为 UTF-8 重传 |
| 登录后白屏 | OAuth origin 没配 → Google Cloud Console 加域名 |
| 改完代码看不到新版 | 没改 ?v= 版本号；或 SW 缓存了；隐私窗口 + Ctrl+Shift+R |
| Manifest Syntax error | manifest.json 损坏 → 重新用记事本 UTF-8 保存 |

---

祝跑车顺利、记账省心。
