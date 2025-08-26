import { BookData } from '@/types/book';

export type MonthlyBookClub = {
  id?: string;
  creatorId: string;
  createdAt: string;
  book: BookData;
  meeting: {
    time: string;
    place: string;
  };
};

export type MonthlyFieldAndHost = {
  month: number;
  field: string;
  hosts: string[];
  detail: string;
};

export type ClubMonth =
  | '1월'
  | '2월'
  | '3월'
  | '4월'
  | '5월'
  | '6월'
  | '7월'
  | '8월'
  | '9월'
  | '10월'
  | '11월'
  | '12월';

export type ClubBookField = {
  id: number;
  name: string;
};

export type PageHeaderTitle =
  | '독서모임 한페이지'
  | '지난 한페이지'
  | '이달의 한페이지'
  | '한페이지 투표함'
  | `${string}의 책장`;

export type DetailPageHeaderTitle =
  | '공유하고 싶은 문구들'
  | '도서 정보'
  | `${string}모임책 투표함`
  | `${string}년 개인별 챌린지`
  | `${string}년 독서모임 한페이지 정보`
  | `${string}년 ${string} 정보`
  | `${string}의 한페이지`
  | `${string}의 한페이지 발제문`
  | `${string}의 한페이지 정리 기록`
  | '한페이지 정리 기록'
  | '도서 검색'
  | '설정'
  | '나의 모임불참 설정'
  | '개발자도구'
  | '알림'
  | '프로필 정보'
  | '비밀번호 변경'
  | '탈퇴';

export type NotLogInPage = '계정 생성' | '비밀번호 찾기';

export type BookClubInfo =
  | 'fieldAndHost'
  | 'absence'
  | 'challenge'
  | 'yearClosing';
