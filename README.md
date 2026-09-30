# 个人作品集 V0.2

中文作品集，Astro / TypeScript / 原生 CSS。线上：https://1244075201.github.io/ 。

## 本地开发

使用 `.node-version` 指定的 Node.js 24.21.0，执行 `npm ci`、`npm run dev`。
提交前执行 `npm run check` 和 `npm run build`，以 `npm run preview` 检查生产页面。
本机独立 Node 位于 `.runtime/node-v24.21.0-win-x64`，不修改系统安装：

```powershell
$env:Path = "$PWD\.runtime\node-v24.21.0-win-x64;$env:Path"
npm.cmd run dev
```

## 目录与阅读结构

- `src/content/projects/`：项目元数据与 Overview Markdown。
- `src/content/topics/`：AI 项目主题 Markdown；包含 project、slug、title、summary、order、visualization。
- `src/data/`：个人资料、分类、媒体登记、NPC 机制与 TFT 评测数据。
- `src/components/`：播放器、证据图片、主题导航、图表与项目专属解释组件。
- `src/layouts/ProjectLayout.astro`：共享项目标题、导航和页尾。
- `src/styles/global.css`：原有设计变量与全站布局；`content.css`：案例与媒体样式。
- `public/media/`：允许公开的网页媒体；`素材/`：被 Git 忽略的本地原片。

已有四个项目地址保持不变。NPC 新增 design / mechanisms / evaluation，TFT 新增 evaluation / architecture / diagnosis。主题地址由集合自动生成，内容 ID 使用文件路径，避免跨项目同名主题相互覆盖。三个小游戏仅在目录 Gallery 播放，不生成空页面。

## 更新个人资料

编辑 `src/data/profile.ts` 的 name、englishName、introduction、approach、about、highlights、capabilities、education、phone、email、wechat、resume，只录入确认公开的信息。不设置目标岗位标签。真实简历放到 `public/resume.pdf` 并设置 `resume: '/resume.pdf'`；缺失时保留状态文字，不创建占位 PDF。

## 新增项目或主题

在 `src/content/projects/` 新增 Markdown：

```yaml
---
slug: your-project
title: 项目名称
category: lab
order: 8
featured: false
display: case-study
contentStatus: partial
summary: 根据真实资料填写一句摘要。
heroAsset: registered-image-id
---
```

分类固定为 ai / games / lab；featured 控制首页展示；gallery 不生成详情页。heroAsset、demoAsset 引用 `src/data/media.generated.json` 中的登记 ID。demoAsset 必须是视频。案例文档状态 contentStatus 与项目实际状态 projectStatus 分开填写。

普通项目只需 Markdown、登记媒体和素材，无需手写路由。新增 AI 主题时填写所属项目与主题 slug；可复用已存在的 visualization 类型。新的专属可视化需在内容 schema 和 TopicVisualization 中登记，避免引入通用图形编辑器。公共媒体使用 EvidenceFigure / DemoPlayer；不要把播放器置于整卡覆盖链接内。

历史 cover / media / iterations 字段仍保留类型兼容；新页面使用命名媒体登记。Timeline 接受自定义标题，真实版本记录才填写日期与结果。

## 媒体与事实边界

`src/data/media.generated.json` 记录发布路径、原始来源、尺寸、时长、Poster、Caption、证据类型与脱敏状态。三类证据为 real-evidence / explanation / reference。新增资源须先审查，再进入 public；不能直接复制整个素材目录。

本地 `scripts/prepare-media.mjs` 使用 sharp 与 FFmpeg 制作网页版本：

```powershell
$env:FFMPEG = '本机 ffmpeg.exe 的绝对路径'
node scripts/prepare-media.mjs
```

FFmpeg 不作为 CI 依赖，原素材不上传；构建使用已提交的网页版本。生成脚本会重新制作全部媒体，仅在原素材可用且确需更新时执行。新增源文件时同时更新生成脚本，避免手工登记被下次生成覆盖。

- 图片采用响应式 WebP，详情页保留完整画幅；工作台仅使用已确认的脱敏版本。
- MP4 使用 H.264 / AAC、faststart；用户点击才设置视频源，无自动播放。无 JavaScript 时链接直接打开视频。
- NPC 保留 58.9 秒完整交互；TFT 保留约 65.5 秒完整问答。
- VR 精选为原片 04:30–05:45 连续片段；完整录像按 0 / 240 / 480 / 720 秒切分，顺序不变、不变速、保留原片署名。
- 《梦魇》不属于本轮发布范围。原片、运行工具、检查输出均被忽略。
- 总发布媒体不超过 250 MiB，单文件小于 90 MiB。

VR 与密室视频附中文讲解 / 画面摘要字幕，明确标为非逐字稿；原始自动识别稿不公开。摘要在 `src/data/video-summaries.json` 维护，执行 `node scripts/write-captions.mjs` 可单独更新 WebVTT 与媒体登记，无需再次转码。录音中不确定的台词不补写。NPC / TFT 为静音操作录像；射击与数学游戏保留游戏音轨。

NPC 环境来源必须保留 Generative Agents / Smallville 及 Park et al., 2023 的论文链接。机制回复属于解释性示例；Ablation 当前只有方法，没有原始实验输出。TFT A/B 属于早期 Tool Selection；四项精确数值维护在 `src/data/tft.ts`，不得解释为最终 Hybrid 架构成绩。不公开尚未确认口径的延迟数字。Trace 是提供的开发记录摘要，不是原始日志截图。

## 验证与发布

`npm run build` 验证主题生成、内部链接、纯锚点、元信息、ID 唯一性、srcset、媒体登记和大小。`npm run check` 验证 Astro / TypeScript 类型。

手工验收 375 / 768 / 1440px：无溢出、图片可读、主题直接访问与刷新、键盘焦点、图片放大与 Escape、路径高亮、机制切换、视频播放/暂停/拖动/全屏及加载失败回退。检查未播放时无 MP4 请求；关闭 JavaScript 时正文、导航、数据表与直接播放链接仍可用。

仓库 `1244075201/1244075201.github.io` 使用 main 分支。GitHub Pages Source 为 GitHub Actions；推送后依次 npm ci → 类型检查 → 构建校验 → 上传 dist → Pages 发布。无需个人 Token，不提交 dist。发布后实测页面、图片和视频 Range 请求，不仅查看工作流状态。回滚使用 git revert 并推送。

姓名、个人定位与能力分组集中维护在个人配置中。About 仅展示两条精简教育背景及用户提供的手机、邮箱和微信；课程、奖项、实习等详细履历通过简历 PDF 提供。联系方式缺失时隐藏。NPC 原始评测输出、完整 TFT 逐类记录和工作台长期使用反馈仍待补充。
