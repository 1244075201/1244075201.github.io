---
project: tft-strategy-agent
slug: evaluation
title: 评测驱动迭代
summary: 36 条 Golden Set 显示，主要问题是过度调用 Tool，而不是漏掉真正需要 Tool 的问题。
order: 1
visualization: tft-evaluation
---

## 优化依据来自 Evaluation，而不是感觉

先建立 Golden Set，再观察 Baseline A 的错误分布，通过更明确的 Tool Policy / Prompt Constraints 得到 Improved B。这里比较的是早期 Tool Selection，不是后续 Hybrid 架构。
