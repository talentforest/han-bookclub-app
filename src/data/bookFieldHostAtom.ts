import { atom } from 'recoil';
import { v4 } from 'uuid';

export const bookFieldHostState = atom<[]>({
  key: `fieldHost/${v4}`,
  default: [],
});
