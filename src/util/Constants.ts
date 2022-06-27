const date = new Date();

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

export const thisYearMonth = `${date.toISOString().substr(0, 7)}`;

export const thisYear = date.getFullYear();

export const thisMonth = date.getMonth() + 1;

export const today = () => {
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const today = `${thisYear}-${month}-${day}`;

  return today;
};

export const pickDay = (pickDay: Date) => {
  const year = new Date(pickDay).getFullYear();
  const month = ("0" + (new Date(pickDay).getMonth() + 1)).slice(-2);
  const day = ("0" + new Date(pickDay).getDate()).slice(-2);
  const today = `${year}-${month}-${day}`;

  return today;
};
