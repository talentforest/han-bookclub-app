import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const today = new Date();

export const formatDate = (
  date: string | number | Date,
  formatStr:
    | 'yyyy'
    | 'M'
    | 'MM'
    | 'dd'
    | 'HH:mm'
    | 'yyyy-MM'
    | 'yyyy-MM-dd'
    | 'M월 d일 a h:mm'
    | 'yyyy년 M월'
    | 'yyyy년 M월 d일'
    | 'yyyy.M.d. HH:mm'
    | 'yy년 M월 d일 HH:mm'
    | 'M월 d일 EEEE a h시 mm분'
    | 'M월 d일 EEEE a HH:mm'
    | 'M월 d일 HH시 mm분'
    | 'M월 d일 EE HH:mm'
    | 'M월 d일 HH:mm'
    | 'yy.M.d'
    | "yyyy-MM-dd'T'HH:mm:ss" = 'yy년 M월 d일 HH:mm',
): string => {
  try {
    const dateToFormat = new Date(date);
    if (Number.isNaN(dateToFormat.getTime())) {
      throw new Error('유효하지 않은 시간');
    }
    return format(dateToFormat, formatStr, { locale: ko });
  } catch (error) {
    console.error('날짜 포맷팅 중 에러 발생:', error);
  }
};

export function getDDay(deadline: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxTime = new Date(deadline);
  maxTime.setHours(0, 0, 0, 0);
  const diff = +maxTime - +today;
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `${diffDay}`;
}

// 현재 시간의 다음달 yyyy-MM
const getNextYearMonthId = () => {
  const date = new Date(formatDate(today, 'yyyy-MM'));
  date.setMonth(date.getMonth() + 1);
  return formatDate(date, 'yyyy-MM');
};

// 모임 날짜: 매달 셋째주 일요일 구하기
export function getThirdSunday(
  year = +thisYear,
  month = +thisMonth,
  hour = 0,
  min = 0,
): Date {
  const date = new Date(year, month - 1, 1);

  while (date.getDay() !== 0) {
    date.setDate(date.getDate() + 1);
  }
  date.setDate(date.getDate() + 14);
  date.setHours(hour, min, 0, 0);

  return date;
}

// ✅ 발제문 작성 기한: 모임 전주 목요일 자정까지
export function getSubmitSubjectDate(
  year = +thisYear,
  month = +thisMonth,
): Date {
  const date: Date = getThirdSunday(year, month);
  date.setDate(date.getDate() - 2);
  return date;
}

// ✅ 발제자의 정리 기록 => 매달 마지막 요일 자정
// ✅ 모임 불참 후기 => 매달 마지막 요일 자정
export function getLastDayOfMonth(year = +thisYear, month = +thisMonth): Date {
  const date = new Date(year, month, 1);
  date.setDate(date.getDate() - 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

// 날짜 숫자
export const thisYearMonthId = formatDate(today, 'yyyy-MM');
export const thisYear = formatDate(today, 'yyyy');
export const thisMonth = formatDate(today, 'MM');
export const thisDay = formatDate(today, 'dd');

export const nextYearMonthId = formatDate(getNextYearMonthId(), 'yyyy-MM');
export const nextYear = `${+thisYear + 1}`;
export const yearOfNextMonth = nextYearMonthId.slice(0, 4);
export const nextMonth = formatDate(getNextYearMonthId(), 'MM');

export const todayWithHyphen = formatDate(today, 'yyyy-MM-dd');
