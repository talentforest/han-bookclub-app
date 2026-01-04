import { atomFamily, selectorFamily } from 'recoil';

import { getDocument } from '@/api';

import { BOOK_FIELD_AND_HOST, isLoadingStatus } from '@/appConstants';

import { LoadableStatus, MonthlyFieldAndHost } from '@/types';

interface FieldAndHost {
  [key: string]: MonthlyFieldAndHost;
}

export const fieldAndHostAtomFamily = atomFamily<
  LoadableStatus<FieldAndHost>,
  string
>({
  key: 'fieldAndHostAtomFamily',
  default: isLoadingStatus,
  effects: (year: string) => [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get') return;
      getDocument(`BookClub-${year}`, BOOK_FIELD_AND_HOST, setSelf);
    },
  ],
});

export const fieldAndHostSelector = selectorFamily<
  MonthlyFieldAndHost | null,
  string
>({
  key: 'fieldAndHostSelector',
  get:
    (yearMonthId: string) =>
    ({ get }) => {
      const year = yearMonthId.slice(0, 4);
      const fieldAndHostObj = get(fieldAndHostAtomFamily(year));

      if (fieldAndHostObj.status === 'isLoading' || !fieldAndHostObj.data) {
        return null;
      }

      const month = `${+yearMonthId.slice(-2)}월`;

      return fieldAndHostObj.data[month];
    },
});
