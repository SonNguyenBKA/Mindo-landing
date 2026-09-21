/**
 * PRNG có hạt giống (mulberry32).
 *
 * Nền trang trí (sao, sao băng) cần vị trí "ngẫu nhiên" nhưng phải **giống nhau**
 * giữa server và client, nếu không React sẽ báo lỗi hydration. Dùng hạt giống
 * cố định cho mỗi cụm là giải quyết được.
 */
export function seededRandom(seed: number) {
  let a = seed >>> 0;
  return function next(): number {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Làm tròn để chuỗi CSS ngắn và ổn định giữa các lần render. */
export function round(n: number, digits = 2): number {
  const f = 10 ** digits;
  return Math.round(n * f) / f;
}
