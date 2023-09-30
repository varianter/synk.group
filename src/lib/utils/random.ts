export default function random(min: number, max: number, interval = 1): number {
  const range = Math.floor((max - min) / interval) + 1;
  const randomValue = Math.floor(Math.random() * range);
  return min + randomValue * interval;
}
