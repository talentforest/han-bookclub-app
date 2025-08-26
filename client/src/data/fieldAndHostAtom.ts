import { atom, selector } from 'recoil';

import { MonthlyFieldAndHost } from '@/types';
import { thisMonth } from '@/utils';
import { v4 } from 'uuid';

interface IFieldAndHostDoc {
  id?: string;
  bookFieldAndHostList: MonthlyFieldAndHost[];
}

export const fieldAndHostAtom = atom<IFieldAndHostDoc>({
  key: `fieldAndHostAtom/${v4()}`,
  default: { id: '', bookFieldAndHostList: [] },
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
