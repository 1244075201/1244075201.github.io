---
slug: llm-npc-agent
title: LLM-based NPC Agent
category: ai
order: 1
featured: true
contentStatus: partial
heroAsset: npc-ui
demoAsset: npc-demo
summary: 围绕记忆、知识、关系与认知边界，设计持续运行的 NPC Context。
evidence: 基于 Generative Agents / Smallville 环境扩展；本项目重点展示 Persistent Context 与 NPC 交互机制，地图和原有环境不属于个人原创贡献。
---

## 让 NPC 基于自己的经历持续行动

传统 NPC 的 Script、Dialogue Tree 与 State Machine 稳定、可控，但交互自由度有限。直接接入 LLM 后，角色仍可能忘记过去、失去关系连续性，或者使用自己本不该知道的信息。

这个项目关注的是：**让 NPC 在长期运行的世界中，基于自己的经历、关系、知识与认知持续行动。**

## 三个核心设计

- **Persistent Context**：将 Memory、Knowledge、Relationship、World Grounding 与 Belief Boundary 设计为明确的 Context Modules。
- **Rule-based + LLM Hybrid**：确定性的状态与边界尽量交给可控逻辑，自然语言理解、推理与生成交给 LLM。
- **场景约束下的模型选择与评测**：比较本地模型规模的取舍，并通过 Ablation 检查各模块对行为的影响。

系统设计、机制解释和评测方法分开呈现。可以先看真实交互，再选择感兴趣的主题。
