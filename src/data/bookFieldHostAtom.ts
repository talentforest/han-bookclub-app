import { atom } from 'recoil';
import { v4 } from 'uuid';

export interface IBookFieldHost {
  field: string;
  month: number;
  host: string;
}

export const bookFieldHostState = atom<IBookFieldHost[]>({
  key: `fieldHost/${v4}`,
  default: [],
});
