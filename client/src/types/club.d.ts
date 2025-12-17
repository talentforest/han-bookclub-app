import { AddPrefixToKeys } from 'firebase/firestore';

import { monthlyClubInfo } from '@/appConstants';

import { BaseBookData } from '@/types/book';

export type MonthlyBookClub = {
  id?: string;
  creatorId: string;
  createdAt: string;
  book?: BaseBookData;
  meeting: {
    time: string;
    place: string;
    eventMonth?: {
      title: string;
      contents: {
        id: string;
        title: string;
        detail?: string;
        reward?: string;
        deadline?: string;
        result?: {
          users?: [];
          books?: {
            clubBook: BaseBookData;
            rank: number;
          }[];
          subjects?: {
            rank: number;
            yearMonthId: string;
            clubBook: BaseBookData;
            bestSubject?: string;
          }[];
          readingLifeQuestions?: {
            id: string;
            question: string;
            answerList: {
              userId: string;
              answer: string;
            }[];
          }[];
          detail?: string;
        };
      }[];
      hosts: string[];
    };
  };
};

type EventContent =
  MonthlyBookClub['meeting']['eventMonth']['contents'][number];

export type EventContentUpdateRoute = AddPrefixToKeys<
  'meeting.eventMonth',
  { contents: EventContent[] }
>;

export type MonthlyAbsenceMembers = {
  month: number;
  breakMembers: string[];
  onceAbsenceMembers: string[];
};

export type MonthlyFieldAndHost = {
  month?: number;
  field: string;
  hosts: string[];
  detail: string;
};

export type ClubBookField = {
  id: number;
  name: string;
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
  | `${string}년 독서모임 연말결산`
  | `${string}년 독서모임 한페이지 정보`
  | `${string}년 ${string} 정보`
  | `${string}의 한페이지`
  | `${string}의 한페이지 발제문`
  | `${string}의 한페이지 정리 기록`
  | `나의 ${string}년 모임 불참 설정`
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

export type MonthlyClubInfoType = typeof monthlyClubInfo;
