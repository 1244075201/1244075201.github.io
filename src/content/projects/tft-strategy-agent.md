---
slug: tft-strategy-agent
title: TFT Strategy Agent
category: ai
order: 2
featured: true
contentStatus: partial
heroAsset: tft-ui
demoAsset: tft-demo
summary: 从当前版本问答出发，通过 Evaluation、Bad Case 与 Trace 改进 Agent。
evidence: Version-aware Strategy Q&A · Set 18 / Patch 18.2 为素材录制时的版本上下文，不代表本网站提供实时版本数据。
---

## 搜索攻略，不等于快速得到可信答案

Set 18 开始时，我没有时间提前了解新赛季。真正开始游戏后，阵容、英雄、装备和强化都不熟悉；攻略来源分散，还需要核对 Patch、发布时间与数据来源。

问题不是“网上没有攻略”，而是**如何基于当前版本 Context，直接回答玩家此刻的具体问题**。

## 产品目标：Version-aware Strategy Q&A

面向 TFT 玩家，结合游戏数据、阵容信息与 Strategy Evidence，通过自然语言提供事实查询和策略问答。它不是万能 AI 教练，而是帮助用户减少信息核对与答案提取成本的问答产品。

## 从工具选择，到整条链路

早期先建立 36 条 Golden Set，检查工具是否被正确调用。Tool Policy / Prompt Constraints 改进之后，继续通过 Bad Case 与 Trace 发现证据边界和检索链路问题，最终演化为 Hybrid Routing。

**早期 A/B 评测、后续 Hybrid 架构和当前 UI 属于不同层面的证据。**下面的主题页分别解释，不将早期指标包装成最终架构的评测结果。
