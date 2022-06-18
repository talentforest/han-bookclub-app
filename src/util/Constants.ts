export const gender = ["여성", "남성"];

export const bookFields = [
  { id: 1, name: "소설/시" },
  { id: 2, name: "에세이" },
  { id: 3, name: "경제경영" },
  { id: 4, name: "역사" },
  { id: 5, name: "예술/대중문화" },
  { id: 6, name: "자기계발" },
  { id: 7, name: "인문학" },
  { id: 8, name: "사회과학" },
  { id: 9, name: "고전" },
  { id: 10, name: "과학" },
];

const date = new Date();

export const thisYearMonth = `${date.toISOString().substr(0, 7)}`;

export const thisYear = date.getFullYear();

export const thisMonth = date.getMonth() + 1;

export const today = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}`;
