export function Time(createdAt: number) {
  const date = new Date(createdAt);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}
