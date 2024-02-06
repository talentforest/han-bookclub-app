interface MonthData {
  monthId: string;
}

export function compareYearMonth(a: MonthData, b: MonthData): number {
  return a.monthId.localeCompare(b.monthId);
}
