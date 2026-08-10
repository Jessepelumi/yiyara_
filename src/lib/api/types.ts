export interface Task {
  id: string;
  title: string;
  description: string;
  is_completed: boolean;
  due_date: string | null;
}

export interface Goal {
  id: string;
  plan_id: string;
  title: string;
  description: string;
  due_date: string | null;
  is_completed: boolean;
  tasks: Task[];
}

export interface TaskPreview {
  title: string;
  description: string;
  due_date: string | null;
}

export interface GoalPreview {
  title: string;
  description: string;
  due_date: string | null;
  tasks: TaskPreview[];
}

export interface PreviewPlan {
  title: string;
  raw_input: string;
  goals: GoalPreview[];
}

export interface Plan {
  id: string;
  title: string;
  raw_input: string;
  status: "active" | "completed" | "archived";
  version: number;
  conversation_id: string | null;
  goals: Goal[];
  created_at: string;
  updated_at: string;
}

export interface PlanSummary {
  id: string;
  title: string;
  status: "active" | "completed" | "archived";
  version: number;
  goal_count: number;
  task_count: number;
  first_goal_id: string | null;
  created_at: string;
  updated_at: string;
}

export type PlanOperationAction =
  | "add_goal"
  | "update_goal"
  | "delete_goal"
  | "add_task"
  | "update_task"
  | "delete_task";

export interface PlanOperation {
  action: PlanOperationAction;
  goal_id?: string;
  task_id?: string;
  title?: string;
  description?: string;
  due_date?: string | null;
  is_completed?: boolean;
  tasks?: TaskPreview[];
}

export interface PlanChange {
  id: string;
  plan_id: string;
  scope_goal_id: string | null;
  status: "proposed" | "applied" | "rejected";
  summary: string;
  operations: PlanOperation[];
  base_version: number;
  created_at: string;
  updated_at: string;
  applied_at: string | null;
}

export interface PlanRevision {
  id: string;
  version: number;
  summary: string;
  created_at: string;
}
