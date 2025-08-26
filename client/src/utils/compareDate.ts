type MonthData = {
  monthId: string;
};

export function compareYearMonth(
  a: MonthData,
  b: MonthData,
  sort?: 'latest' | 'oldest',
): number {
  if (sort === 'latest') return a.monthId.localeCompare(b.monthId);
  return b.monthId.localeCompare(a.monthId);
}
