export const metrics = [
  { name: "Accuracy", a: 66.67, b: 80.56, aLabel: "66.67%", bLabel: "80.56%" },
  { name: "Precision", a: 60, b: 72, aLabel: "60%", bLabel: "72%" },
  { name: "Recall", a: 100, b: 100, aLabel: "100%", bLabel: "100%" },
];
export const falsePositives = { a: 12, b: 7 };
export const trace = [
  {
    stage: "Parser",
    value: "named_comp = null",
    description: "未识别「裸阵容名 + 怎么玩」中的阵容名。",
  },
  {
    stage: "Retrieval Plan",
    value: "comp_query = null",
    description: "没有形成针对指定阵容的查询。",
  },
  {
    stage: "Retrieval Plan",
    value: "retrieve_all_comps = true",
    description: "转向检索全部阵容。",
  },
  {
    stage: "Retrieval",
    value: "comp_names = 8",
    description: "检索链路出现 8 个阵容名称。",
  },
  {
    stage: "Context",
    value: "strategy_chunks = 0",
    description: "没有得到策略片段。",
  },
  {
    stage: "Context",
    value: "static_entities = empty",
    description: "结构化实体为空；这里不推断最终回答。",
  },
];
export const routing = [
  {
    id: "fact",
    label: "事实查询",
    example: "纳亚菲利多少钱？",
    calls: "0 LLM Calls",
    steps: ["Deterministic Lookup", "SQLite", "Structured Data", "Answer"],
  },
  {
    id: "strategy",
    label: "策略问答",
    example: "我有裁决转，这把应该怎么玩？",
    calls: "1 LLM Call",
    steps: [
      "Retrieval Plan",
      "Strategy Retrieval",
      "Context + Evidence",
      "LLM",
      "Strategy Response",
    ],
  },
];
