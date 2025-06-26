export function getRandomBorderRadiusValue(min = 10, max = 35) {
  const tl = Math.floor(Math.random() * (max - min + 1)) + min;
  const tr = Math.floor(Math.random() * (max - min + 1)) + min;
  const br = Math.floor(Math.random() * (max - min + 1)) + min;
  const bl = Math.floor(Math.random() * (max - min + 1)) + min;
  return `${tl}px ${tr}px ${br}px ${bl}px`;
}
