import { thisYear } from '@/utils';

/* COLLECTION */

export type Collection =
  | typeof BOOKCLUB_THIS_YEAR
  | typeof BOOKCLUB_2024
  | typeof BOOKCLUB_2023
  | typeof BOOKCLUB_2022
  | typeof BOOKCLUB_2021
  | typeof BOOK_VOTE
  | typeof CHALLENGE
  | typeof TAG_LIST
  | typeof FCM_NOTIFICATION
  | typeof SENTENCES2024
  | typeof USER
  | string;

export type SubCollection =
  | typeof VOTED_ITEMS
  | typeof RECOMMENDED_BOOKS
  | typeof HOST_REVIEW
  | typeof REVIEW
  | typeof SUBJECTS;

export type DocId =
  | typeof BOOK_FIELD_AND_HOST
  | typeof ABSENCE_MEMBERS
  | typeof MEETING_PLACE
  | typeof PENALTY;

export const BOOKCLUB_THIS_YEAR = `BookClub-${thisYear}` as const;
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
export const REVIEW = 'Reviews' as const;
export const SUBJECTS = 'Subjects' as const;

/** DOC ID */
export const BOOK_FIELD_AND_HOST = 'BookFieldAndHost' as const;
export const ABSENCE_MEMBERS = 'AbsenceMembers' as const;
export const MEETING_PLACE = 'MeetingPlace' as const;
export const PENALTY = 'Penalty' as const;
