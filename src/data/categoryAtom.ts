import { atom } from 'recoil';
import { v4 } from 'uuid';

export type category = 'recommends' | 'subjects' | 'reviews';

export const categoryState = atom<category>({
  key: `category${v4()}`,
  default: 'subjects',
});
