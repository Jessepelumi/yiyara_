export interface ExamplePrompt {
  label: string;
  text: string;
}

export const EXAMPLE_PROMPTS: Record<string, ExamplePrompt> = {
  driving: {
    label: "Obtain driving licence",
    text: "I want to obtain my driving licence, but I have never driven before and haven't chosen an instructor. I can take lessons on weekends. Help me understand what information I need and choose a practical first step.",
  },
  reading: {
    label: "Build a reading habit",
    text: "I want to make reading a daily habit, but I usually stop after a few days. I can set aside 20 minutes in the evening. Help me start with something manageable and build consistency.",
  },
  interview: {
    label: "Prepare for an interview",
    text: "I have a job interview in two weeks and want to prepare without cramming. I can spend 30 minutes on weekday evenings. Help me identify what to practise first and what details you need about the role.",
  },
  language: {
    label: "Learn a new language",
    text: "I want to learn conversational Spanish for travelling. I only know a few greetings and can practise for 15 minutes a day. Help me choose a small first exercise and work out a realistic approach.",
  },
  portfolio: {
    label: "Build my portfolio",
    text: "I want to create a portfolio for job applications. I have two projects to showcase, but no descriptions or finished website yet. I have two evenings a week to work on it. Help me decide where to start.",
  },
  fitness: {
    label: "Start a fitness routine",
    text: "I want to build a consistent exercise routine, but I am new to working out and keep setting goals that are too big. I can set aside 20 minutes three times a week. Help me clarify a manageable starting point.",
  },
  writing: {
    label: "Finish a writing project",
    text: "I have a half-written short story that I keep putting off. The outline is ready, but the middle needs work. I can write for 30 minutes on Saturday mornings. Help me turn the next part into a concrete action.",
  },
  coding: {
    label: "Learn data structures",
    text: "I want to learn data structures and algorithms. I know Python variables and loops, but I haven't practised lists or searching yet. I can study for 30 minutes on weekdays. Help me begin with one specific exercise.",
  },
  cooking: {
    label: "Cook at home more often",
    text: "I want to cook at home more often instead of ordering food. I know a few basic recipes and have limited time after work. Help me figure out what to prepare first and what information you need about my routine.",
  },
  project: {
    label: "Finish a side project",
    text: "I started a small personal project, but I keep adding ideas instead of finishing it. A basic version already works. I have three hours each weekend. Help me define a realistic finish line and pick the next action.",
  },
  finances: {
    label: "Organise my finances",
    text: "I want a clearer picture of my monthly spending. I haven't made a budget before and my bills are scattered across different places. Help me work out what information to collect first and make the first step manageable.",
  },
  routine: {
    label: "Build a morning routine",
    text: "I want less rushed mornings, but my current routine is inconsistent. I need to leave home by 8:30 and would like time for breakfast and planning my day. Help me understand what needs to change and choose one small starting action.",
  },
};
