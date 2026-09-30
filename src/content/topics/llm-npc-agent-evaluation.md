---
project: llm-npc-agent
slug: evaluation
title: 模型选择与评测
summary: 根据实时交互约束选择 7B，并通过 Ablation 观察模块是否改变行为。
order: 3
visualization: npc-evaluation
---

## 先定义场景约束，再选择模型

本地 NPC 需要在玩家可以接受的等待时间内回应。模型选择因此同时考虑推理能力、资源需求与交互速度，而不只看生成质量。

评测关注模块是否带来实际行为差异。原始评测输出尚未补齐，当前页面将定性选择、评测方法和已验证结果的边界分开说明。
