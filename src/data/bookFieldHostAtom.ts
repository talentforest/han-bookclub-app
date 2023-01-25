import { atom } from 'recoil';
import { v4 } from 'uuid';

export interface IBookFieldHostDoc {
  id?: string;
  info: IBookFieldHostInfo[];
}

export interface IBookFieldHostInfo {
  detail: string;
  field: string;
  month: number;
  host: string;
}

export const fieldHostState = atom<IBookFieldHostInfo[]>({
  key: `fieldHost/${v4}`,
  default: [],
});

export const fieldHostDocState = atom<IBookFieldHostDoc>({
  key: `bookFieldHostDocs/${v4()}`,
  default: {} as IBookFieldHostDoc,
});
