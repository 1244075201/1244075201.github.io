---
project: tft-strategy-agent
slug: diagnosis
title: Bad Case 与复盘
summary: 从证据越界到 Parser 识别失败，沿 Trace 定位真正需要修改的环节。
order: 3
visualization: tft-diagnosis
---

## 不只看最终 Answer

工具调用可以成功，但模型仍可能超出工具证据做猜测。检索也可以执行，但 Retrieval Plan 可能从一开始就偏离意图。

这两个真实案例说明：可靠性需要沿 Parser → Retrieval Plan → Retrieval → Context → LLM 整条链路观察，不能仅靠一个最终回答判断。
