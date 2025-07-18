import { thisYear } from '@/utils';

export const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

export const operationYearList = Array.from(
  { length: +thisYear - 2020 },
  (_, index) => `${+thisYear - index}`,
);
