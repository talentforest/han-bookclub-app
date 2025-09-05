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
    | 'yyyy-MM'
    | 'yyyy-MM-dd'
    | 'yyyy.MM.dd'
    | 'yyyy년 MM월 dd일'
    | 'yyyy.MM.dd HH:mm'
    | 'yyyy년 M월 d일 EEEE'
    | 'yyyy년 M월 d일 EEEE a h시 mm분'
    | 'M월 d일 EEEE a h시 mm분'
    | 'yyyy.MM.dd a h시'
    | 'yyyy.MM.dd a h시 mm분'
    | 'yyyy-MM-dd HH:mm:ss'
    | 'HH:mm'
    | 'yyyy년 MM월'
    | 'yyyy년 M월'
    | 'yy년 MM월'
    | "yyyy-MM-dd'T'HH:mm:ss" = 'yyyy.MM.dd',
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
  const newToday = new Date();
  const maxTime = new Date(deadline);
  const diff = +maxTime - +newToday;
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `${diffDay + 1}`;
}

// 현재 시간의 다음달 yyyy-MM
export const getNextYearMonthId = () => {
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
export const thisYear = formatDate(today, 'yyyy');
export const thisMonth = formatDate(today, 'MM');
export const nextMonth = formatDate(getNextYearMonthId(), 'M');
export const thisDay = formatDate(today, 'dd');
export const thisYearMonthId = formatDate(today, 'yyyy-MM');
export const nextMonthId = formatDate(getNextYearMonthId(), 'yyyy-MM');
export const todayWithHyphen = formatDate(today, 'yyyy-MM-dd');
