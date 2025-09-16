import { v4 } from 'uuid';

import { atom, selector } from 'recoil';

import { getDocument } from '@/api';

import { BOOK_FIELD_AND_HOST } from '@/appConstants';

import { thisMonth, thisYear } from '@/utils';

import { MonthlyFieldAndHost } from '@/types';

interface IFieldAndHostDoc {
  id?: string;
  bookFieldAndHostList: MonthlyFieldAndHost[];
}

export const fieldAndHostAtom = atom<IFieldAndHostDoc>({
  key: `fieldAndHostAtom/${v4()}`,
  default: { id: '', bookFieldAndHostList: [] },
  effects: [
    ({ setSelf }) => {
      const fetchData = async () => {
        getDocument(`BookClub-${thisYear}`, BOOK_FIELD_AND_HOST, setSelf);
      };
      fetchData();
    },
  ],
});

export const nextMonthFieldAndHostSelector = selector<MonthlyFieldAndHost>({
  key: 'clubByMonthSelector',
  get: ({ get }) => {
    const fieldAndHost = get(fieldAndHostAtom);
    return fieldAndHost?.bookFieldAndHostList?.find(
      ({ month }) => month === +thisMonth + 1,
    );
  },
});
