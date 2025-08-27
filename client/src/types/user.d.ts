import { postTypeObj } from '@/appConstants';

import { FirebaseAuthUser } from '@/types/firebase';

export type UserProfile = {
  id?: string;
  name: string;
  favoriteBookField: ClubBookField[];
  tagColor: string;
  notification?: boolean;
  userRecords: UserRecords;
} & Pick<FirebaseAuthUser, 'photoURL' | 'email' | 'displayName'>;

export type UserRecords = {
  [K in Exclude<keyof typeof postTypeObj, 'challenge'>]: UserPostDocId[];
};

export type UserPostDocId = {
  docId: string;
  monthId: string;
};

export type UserAbsence = {
  month: number;
  breakMonth: boolean;
  onceAbsenceMonth: boolean;
};

export type MonthlyAbsenceMembers = {
  month: number;
  breakMembers: string[];
  onceAbsenceMembers: string[];
};

export type AbsenceObj = {
  id: string;
  absenceMembers: MonthlyAbsenceMembers[];
};
