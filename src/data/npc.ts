export const contextModules = [
  { name: "Memory", text: "记录与玩家、世界发生过的经历。" },
  { name: "Knowledge", text: "角色长期拥有的背景知识。" },
  {
    name: "Relationship",
    text: "交互形成的关系状态，为后续回应提供 Context。",
  },
  { name: "World Grounding", text: "将角色的观察与所在世界联系起来。" },
  { name: "Belief Boundary", text: "约束推理只能基于角色自身可知的信息。" },
];
export const relationshipExamples = [
  {
    id: "daily",
    label: "日常交流",
    state: "Neutral → Neutral",
    context: "关系保持中性，延续日常交流。",
    response: "“今天想聊些什么？”",
  },
  {
    id: "help",
    label: "帮助 NPC",
    state: "Neutral → Friendly",
    context: "帮助经历形成友善关系，进入未来对话的 Context。",
    response: "“谢谢你之前的帮忙，有什么我能做的吗？”",
  },
  {
    id: "offend",
    label: "冒犯 NPC",
    state: "Neutral → Guarded",
    context: "冒犯经历使角色更谨慎，影响后续回应。",
    response: "“我现在不太想继续这个话题。”",
  },
];
export const models = [
  {
    name: "1.5B",
    title: "速度优先",
    text: "快、资源需求低；复杂角色推理、长 Context 与稳定生成能力有限。",
    selected: false,
  },
  {
    name: "7B",
    title: "最终选择",
    text: "能力与运行速度取得较好平衡，更适合本地实时 NPC 交互。",
    selected: true,
  },
  {
    name: "14B",
    title: "质量优先",
    text: "生成质量更强，但本地实时交互延迟更高。",
    selected: false,
  },
];
export const ablations = [
  {
    module: "Memory",
    question: "能否延续过去的交互？",
    observe: "长期连续性与历史话题延续",
  },
  {
    module: "Relationship",
    question: "关系状态是否影响未来回应？",
    observe: "Relationship 在对话中的表达",
  },
  {
    module: "Belief & Grounding",
    question: "能否守住角色可知的信息边界？",
    observe: "Character Knowledge Boundary",
  },
];
