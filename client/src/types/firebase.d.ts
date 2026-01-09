/* COLLECTION */
import {
  ABSENCE_MEMBERS,
  APP_CONSTANT,
  BOOK_FIELD_AND_HOST,
  BOOK_VOTE,
  CHALLENGE,
  FCM_NOTIFICATION,
  HOST_BOOKCLUB,
  HOST_REVIEW,
  PENALTY,
  RECOMMENDED_BOOKS,
  REVIEWS,
  SENTENCES2024,
  SUBJECTS,
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
  | typeof APP_CONSTANT
  | `BookClub-${string}`
  | typeof BOOK_VOTE
  | typeof CHALLENGE
  | typeof FCM_NOTIFICATION
  | typeof SENTENCES2024
  | typeof USER;

export type SubCollectionSegment =
  | typeof VOTED_ITEMS
  | typeof RECOMMENDED_BOOKS
  | typeof HOST_REVIEW
  | typeof REVIEWS
  | typeof SUBJECTS
  | typeof HOST_BOOKCLUB;

export type DocId =
  | typeof BOOK_FIELD_AND_HOST
  | typeof ABSENCE_MEMBERS
  | typeof PENALTY
  | string;

export type SubCollection = `${Collection}/${DocId}/${SubCollectionSegment}`;
