import { describe, it, expect } from "vitest";
import {
  add,
  subtract,
  isEven,
  isOdd,
  multiply,
  divide,
  power,
} from "../src/math";

describe("math", () => {
  it("adds two number", () => {
    const result = add(3, 2);
    expect(result).toBe(5);
  });

  it("subtracts two numbers", () => {
    const result = subtract(6, 5);
    expect(result).toBe(1);
  });

  it("multiplies two numbers", () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-6, 3)).toBe(-18);
    expect(multiply(0, 3)).toBe(0);
  });

  it("divide two numbers", () => {
    expect(divide(4, 2)).toBe(2);
    expect(divide(6, 2)).toBe(3);
    expect(divide(0, 2)).toBe(0);
  });

  it("return null when dividing by zero", () => {
    expect(divide(2, 0)).toBeNull();
  });

  it("detect even numbers", () => {
    expect(isEven(4)).toBe(true);
    expect(isEven(0)).toBe(true);
    expect(isEven(-0)).toBe(true);
    expect(isEven(3)).toBe(false);
  });

  it("detects odd numbers", () => {
    expect(isOdd(3)).toBe(true);
    expect(isOdd(4)).toBe(false);
    expect(isOdd(-1)).toBe(true);
  });

  it("raises a number to a power", () => {
    expect(power(2, 3)).toBe(8);
    expect(power(5, 0)).toBe(1);
    expect(power(2, 1)).toBe(2);
    expect(power(2, -1)).toBe(0.5);
  });
});
