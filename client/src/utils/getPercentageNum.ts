export const getPercentageNum = (
  itemCount: number,
  totalCount: number,
  point = 0,
) => {
  if (itemCount === 0 && totalCount === 0) return 0;
  const result = Math.round(((itemCount / totalCount) * 10000) / 10) / 10;
  return +result.toFixed(point);
};
