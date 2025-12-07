export type Priority = "low" | "medium" | "high";
export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  priority: Priority;
};

function generatedId(): string {
  return Math.random().toString(36).slice(2);
}
export function createTodo(title: string): Todo {
  const now = new Date();
  const todo: Todo = {
    id: generatedId(),
    title,
    priority: "medium",
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
  return todo;
}

export function setTodoPriority(
  todos: Todo[],
  id: string,
  priority: Priority
): Todo[] {
  const todo = todos.find((t) => t.id === id);
  if (!todo) throw new Error("Todo not found");

  return todos.map((t) =>
    t.id === id ? { ...t, priority, updatedAt: new Date() } : t
  );
}

export function addTodo(todos: Todo[], title: string): Todo[] {
  if (title.length === 0) throw new Error("Title is required");
  const newTodo = createTodo(title);
  return [...todos, newTodo];
}

export function editTodo(todos: Todo[], id: string, newTitle: string): Todo[] {
  const todo = todos.find((t) => t.id === id);
  if (!todo) throw new Error("Todo not found");
  return todos.map((t) =>
    t.id === id ? { ...t, title: newTitle, updatedAt: new Date() } : t
  );
}

export function toggleTodo(todos: Todo[], id: string): Todo[] {
  if (!id) throw new Error("Todo not found");
  const todo = todos.find((t) => t.id === id);
  if (!todo) throw new Error("Todo not found");
  return todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date() } : t
  );
}

export function deleteTodo(todos: Todo[], id: string): Todo[] {
  const todo = todos.find((t) => t.id === id);
  if (!todo) throw new Error("Todo not found");
  return todos.filter((t) => t.id !== id);
}
