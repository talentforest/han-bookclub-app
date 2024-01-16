const date = new Date();
const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
export const krCurTime = new Date(utc + KR_TIME_DIFF);

// 날짜 숫자
export const thisYear = krCurTime.getFullYear();
export const thisMonth = krCurTime.getMonth() + 1;

// YYYY-MM-DD
export const isoFormatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

// YYYY-MM
export const thisYearMonthId = isoFormatDate(krCurTime).slice(0, -3);

export const getLocaleDateTime = (time: Date) => {
  return new Date(time).toLocaleDateString('ko', {
    minute: 'numeric',
    hour: 'numeric',
    day: 'numeric',
    month: 'short',
    weekday: 'short',
  });
};

export const getLocalDateTime = (dateTime: string) => {
  const date = new Date(dateTime);
  return date.toLocaleString().slice(0, -3);
};
export function getLocalDate(dateTime: string | number) {
  const date = new Date(dateTime);
  return date.toLocaleDateString().slice(0, -1);
}
export function getMonthNm(id: string) {
  const date = new Date(id);
  return date.getMonth() + 1;
}

export function getDDay(deadline: string) {
  const today = new Date();
  const maxTime = new Date(deadline);
  const diff = +maxTime - +today;
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `${diffDay + 1}일`;
}

export const clubYearArr = ['2024', '2023', '2022', '2021'];
