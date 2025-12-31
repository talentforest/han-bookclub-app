import { FirebaseAuthUser } from '@/types/firebase';

export type UserProfile = {
  id?: string;
  name: string;
  favoriteBookField: ClubBookField[];
  tagColor: string;
  notification?: boolean;
  photoURL: { original: string; compressed: string };
  membershipJoinTime: string;
  hostYearMonthIdList: string[];
} & Pick<FirebaseAuthUser, 'email' | 'displayName'>;

export type UserAbsence = {
  month: number;
  breakMonth: boolean;
  onceAbsenceMonth: boolean;
};
