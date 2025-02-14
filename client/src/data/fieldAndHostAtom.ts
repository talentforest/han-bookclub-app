import { atom, selector } from 'recoil';

import { thisMonth } from 'utils';
import { v4 } from 'uuid';

export type IFieldAndHost = {
  detail: string;
  field: string;
  month: number;
  hosts: string[];
};

interface IFieldAndHostDoc {
  id?: string;
  bookFieldAndHostList: IFieldAndHost[];
}

export const fieldAndHostAtom = atom<IFieldAndHostDoc>({
  key: `fieldAndHostAtom/${v4()}`,
  default: { id: '', bookFieldAndHostList: [] },
});

export const nextMonthFieldAndHostSelector = selector<IFieldAndHost>({
  key: 'clubByMonthSelector',
  get: ({ get }) => {
    const fieldAndHost = get(fieldAndHostAtom);
    return fieldAndHost?.bookFieldAndHostList?.find(
      ({ month }) => month === +thisMonth + 1,
    );
  },
});
