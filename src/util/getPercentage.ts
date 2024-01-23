export const getPercentage = (itemCount: number, totalCount: number) =>
  Math.round((itemCount / totalCount) * 10000) / 100;
