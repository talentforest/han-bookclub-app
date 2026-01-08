import { nextYear, thisYear } from '@/utils';

export const APP_CONSTANT = 'AppConstant';

export const BOOKCLUB_THIS_YEAR = `BookClub-${thisYear}` as const;
export const BOOKCLUB_NEXT_YEAR = `BookClub-${nextYear}` as const;
export const BOOKCLUB_2024 = 'BookClub-2024' as const;
export const BOOKCLUB_2023 = 'BookClub-2023' as const;
export const BOOKCLUB_2022 = 'BookClub-2022' as const;
export const BOOKCLUB_2021 = 'BookClub-2021' as const;

export const BOOK_VOTE = 'BookVote' as const;
export const CHALLENGE = 'Challenge' as const;
export const TAG_LIST = 'TagList' as const;
export const FCM_NOTIFICATION = 'FCMNotification' as const;
export const SENTENCES2024 = 'Sentence-2024' as const;
export const USER = 'User' as const;

/** SUB COLLECTION */
export const VOTED_ITEMS = 'VotedItems' as const;
export const RECOMMENDED_BOOKS = 'RecommendedBooks' as const;
export const HOST_REVIEW = 'HostReview' as const;
export const REVIEWS = 'Reviews' as const;
export const SUBJECTS = 'Subjects' as const;

/** DOC ID */
export const BOOK_FIELD_AND_HOST = 'BookFieldAndHost' as const;
export const ABSENCE_MEMBERS = 'AbsenceMembers' as const;
export const MEETING_PLACE = 'MeetingPlace' as const;
export const PENALTY = 'Penalty' as const;

export const postNameObj = {
  subCollection: {
    [SUBJECTS]: '발제문',
    [HOST_REVIEW]: '정리 기록',
    [RECOMMENDED_BOOKS]: '추천책',
    [REVIEWS]: '모임 후기',
  },
  collection: {
    [CHALLENGE]: '챌린지',
    [SENTENCES2024]: '공유하고 싶은 문구',
  },
} as const;
