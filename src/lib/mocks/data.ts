import type { Plan, PreviewPlan } from "@/lib/types";

// Editable UI fixtures. They are never loaded from or saved to a backend.
export const samplePlans: Plan[] = [
  {
    id: "plan-python",
    title: "Build confidence with Python and DSA",
    raw_input: "I know Python variables and loops. I want to practise data structures for 30 minutes on weekdays.",
    status: "active",
    version: 2,
    conversation_id: "conversation-python",
    created_at: "2026-11-01T09:00:00Z",
    updated_at: "2026-11-02T09:00:00Z",
    goals: [
      {
        id: "goal-lists",
        plan_id: "plan-python",
        title: "Get comfortable with lists",
        description: "Practise indexing, traversal and small transformations with short exercises.",
        due_date: "2026-11-13",
        is_completed: false,
        tasks: [
          { id: "task-indexing", title: "Complete a list indexing exercise", description: "Create a list of five numbers, access positive and negative indices, and print the results.", is_completed: true, due_date: "2026-11-02" },
          { id: "task-traversal", title: "Write a list traversal script", description: "Loop through a list of prices and print the total. Check the result with an empty list.", is_completed: false, due_date: "2026-11-04" },
          { id: "task-filtering", title: "Filter even numbers from a list", description: "Write a function that returns only even numbers. Check it against three example inputs.", is_completed: false, due_date: "2026-11-06" },
        ],
      },
      {
        id: "goal-search",
        plan_id: "plan-python",
        title: "Practise searching",
        description: "Find values in a collection and explain how the approach works.",
        due_date: null,
        is_completed: false,
        tasks: [
          { id: "task-linear-search", title: "Implement linear search", description: "Return the index of a target value, or -1 when the value is missing.", is_completed: false, due_date: null },
          { id: "task-search-notes", title: "Compare search approaches", description: "Write a short note about when linear search is useful and which inputs it handles.", is_completed: false, due_date: "2026-11-13" },
        ],
      },
    ],
  },
  {
    id: "plan-driving",
    title: "Learn to drive",
    raw_input: "I want to learn to drive. I have not chosen an instructor and can take lessons on Saturdays.",
    status: "active",
    version: 1,
    conversation_id: "conversation-driving",
    created_at: "2026-11-01T10:00:00Z",
    updated_at: "2026-11-01T10:00:00Z",
    goals: [
      {
        id: "goal-instructor", plan_id: "plan-driving", title: "Find a suitable instructor",
        description: "Compare nearby instructors and ask about Saturday availability.", due_date: "2026-11-14", is_completed: false,
        tasks: [
          { id: "task-shortlist", title: "Shortlist three local instructors", description: "Note contact details and published prices for three instructors serving your area.", is_completed: true, due_date: "2026-11-03" },
          { id: "task-contact", title: "Ask instructors about Saturday lessons", description: "Send an enquiry to each shortlisted instructor about availability, lesson length and prices.", is_completed: false, due_date: "2026-11-05" },
          { id: "task-compare", title: "Compare instructor replies", description: "Review the replies and write down your preferred option. Waiting for instructor responses.", is_completed: false, due_date: null },
        ],
      },
    ],
  },
  {
    id: "plan-portfolio",
    title: "Publish my portfolio",
    raw_input: "Create a small portfolio that showcases two projects and makes it easy to contact me.",
    status: "completed",
    version: 1,
    conversation_id: "conversation-portfolio",
    created_at: "2026-10-20T09:00:00Z",
    updated_at: "2026-10-30T16:00:00Z",
    goals: [
      {
        id: "goal-portfolio", plan_id: "plan-portfolio", title: "Prepare project stories",
        description: "Explain the problem, approach and result for two projects.", due_date: "2026-10-30", is_completed: true,
        tasks: [
          { id: "task-project-one", title: "Write the first project story", description: "Summarise the problem, your contribution and what changed.", is_completed: true, due_date: "2026-10-27" },
          { id: "task-project-two", title: "Write the second project story", description: "Add a screenshot and describe one important technical decision.", is_completed: true, due_date: "2026-10-28" },
          { id: "task-publish", title: "Publish and check the portfolio", description: "Check links, contact information and the mobile layout.", is_completed: true, due_date: "2026-10-30" },
        ],
      },
    ],
  },
];

export const samplePreview: PreviewPlan = {
  title: samplePlans[0].title,
  raw_input: samplePlans[0].raw_input,
  goals: samplePlans[0].goals.map((goal) => ({
    title: goal.title,
    description: goal.description,
    due_date: goal.due_date,
    tasks: goal.tasks.map((task) => ({
      title: task.title,
      description: task.description,
      due_date: task.due_date,
    })),
  })),
};
