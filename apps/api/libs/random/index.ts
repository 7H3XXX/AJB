// random.ts — Python-like random module

/**
 * Return a random element from a non-empty string or array.
 */
export function choice(seq: string): string;
export function choice<T>(seq: T[]): T;
export function choice<T>(seq: string | T[]): string | T {
  if (seq.length === 0) {
    throw new Error('Cannot choose from an empty sequence');
  }
  const index = Math.floor(Math.random() * seq.length);
  return typeof seq === 'string' ? seq.charAt(index) : seq[index];
}

/**
 * Return k elements chosen from the sequence with replacement.
 */
export function choices(seq: string, k: number): string[];
export function choices<T>(seq: T[], k: number): T[];
export function choices<T>(seq: string | T[], k: number): string[] | T[] {
  if (seq.length === 0) {
    throw new Error('Cannot choose from an empty sequence');
  }

  const result: (string | T)[] = [];
  for (let i = 0; i < k; i++) {
    const index = Math.floor(Math.random() * seq.length);
    result.push(typeof seq === 'string' ? seq.charAt(index) : seq[index]);
  }

  return result as string[] | T[];
}

/**
 * Return a random integer N such that a <= N <= b.
 */
export function randint(a: number, b: number): number {
  if (a > b) throw new Error('a must be <= b');
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

/**
 * Return a randomly selected element from range(start, stop, step).
 * - stop is exclusive (like Python's range)
 * - if only one argument is given, it's treated as stop, and start defaults to 0.
 */
export function randrange(
  start: number,
  stop?: number,
  step: number = 1,
): number {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }

  if (step <= 0) throw new Error('step must be > 0');
  if (start >= stop) throw new Error('empty range for randrange()');

  const width = Math.ceil((stop - start) / step);
  const index = Math.floor(Math.random() * width);
  return start + index * step;
}
