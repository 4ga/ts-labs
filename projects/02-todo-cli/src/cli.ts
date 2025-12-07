import {
  Todo,
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  setTodoPriority,
  Priority,
} from "./todo";

export type CommandResult = {
  todos: Todo[];
  message: string;
};

function listTodos(todos: Todo[]): string {
  let str = todos.map((t) => `${t.id}: ${t.title}`).join("\n");
  if (str.length > 0) return str;
  str = "No todos yet, Add some";
  return str;
}

export function runCommand(todos: Todo[], args: string[]): CommandResult {
  switch (args[0]) {
    case "add":
      try {
        return {
          todos: addTodo(todos, args[1]),
          message: `Added: ${args[1]}`,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { todos, message };
      }

    case "list":
      return {
        todos,
        message: `List:\n ${listTodos(todos)}`,
      };
    case "toggle": {
      const id = args[1];
      try {
        const updated = toggleTodo(todos, id);
        return { todos: updated, message: `Toggled: ${id}` };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { todos, message };
      }
    }
    case "edit": {
      const id = args[1];
      const title = args.slice(2).join(" ");
      try {
        const updated = editTodo(todos, id, title);
        return {
          todos: updated,
          message: `Edit: ${title}`,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { todos, message };
      }
    }
    case "delete": {
      const id = args[1];
      try {
        const updated = deleteTodo(todos, id);
        return {
          todos: updated,
          message: `Deleted: ${args[1]}`,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { todos, message };
      }
    }
    case "priority": {
      const id = args[1];
      const priorityInput = args[2];

      if (!priorityInput) {
        return {
          todos,
          message: "Missing priority. Use low | medium | high",
        };
      }
      const validPriorities: Priority[] = ["low", "medium", "high"];
      if (!validPriorities.includes(priorityInput as Priority)) {
        return { todos, message: "Invalid priority. Use low | medium | high" };
      }
      const priority = priorityInput as Priority;
      try {
        const updated = setTodoPriority(todos, id, priority);
        return {
          todos: updated,
          message: `Priority set to ${priority}`,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { todos, message };
      }
    }
    default:
      return {
        todos,
        message:
          "Usage: add <title> | list | toggle <id> | delete <id> | priority <id> ['low', 'medium', 'high']",
      };
  }
}
