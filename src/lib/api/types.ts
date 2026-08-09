export interface Task {
  id: string;
  title: string;
  description: string;
  is_completed: boolean;
  due_date: string | null;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  due_date: string | null;
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
