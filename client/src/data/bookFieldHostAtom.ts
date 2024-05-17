import { atom } from 'recoil';
import { v4 } from 'uuid';

interface Object {
  [name: string]: any;
}

export interface IBookFieldHostDoc extends Object {
  id: string;
  info: IBookFieldHost[];
}

export interface IBookFieldHost {
  detail: string;
  field: string;
  month: number;
  hosts: string[];
}

export const fieldHostState = atom<IBookFieldHost[]>({
  key: `fieldHost/${v4}`,
  default: [],
});

export const fieldHostDocState = atom<IBookFieldHostDoc>({
  key: `bookFieldHostDocs/${v4()}`,
  default: {} as IBookFieldHostDoc,
});
