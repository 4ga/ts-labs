export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number | null {
  if (b === 0 || b === -0) return null;
  return a / b;
}

export function isOdd(n: number): boolean {
  return n % 2 !== 0;
}

export function isEven(n: number): boolean {
  return n % 2 === 0;
}

export function power(base: number, exponent: number): number {
  return base ** exponent;
}
