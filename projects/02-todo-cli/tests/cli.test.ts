import { describe, it, expect } from "vitest";
import { createTodo, Todo } from "../src/todo";
import { runCommand, CommandResult } from "../src/cli";

describe("runCommand", () => {
  it("adds a todo when command is add", () => {
    const todos: Todo[] = [];
    const result: CommandResult = runCommand(todos, ["add", "Buy milk"]);

    expect(result.todos.length).toBe(1);
    expect(result.todos[0].title).toBe("Buy milk");
    expect(result.todos[0].completed).toBe(false);
    expect(result.message.toLowerCase()).toContain("added");
  });

  it("lists todos when command is list", () => {
    const todos: Todo[] = [createTodo("Task 1"), createTodo("Task 2")];
    const result = runCommand(todos, ["list"]);

    expect(result.todos.length).toBe(2);
    expect(result.todos[0].title).toBe("Task 1");
    expect(result.todos[1].title).toBe("Task 2");
    expect(result.message).toContain("Task 1");
    expect(result.message).toContain("Task 2");
  });

  it("toggles a todo when command is toggle", () => {
    const todos: Todo[] = [createTodo("Task")];
    const id = todos[0].id;

    const result = runCommand(todos, ["toggle", id]);

    expect(result.todos[0].completed).toBe(true);
    expect(result.message.toLowerCase()).toContain("toggled");
  });

  it("returns error message when toggle id is missing", () => {
    const todos: Todo[] = [createTodo("Task")];

    const result = runCommand(todos, ["toggle", "missing"]);

    expect(result.todos[0].completed).toBe(false); // unchanged
    expect(result.message.toLowerCase()).toContain("todo not found");
  });

  it("edit a todo when command is edit", () => {
    const first = createTodo("First");
    const todos: Todo[] = [first];
    const id = todos[0].id;

    const result = runCommand(todos, ["edit", id, "New title"]);
    expect(result.todos[0].title).toBe("New title");
    expect(result.message.toLowerCase()).toContain("edit");
  });

  it("return error message with edit id is missing", () => {
    const todos: Todo[] = [createTodo("Task")];

    const result = runCommand(todos, ["edit", "missing-id", "New title"]);
    expect(result.todos[0].title).toBe("Task"); // no change
    expect(result.message.toLowerCase()).toContain("todo not found");
  });

  it("deletes a todo when command is delete", () => {
    const first = createTodo("First");
    const second = createTodo("Second");
    const todos: Todo[] = [first, second];

    const result = runCommand(todos, ["delete", first.id]);

    expect(result.todos.length).toBe(1);
    expect(result.todos[0].id).toBe(second.id);
    expect(result.message.toLowerCase()).toContain("deleted");
  });

  it("returns help message for unknown command", () => {
    const todos: Todo[] = [];

    const result = runCommand(todos, ["unknown"]);

    expect(result.todos).toBe(todos);
    expect(result.message.toLowerCase()).toContain("usage");
  });

  it("return error message with priority id is missing", () => {
    const todos: Todo[] = [createTodo("Task")];

    const result = runCommand(todos, ["priority", "missing-id", "low"]);
    expect(result.todos[0].priority).toBe("medium"); // no change
    expect(result.message.toLowerCase()).toContain("todo not found");
  });

  it("priority successfully updated", () => {
    const todos: Todo[] = [createTodo("Task"), createTodo("Task 2")];
    const id = todos[0].id;

    const result = runCommand(todos, ["priority", id, "low"]);
    expect(result.todos[0].priority).toBe("low");
    expect(result.todos[1].priority).toBe("medium");
    expect(result.message.toLowerCase()).toContain("priority");
  });

  it("invalid priority", () => {
    const todos: Todo[] = [createTodo("Task 1"), createTodo("Task 2")];
    const id = todos[0].id;

    const result = runCommand(todos, ["priority", id, "missing"]);
    expect(result.todos[0].priority).toBe("medium");
    expect(result.todos[1].priority).toBe("medium");
    expect(result.message.toLowerCase()).toContain("invalid priority");
  });
});
