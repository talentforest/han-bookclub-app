import { atom } from 'recoil';
import { thisYear } from 'util/index';
import { v4 } from 'uuid';

export const selectedYearAtom = atom({
  key: `selectedYear/${v4}`,
  default: `${thisYear}`,
});
