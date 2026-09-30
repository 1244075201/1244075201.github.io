---
project: tft-strategy-agent
slug: architecture
title: 架构演进
summary: 把确定性事实交给 SQLite，把需要策略推理的问题交给 Retrieval + LLM。
order: 2
visualization: tft-architecture
---

## 问题并不只是 Prompt

“纳亚菲利多少钱？”这样的事实问题，如果 SQLite 已有 Champion → Cost，就不需要再经过 LLM → Tool → LLM。

因此，架构进一步区分 Factual Query 和 Strategy Query。前者直接获取结构化数据，后者制定 Retrieval Plan、组织 Context + Evidence，再交给 LLM。
