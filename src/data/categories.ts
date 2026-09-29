export const categories = [
  {
    id: "ai",
    number: "01",
    name: "AI 与 Agent",
    description: "围绕 AI 与 Agent 的项目实践。",
  },
  {
    id: "games",
    number: "02",
    name: "游戏与交互",
    description: "游戏开发与交互设计项目。",
  },
  {
    id: "lab",
    number: "03",
    name: "产品实验室",
    description: "从真实问题出发，通过产品设计与快速原型验证想法。",
  },
] as const;

export const contentLabels = {
  placeholder: "案例待补充",
  partial: "案例整理中",
  complete: "完整案例",
} as const;
