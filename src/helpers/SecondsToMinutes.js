export const secondsToMinute = (seconds) => {
  const remainder = seconds % 60;
  const perfectMinutes = Math.floor(seconds / 60);
  return `${perfectMinutes < 10 ? '0' + perfectMinutes : perfectMinutes}:${
    remainder < 10 ? '0' + remainder : remainder
  }`;
};
