import { v4 } from 'uuid';

import { atomFamily, selectorFamily } from 'recoil';

import { getDocument } from '@/api';

import { BOOK_FIELD_AND_HOST } from '@/appConstants';

import { MonthlyFieldAndHost } from '@/types';

interface FieldAndHost {
  [key: string]: MonthlyFieldAndHost;
}

export const fieldAndHostAtomFamily = atomFamily<FieldAndHost | null, string>({
  key: `fieldAndHostAtomFamily/${v4}`,
  default: {} as FieldAndHost,
  effects: (year: string) => [
    ({ setSelf }) => {
      const fetchData = async () => {
        getDocument(`BookClub-${year}`, BOOK_FIELD_AND_HOST, setSelf);
      };

      fetchData();
    },
  ],
});

export const fieldAndHostSelector = selectorFamily({
  key: 'fieldAndHostSelector',
  get:
    (yearMonthId: string) =>
    ({ get }) => {
      const year = yearMonthId.slice(0, 4);

      const fieldAndHostObj = get(fieldAndHostAtomFamily(year));

      const month = `${+yearMonthId.slice(-2)}월`;

      return fieldAndHostObj[month] || null;
    },
});
