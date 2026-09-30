---
project: llm-npc-agent
slug: design
title: 系统设计
summary: 从角色连续性出发，把 Context、推理与可控边界设计成系统。
order: 1
visualization: npc-design
---

## 从自由对话，到持续运行的角色

Script、Dialogue Tree 和 State Machine 擅长稳定、可控的交互。LLM 增加了表达自由度，却不会自然地解决记忆丢失、关系不连续和角色越界使用世界知识的问题。

我的方案是把长期状态显式组织为 Persistent Context，而不是只在 Prompt 中要求 NPC“记住一切”。Context 管理与 Dialogue / Action Reasoning 分开，便于解释模块作用与控制边界。
