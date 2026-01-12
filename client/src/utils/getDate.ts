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
    | 'yyyy.M.d. a h:mm'
    | 'yy.M.d. EEEE a h:mm:ss'
    | 'yy.M.d'
    | 'yyyy년 M월'
    | 'yyyy년 M월 d일'
    | 'yyyy년 M월 d일 a h시 mm분'
    | 'M월 d일 a h:mm'
    | 'M월 d일 EEEE a h시 mm분'
    | 'yyyy-MM'
    | 'yyyy-MM-dd'
    | "yyyy-MM-dd'T'HH:mm:ss" = 'yyyy.M.d. a h:mm',
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

/**
 * 📍모임일
 * -매월 셋째주 일요일
 */
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

/**
 * 📍발제문 페널티
 * -모임일 2일 전(목요일) 23:59:59 기한
 */
export function getSubjectDeadline(meetingDate: string): Date {
  const d = new Date(meetingDate);
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  date.setDate(date.getDate() - 3);
  date.setHours(23, 59, 59, 0);

  return date;
}

/**
 * 📍불참후기/정리기록 페널티
 * -월 마지막날 23:59:59 기한
 */
export function getLastDayOfMonth(year = +thisYear, month = +thisMonth): Date {
  const date = new Date(year, month, 1);
  date.setDate(date.getDate() - 1);
  date.setHours(23, 59, 59, 0);
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
