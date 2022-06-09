export function timestamp(createdAt: number | string) {
  const date = new Date(createdAt);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function meetingTimestamp(timeText: number | string) {
  const date = new Date(timeText);
  return `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 `;
}
