import { postTypeObj } from '@/appConstants';

import { FirebaseAuthUser } from '@/types/firebase';

export type UserProfile = {
  id?: string;
  name: string;
  favoriteBookField: ClubBookField[];
  tagColor: string;
  notification?: boolean;
  userRecords: UserRecords;
  photoURL: { original: string; compressed: string };
  membershipJoinTime: string;
} & Pick<FirebaseAuthUser, 'email' | 'displayName'>;

export type UserRecords = {
  [K in Exclude<keyof typeof postTypeObj, 'challenge'>]: UserRecordId[];
};

export type UserRecordId = {
  docId: string;
  monthId: string;
};

export type UserAbsence = {
  month: number;
  breakMonth: boolean;
  onceAbsenceMonth: boolean;
};
