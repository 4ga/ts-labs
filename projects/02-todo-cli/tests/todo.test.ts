import { describe, it, expect } from "vitest";
import {
  Todo,
  createTodo,
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  setTodoPriority,
} from "../src/todo";

describe("todo functions", () => {
  it("createTodo creates a new todo with default values", () => {
    const todo = createTodo("Buy milk");

    expect(todo.id).toBeTypeOf("string");
    expect(todo.title).toBe("Buy milk");
    expect(todo.completed).toBe(false);
    expect(todo.createdAt).toBeInstanceOf(Date);
    expect(todo.updatedAt).toBeInstanceOf(Date);
  });

  it("addTodo adds a new todo without mutating the original array", () => {
    const todos: Todo[] = [];
    const updated = addTodo(todos, "Buy milk");

    expect(todos.length).toBe(0);
    expect(updated.length).toBe(1);
    expect(updated[0].title).toBe("Buy milk");
    expect(updated[0].completed).toBe(false);
  });

  it("toggleTodo toggles the completed flag of the matching todo", () => {
    const original: Todo[] = [createTodo("Task")];
    const id = original[0].id;

    const updated = toggleTodo(original, id);
    expect(updated[0].completed).toBe(true);
    expect(original[0].completed).toBe(false);
    expect(updated[0].updatedAt.getTime()).toBeGreaterThanOrEqual(
      updated[0].createdAt.getTime()
    );
  });

  it("toggleTodo only toggles the matching todo when multiple exist", () => {
    const original: Todo[] = [createTodo("Task"), createTodo("Task 2")];
    const id = original[0].id;

    const updated = toggleTodo(original, id);
    expect(updated[0].completed).toBe(true);
    expect(updated[1].completed).toBe(false);
    expect(original[0].completed).toBe(false);
    expect(updated[0].updatedAt.getTime()).toBeGreaterThanOrEqual(
      updated[0].createdAt.getTime()
    );
  });

  it("toggleTodo throws if todo is not found", () => {
    const todos: Todo[] = [createTodo("Task")];

    expect(() => toggleTodo(todos, "non-existent")).toThrowError(
      "Todo not found"
    );
  });

  it("deleteTodo removes the todo by id without mutating original", () => {
    const first = createTodo("First");
    const second = createTodo("Second");
    const todos: Todo[] = [first, second];

    const updated = deleteTodo(todos, first.id);

    expect(updated.length).toBe(1);
    expect(updated[0].id).toBe(second.id);
    expect(todos.length).toBe(2);
  });

  it("deleteTodo throws if todo is not found", () => {
    const todos: Todo[] = [createTodo("Task")];
    expect(() => deleteTodo(todos, "missing")).toThrowError("Todo not found");
  });

  it("editTodo updates the title of the matching todo and not others", () => {
    const original: Todo[] = [createTodo("Task"), createTodo("Task 2")];
    const id = original[0].id;

    const updated = editTodo(original, id, "New title");
    expect(updated[0].title).toBe("New title");
    expect(updated[1].title).toBe("Task 2");
    expect(original[0].title).toBe("Task");

    expect(updated[0].updatedAt.getTime()).toBeGreaterThanOrEqual(
      updated[0].createdAt.getTime()
    );
    expect(updated[1].updatedAt.getTime()).toBe(
      original[1].updatedAt.getTime()
    );
  });

  it("default priority", () => {
    const original: Todo[] = [createTodo("Task")];
    expect(original[0].priority).toBe("medium");
  });

  it("setTodoPriority success", () => {
    const original: Todo[] = [createTodo("Task"), createTodo("Task 2")];
    const id = original[0].id;

    const updated = setTodoPriority(original, id, "low");
    expect(updated[0].priority).toBe("low");
    expect(updated[1].priority).toBe("medium");

    expect(updated[0].updatedAt.getTime()).toBeGreaterThanOrEqual(
      updated[0].createdAt.getTime()
    );
    expect(updated[1].updatedAt.getTime()).toBe(
      original[1].updatedAt.getTime()
    );
  });

  it("setTodoPriority throws when id missing", () => {
    const todos: Todo[] = [createTodo("Task")];
    expect(() => setTodoPriority(todos, "missing", "high")).toThrowError(
      "Todo not found"
    );
  });
});
