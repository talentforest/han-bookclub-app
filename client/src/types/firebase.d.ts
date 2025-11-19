/* COLLECTION */
import {
  ABSENCE_MEMBERS,
  BOOK_FIELD_AND_HOST,
  BOOK_VOTE,
  CHALLENGE,
  FCM_NOTIFICATION,
  HOST_REVIEW,
  MEETING_PLACE,
  PENALTY,
  RECOMMENDED_BOOKS,
  REVIEWS,
  SENTENCES2024,
  SUBJECTS,
  TAG_LIST,
  USER,
  VOTED_ITEMS,
} from '@/appConstants';

export type FirebaseAuthUser = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
};

export type Collection =
  | `BookClub-${string}`
  | typeof BOOK_VOTE
  | typeof CHALLENGE
  | typeof TAG_LIST
  | typeof FCM_NOTIFICATION
  | typeof SENTENCES2024
  | typeof USER;

export type SubCollectionSegment =
  | typeof VOTED_ITEMS
  | typeof RECOMMENDED_BOOKS
  | typeof HOST_REVIEW
  | typeof REVIEWS
  | typeof SUBJECTS;

export type DocId =
  | typeof BOOK_FIELD_AND_HOST
  | typeof ABSENCE_MEMBERS
  | typeof MEETING_PLACE
  | typeof PENALTY
  | string;

export type SubCollection = `${Collection}/${DocId}/${SubCollectionSegment}`;
