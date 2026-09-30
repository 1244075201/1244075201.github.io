interface Profile {
  name?: string;
  englishName?: string;
  introduction?: string;
  approach?: string;
  about?: string;
  highlights: string[];
  capabilities: { title: string; description: string; keywords: string[] }[];
  github: string;
  resume?: string;
  email?: string;
}

export const profile: Profile = {
  name: "周殊伦",
  englishName: "Shulun Zhou",
  introduction: "计算机科学与 AI 背景，关注 AI Agent 与智能交互产品。",
  approach:
    "从问题发现与方案设计出发，将想法推进到可运行原型，并通过 Evaluation 持续迭代。",
  about:
    "我有计算机科学与 AI 背景，关注 AI Agent 与智能交互产品。我的实践涵盖 Agent 系统设计、LLM Evaluation、游戏交互开发和产品原型，关注如何把真实问题转化为可运行的方案，并通过评测和迭代逐步改进。",
  highlights: ["Agent 系统设计", "LLM Evaluation", "游戏交互开发", "产品原型"],
  capabilities: [
    {
      title: "AI 与 Agent",
      description: "设计 Agent 的上下文、工具使用与评测方式。",
      keywords: [
        "LLM",
        "Agent",
        "RAG",
        "Tool Calling",
        "MCP",
        "Context / Prompt",
        "LLM Evaluation",
      ],
    },
    {
      title: "产品设计与验证",
      description: "拆解需求、确定 MVP，并建立验证与迭代依据。",
      keywords: [
        "Requirement Analysis",
        "MVP",
        "Metrics",
        "A/B Testing",
        "Evaluation",
        "Iteration",
      ],
    },
    {
      title: "原型与开发",
      description: "将方案实现为可运行、可验证的原型。",
      keywords: ["Python", "Unity", "SQLite", "API", "AI-assisted Development"],
    },
  ],
  github: "https://github.com/1244075201",
  resume: "/resume.pdf",
};
