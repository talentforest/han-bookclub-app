export const getPercentage = (itemCount: number, totalCount: number) => {
  if (itemCount === 0 && totalCount === 0) return 0;
  return Math.round(((itemCount / totalCount) * 10000) / 10) / 10;
};
