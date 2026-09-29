# 个人作品集

中文个人作品集，使用 Astro、TypeScript、原生 CSS 与 Content Collections。静态部署到 https://1244075201.github.io/ 。

## 本地开发

使用 `.node-version` 中指定的 Node.js 24.21.0，然后运行：

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

本机已下载的独立运行环境位于被忽略的 `.runtime/node-v24.21.0-win-x64`。PowerShell 会话中可临时设置（不改变系统 Node）：

```powershell
$env:Path = "$PWD\.runtime\node-v24.21.0-win-x64;$env:Path"
npm.cmd run dev
```

## 更新个人资料

编辑 `src/data/profile.ts`，填入已确认公开的 name、basics（学校/专业等字符串数组）、introduction、email 和 resume。缺失信息自动显示明确占位，不设置目标岗位标签。

将真实简历放到 `public/resume.pdf`，设置 `resume: '/resume.pdf'` 即可启用入口。未提供时不要创建占位 PDF。

## 新增或编辑项目

在 `src/content/projects/` 新增一个 Markdown 文件。最小元数据示例（仅为格式示例，不是实际项目经历）：

```yaml
---
slug: your-project
title: 项目名称
category: lab
order: 5
featured: false
display: case-study
contentStatus: placeholder
---
```

正文使用 Markdown 二级标题组织章节。分类固定为 `ai`（AI 与 Agent）、`games`（游戏与交互）、`lab`（产品实验室）。`featured: true` 会在首页对应分类展示。`display: gallery` 仅显示卡片，不生成详情页。

`contentStatus` 是案例文档状态：placeholder / partial / complete；`projectStatus` 是可选的真实项目进展，两者不要混用。可选字段包括 summary、role、period、technologies、links。缺失字段不展示。

资源放到 `public/projects/<slug>/`，使用 `/projects/<slug>/image.webp` 这样的路径。cover 为 `{ src, alt }`；media 为数组，每项包含 type（image/video）、src、alt，以及可选 caption、poster。请压缩图片、为视频提供字幕或文字说明，不提交大型原始录屏。外链 links 为 `{ label, url }` 数组，使用 HTTPS。

构建会检查 slug 唯一性、资源存在性、站内链接和页面元信息。长案例达到四个二级标题且不再是 placeholder 时自动显示目录。

## TFT 迭代记录

在项目元数据中设置 `showTimeline: true`，填写 iterations 数组。每项必须有 version 和 problem；按真实资料补充 evidence、change、result、next。空数组显示“迭代记录待补充”。不要把计划中的评测写成已取得的结果。

## 发布

仓库 `1244075201/1244075201.github.io`，默认分支 main。GitHub Settings → Pages → Source 使用 GitHub Actions。推送 main 后，工作流先安装依赖、检查类型及构建，再发布 dist。失败的检查不会进入部署。

无需手动提交 dist，无需额外 Token。推送后检查 Actions 结果及线上首页和详情页；恢复旧版可使用 git revert 撤销有问题的提交，再推送触发部署。

## 验收

- `npm run check` 和 `npm run build` 通过。
- 在 375 / 768 / 1440px 检查布局、导航、键盘焦点和简历状态。
- 所有详情地址可以独立打开和刷新；404 提供返回入口。
- 个人信息、案例素材与成果未提供时明确占位，不虚构内容。

V0.1 不包含 CMS、后台、在线 Agent、多语言和主题切换。
