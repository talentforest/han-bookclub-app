import { thisYear } from 'util/index';

export const yearOfBookClub = Array.from(
  { length: +thisYear - 2020 },
  (_, index) => `${+thisYear - index}`,
);
