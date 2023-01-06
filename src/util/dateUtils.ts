const date = new Date();
const offset = date.getTimezoneOffset() * 60000;
const today_offset = new Date(date.getTime() - offset);

export const thisYearMonth = `${today_offset.toISOString().substr(0, 7)}`;
export const thisYear = today_offset.getFullYear();
export const thisMonth = `${today_offset.getMonth() + 1}`;
export const dateNow = `${today_offset.getDate()}`;
export const today = `${today_offset.toISOString().substr(0, 10)}`;

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

export const pickDay = (pickDay: Date) => {
  const year = new Date(pickDay).getFullYear();
  const month = `0${new Date(pickDay).getMonth() + 1}`.slice(-2);
  const day = `0${new Date(pickDay).getDate()}`.slice(-2);
  const today = `${year}-${month}-${day}`;
  return today;
};

export function getDDay(deadline: string) {
  const today = new Date();
  const maxTime = new Date(deadline);
  const diff = +maxTime - +today;
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `${diffDay + 1}일`;
}
