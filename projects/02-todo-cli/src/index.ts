import fs from "fs";
import { runCommand } from "./cli";
import { Priority, Todo } from "./todo";

const TODOS_FILE = "./todos.json";

function loadsTodos(): Todo[] {
  try {
    if (!fs.existsSync(TODOS_FILE)) {
      return [];
    }
    // read file as text, not a raw buffer
    const fileContents = fs.readFileSync(TODOS_FILE, "utf-8").trim();
    if (fileContents.length === 0) {
      // Empty file -> treat as no todos
      return [];
    }

    // Parse JSON into a plain array of objects
    const raw = JSON.parse(fileContents) as Array<{
      id: string;
      title: string;
      priority: Priority;
      completed: boolean;
      createdAt: string;
      updatedAt: string;
    }>;

    // Convert date strings back into Date objects
    const todos: Todo[] = raw.map((t) => ({
      ...t,
      createdAt: new Date(t.createdAt),
      updatedAt: new Date(t.updatedAt),
    }));

    return todos;
  } catch (error) {
    console.error("Failed to load todos: ", error);
    return [];
  }
}

function saveTodos(todos: Todo[]): void {
  try {
    const json = JSON.stringify(todos, null, 2);
    fs.writeFileSync(TODOS_FILE, json, "utf-8");
  } catch (error) {
    console.error("Failed to save todos:", error);
  }
}

const [, , ...args] = process.argv;
const todos = loadsTodos();
const result = runCommand(todos, args);
saveTodos(result.todos);

console.log(result.message);
