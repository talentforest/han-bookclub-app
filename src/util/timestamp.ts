import { VoteDocument } from "./getFirebaseDoc";

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

export function voteTimestamp(createdAt: number | string) {
  const date = new Date(createdAt);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function dDay(item: VoteDocument) {
  const maxTime = new Date(item.deadline);
  const today = new Date();
  const diff = +maxTime - +today;
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));

  return `${diffDay + 1}일`;
}
