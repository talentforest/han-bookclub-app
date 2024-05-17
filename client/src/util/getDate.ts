interface DateTimeFormatOptions {
  localeMatcher?: 'best fit' | 'lookup' | undefined;
  weekday?: 'long' | 'short' | 'narrow' | undefined;
  year?: 'numeric' | '2-digit' | undefined;
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
  day?: 'numeric' | '2-digit' | undefined;
  hour?: 'numeric' | '2-digit' | undefined;
  minute?: 'numeric' | '2-digit' | undefined;
  second?: 'numeric' | '2-digit' | undefined;
  formatMatcher?: 'best fit' | 'basic' | undefined;
  hour12?: boolean | undefined;
}

const today = new Date();

export const getLocaleDate = (
  date: Date | string | number,
  option?: DateTimeFormatOptions,
  isMark?: 'mark'
) => {
  const localeDate = new Date(date).toLocaleDateString('ko-KR', option);
  return isMark === 'mark' ? localeDate : localeDate.slice(0, -1);
};

// 날짜 숫자
export const thisYear = getLocaleDate(today, { year: 'numeric' });
export const thisMonth = getLocaleDate(today, { month: '2-digit' });
export const thisDay = getLocaleDate(today, { day: '2-digit' });

export const todayWithHyphen = `${thisYear}-${thisMonth}-${thisDay}`;

// YYYY-MM 변수명을 id라고 표현
export const thisYearMonthId = `${thisYear}-${thisMonth}`;

export const formatHyphenDate = (
  date: Date,
  format?: 'YYYY-MM-DD' | 'YYYY-MM'
) => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);

  if (format === 'YYYY-MM') return `${year}-${month}`;
  return `${year}-${month}-${day}`;
};

export const formatKRMarkDate = (
  date: string | number,
  format: 'YYYY년 MM월' | 'YY년 MM월' | 'YYYY년 MM월 DD일'
) => {
  const yearFormat = format.includes('YYYY년 MM월') ? 'numeric' : '2-digit';
  const dayFormat = format === 'YYYY년 MM월 DD일' ? 'numeric' : undefined;

  return getLocaleDate(
    date,
    { year: yearFormat, month: 'short', day: dayFormat },
    'mark'
  );
};

// M월 D일 (일) 오후 H:MM
export const getMeetingTime = (time: Date | number | string) => {
  return getLocaleDate(
    time,
    {
      minute: '2-digit',
      hour: '2-digit',
      day: 'numeric',
      month: 'short',
      weekday: 'short',
    },
    'mark'
  );
};

export function getDDay(deadline: string) {
  const today = new Date();
  const maxTime = new Date(deadline);
  const diff = +maxTime - +today;
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `${diffDay + 1}일`;
}

// 다음달
export const getNextMonthId = () => {
  const date = new Date(thisYearMonthId);
  date.setMonth(date.getMonth() + 1);
  return formatHyphenDate(date, 'YYYY-MM');
};

export const nextMonth = getLocaleDate(getNextMonthId(), { month: 'short' });
