import type {
  ChangeMutationResponse, ChatMessage, ChatRequest, ChatResponse, Goal, Plan,
  PlanChange, PlanOperation, PlanRevision, PlanSummary, PreviewPlan, Task,
} from "@/lib/types";
import { samplePlans } from "./data";

export { samplePreview } from "./data";

// In-memory UI state. Navigation retains edits; a full reload resets the fixtures.
const copy = <T>(value: T): T => structuredClone(value);
let plans = copy(samplePlans);
let sequence = 0;
const id = (prefix: string) => `mock-${prefix}-${++sequence}`;
const now = () => new Date().toISOString();
const messages = new Map<string, ChatMessage[]>();
const changes = new Map<string, PlanChange[]>();
const history = new Map<string, { revision: PlanRevision; snapshot: Plan }[]>();

function findPlan(planId: string): Plan {
  const plan = plans.find((item) => item.id === planId);
  if (!plan) throw new Error("This mock board does not exist. Choose a sample board from Console.");
  return plan;
}

function record(plan: Plan, summary: string) {
  const entries = history.get(plan.id) || [];
  entries.unshift({ revision: { id: id("revision"), version: plan.version, summary, created_at: now() }, snapshot: copy(plan) });
  history.set(plan.id, entries);
}

function initialiseConversation(plan: Plan) {
  messages.set(plan.id, [
    { id: id("message"), role: "user", content: plan.raw_input, scope_goal_id: null, metadata: {}, client_id: null, created_at: plan.created_at },
    { id: id("message"), role: "assistant", content: "Here is a sample plan with concrete tasks. Select a goal to explore its tasks, or send a message to try a mock proposal.", scope_goal_id: null, metadata: {}, client_id: null, created_at: plan.created_at },
  ]);
  changes.set(plan.id, []);
}

for (const plan of plans) {
  initialiseConversation(plan);
  if (plan.version > 1) {
    const earlier = copy(plan);
    earlier.version = 1;
    earlier.goals[0].tasks = earlier.goals[0].tasks.slice(0, 1);
    record(earlier, "Created the initial sample plan");
  }
  record(plan, "Added sample goals and tasks");
}

const initialPlan = plans[0];
const initialChange: PlanChange = {
  id: "change-python-practice", plan_id: initialPlan.id, scope_goal_id: initialPlan.goals[0].id,
  status: "proposed", summary: "Add a short exercise to consolidate list traversal.",
  operations: [{ action: "add_task", goal_id: initialPlan.goals[0].id, title: "Trace a loop by hand", description: "Write down the index and current value for each iteration through a five-item list.", due_date: "2026-11-07" }],
  base_version: initialPlan.version, created_at: initialPlan.updated_at, updated_at: initialPlan.updated_at, applied_at: null,
};
changes.get(initialPlan.id)!.push(initialChange);
messages.get(initialPlan.id)!.push({
  id: "message-python-proposal", role: "assistant", content: "Would you like to add one short tracing exercise? Review this sample proposal before applying it.",
  scope_goal_id: initialPlan.goals[0].id, metadata: { change: copy(initialChange) }, client_id: null, created_at: initialPlan.updated_at,
});

function createPlan(preview: PreviewPlan): Plan {
  const planId = id("plan");
  const timestamp = now();
  const plan: Plan = {
    id: planId, title: preview.title, raw_input: preview.raw_input, status: "active", version: 1,
    conversation_id: id("conversation"), created_at: timestamp, updated_at: timestamp,
    goals: preview.goals.map((goal) => ({ ...copy(goal), id: id("goal"), plan_id: planId, is_completed: false,
      tasks: goal.tasks.map((task) => ({ ...copy(task), id: id("task"), is_completed: false })),
    })),
  };
  plans.unshift(plan);
  initialiseConversation(plan);
  record(plan, "Created a mock board");
  return copy(plan);
}

function previewFor(text: string): PreviewPlan {
  return { title: text.trim().slice(0, 100) || "New sample ambition", raw_input: text, goals: [{
    title: "Define the first milestone", description: "Sample content for trying the board layout; no AI call is made.", due_date: null,
    tasks: [
      { title: "Write down what success looks like", description: "Describe one concrete result and how you will recognise it.", due_date: null },
      { title: "List what you already have", description: "Note your starting point, resources and any missing information.", due_date: null },
      { title: "Choose one small next action", description: "Pick a specific action you could complete in a short focused session.", due_date: null },
    ],
  }] };
}

function taskFrom(operation: PlanOperation): Task {
  return { id: id("task"), title: operation.title || "Sample task", description: operation.description || "",
    due_date: operation.due_date ?? null, is_completed: operation.is_completed ?? false };
}

function applyOperation(plan: Plan, operation: PlanOperation) {
  const goal = plan.goals.find((item) => item.id === operation.goal_id);
  if (operation.action === "add_goal") {
    const newGoal: Goal = { id: id("goal"), plan_id: plan.id, title: operation.title || "Sample milestone", description: operation.description || "",
      due_date: operation.due_date ?? null, is_completed: false,
      tasks: (operation.tasks || []).map((task) => ({ ...copy(task), id: id("task"), is_completed: false })) };
    plan.goals.push(newGoal);
  } else if (operation.action === "delete_goal") {
    plan.goals = plan.goals.filter((item) => item.id !== operation.goal_id);
  } else if (operation.action === "update_goal" && goal) {
    for (const key of ["title", "description", "due_date", "is_completed"] as const) {
      const value = operation[key];
      if (value !== undefined) Object.assign(goal, { [key]: value });
    }
  } else if (operation.action === "add_task" && goal) {
    goal.tasks.push(taskFrom(operation));
  } else {
    for (const item of plan.goals) {
      if (operation.action === "delete_task") item.tasks = item.tasks.filter((task) => task.id !== operation.task_id);
      if (operation.action === "update_task") {
        const task = item.tasks.find((entry) => entry.id === operation.task_id);
        if (task) for (const key of ["title", "description", "due_date", "is_completed"] as const) {
          const value = operation[key];
          if (value !== undefined) Object.assign(task, { [key]: value });
        }
      }
    }
  }
}

export const mockGoals = {
  async list(): Promise<Goal[]> { return copy(plans.flatMap((plan) => plan.goals)); },
  async decompose(text: string): Promise<Plan> { return createPlan(previewFor(text)); },
  async preview(text: string): Promise<PreviewPlan> { return previewFor(text); },
  async delete(goalId: string): Promise<void> {
    for (const plan of plans) {
      if (!plan.goals.some((goal) => goal.id === goalId)) continue;
      plan.goals = plan.goals.filter((goal) => goal.id !== goalId);
      plan.version += 1;
      plan.updated_at = now();
      record(plan, "Removed a sample goal");
      return;
    }
    throw new Error("This sample goal no longer exists.");
  },
};

export const mockPlans = {
  async list(): Promise<PlanSummary[]> {
    return copy(plans.map((plan) => ({ ...plan, goal_count: plan.goals.length,
      task_count: plan.goals.reduce((sum, goal) => sum + goal.tasks.length, 0), first_goal_id: plan.goals[0]?.id ?? null })));
  },
  async detail(planId: string): Promise<Plan> { return copy(findPlan(planId)); },
  async changes(planId: string): Promise<PlanChange[]> { findPlan(planId); return copy(changes.get(planId) || []); },
  async revisions(planId: string): Promise<PlanRevision[]> { findPlan(planId); return copy((history.get(planId) || []).map((entry) => entry.revision)); },
  async restoreRevision(planId: string, version: number): Promise<Plan> {
    const current = findPlan(planId);
    const entry = history.get(planId)?.find((item) => item.revision.version === version);
    if (!entry) throw new Error("This sample revision does not exist.");
    const restored = { ...copy(entry.snapshot), version: current.version + 1, updated_at: now() };
    plans = plans.map((plan) => plan.id === planId ? restored : plan);
    for (const change of changes.get(planId) || []) if (change.status === "proposed") change.status = "rejected";
    record(restored, `Restored sample version ${version}`);
    return copy(restored);
  },
  async importPreview(preview: PreviewPlan): Promise<Plan> { return createPlan(preview); },
};

export const mockChat = {
  async messages(planId: string): Promise<ChatMessage[]> { findPlan(planId); return copy(messages.get(planId) || []); },
  async send(planId: string, data: ChatRequest): Promise<ChatResponse> {
    const plan = findPlan(planId);
    const thread = messages.get(planId)!;
    const existing = thread.findIndex((message) => message.client_id === data.client_id);
    if (existing >= 0) {
      const pair = thread.slice(existing, existing + 2);
      return copy({ conversation_id: plan.conversation_id!, messages: pair,
        change: changes.get(planId)?.find((change) => change.id === pair[1]?.metadata.change?.id) || null });
    }
    const goal = plan.goals.find((item) => item.id === data.scope_goal_id) || plan.goals[0];
    const change: PlanChange = { id: id("change"), plan_id: planId, scope_goal_id: goal?.id || null,
      status: "proposed", summary: "A sample next step for this board.", base_version: plan.version,
      created_at: now(), updated_at: now(), applied_at: null,
      operations: goal ? [{ action: "add_task", goal_id: goal.id, title: "Review the next step", description: `Mock follow-up to: ${data.content}`, due_date: null }]
        : [{ action: "add_goal", title: "Next milestone", description: "A sample milestone for this board." }],
    };
    const pair: ChatMessage[] = [
      { id: id("message"), role: "user", content: data.content, scope_goal_id: goal?.id || null, metadata: {}, client_id: data.client_id, created_at: now() },
      { id: id("message"), role: "assistant", content: "This is a mock reply for UI development. You can apply or reject the sample change below; no AI model is called.", scope_goal_id: goal?.id || null, metadata: { change: copy(change) }, client_id: null, created_at: now() },
    ];
    thread.push(...pair);
    changes.get(planId)!.push(change);
    return copy({ conversation_id: plan.conversation_id!, messages: pair, change });
  },
  async applyChange(planId: string, changeId: string): Promise<ChangeMutationResponse> {
    const plan = findPlan(planId);
    const change = changes.get(planId)?.find((item) => item.id === changeId);
    if (!change) throw new Error("This sample proposal does not exist.");
    if (change.status === "rejected") throw new Error("This sample proposal was rejected.");
    if (change.status !== "applied") {
      for (const operation of change.operations) applyOperation(plan, operation);
      plan.version += 1;
      plan.updated_at = now();
      change.status = "applied";
      change.applied_at = change.updated_at = now();
      record(plan, change.summary);
    }
    return copy({ plan, change });
  },
  async rejectChange(planId: string, changeId: string): Promise<PlanChange> {
    findPlan(planId);
    const change = changes.get(planId)?.find((item) => item.id === changeId);
    if (!change) throw new Error("This sample proposal does not exist.");
    if (change.status === "applied") throw new Error("This sample proposal was already applied.");
    change.status = "rejected";
    change.updated_at = now();
    return copy(change);
  },
};

