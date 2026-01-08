import { where } from 'firebase/firestore';

import { atom, atomFamily, selectorFamily } from 'recoil';
import { DefaultValue } from 'recoil';

import { getCollection, getDocument } from '@/api';

import { isLoadingStatus, loadedStatus } from '@/appConstants';

import { thisYear } from '@/utils';

import { LoadableStatus, MonthlyBookClub } from '@/types';

const isLoadableStatus = <T>(
  v: DefaultValue | LoadableStatus<T>,
): v is LoadableStatus<T> => !(v instanceof DefaultValue);

/**
 * 특정 연도의 독서모임 리스트를 반환하는 atomFamily
 * @param year '2024' 형식의 연도
 * @return MonthlyBookClub[]
 */
export const clubListByYearAtom = atomFamily<
  LoadableStatus<MonthlyBookClub[]>,
  string
>({
  key: 'clubListByYearAtom',
  default: isLoadingStatus,
  effects: (year: string) => [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get') return;

      const unsubscribe = getCollection<MonthlyBookClub>(
        `BookClub-${year}`,
        setSelf,
        where('__name__', '>=', `${year}-`),
        where('__name__', '<=', `${year}-\uf8ff`),
      );

      return () => {
        unsubscribe();
      };
    },
  ],
});

/**
 * 특정 연월의 독서모임 정보를 반환하는 selector
 * @param yearMonthId '2024-03' 형식의 연월 ID
 * @return MonthlyBookClub | undefined | null
 * 초기 로딩 undefined 반환
 * 값이 없으면 null 반환
 */
export const clubByMonthSelector = selectorFamily<
  LoadableStatus<MonthlyBookClub>,
  string
>({
  key: 'clubByMonthSelector',
  get:
    (yearMonthId: string) =>
    ({ get }) => {
      const year = yearMonthId.slice(0, 4);
      const clubListByYear = get(clubListByYearAtom(year));

      if (clubListByYear.status === 'isLoading') return isLoadingStatus;

      const data = clubListByYear?.data?.find(
        ({ docId }) => docId === yearMonthId,
      );

      return { ...loadedStatus, data: data || null };
    },
});

/**
 * 특정 연월의 독서모임 리스트를 반환하는 atomFamily
 * @param yearMonthIdList '2024-03' 형식의 연월 ID 배열
 * @return MonthlyBookClub[]
 * 초기 로딩 null 반환
 * 값이 없으면 [] 반환
 */
export const clubByYearMonthIdListAtomFamily = atomFamily<
  LoadableStatus<MonthlyBookClub[]>,
  string
>({
  key: 'clubByYearMonthIdListAtomFamily',
  default: isLoadingStatus,
  effects: (idListString: string) => [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get') return;

      if (!idListString) {
        return setSelf({ status: 'loaded', data: [] });
      }

      const yearMonthIdList = idListString.split(',');

      yearMonthIdList.forEach(yearMonthId => {
        const year = yearMonthId.slice(0, 4);
        getDocument(
          `BookClub-${year}`,
          yearMonthId,
          (newParam: LoadableStatus<MonthlyBookClub>) => {
            setSelf(prev => {
              // prev가 없거나 로딩이면, 일단 loaded로 전환하면서 시작
              const prevList =
                isLoadableStatus(prev) && prev.status === 'loaded'
                  ? prev.data
                  : [];

              // 문서가 없으면(=null) 그냥 기존 유지(또는 정책적으로 빈 배열 반환)
              if (newParam.status !== 'loaded' || !newParam.data) {
                return { status: 'loaded', data: prevList };
              }

              const nextItem = { docId: yearMonthId, ...newParam.data };

              // 중복 방지(같은 docId 다시 들어오면 교체)
              const nextList = prevList.some(x => x.docId === yearMonthId)
                ? prevList.map(x => (x.docId === yearMonthId ? nextItem : x))
                : [...prevList, nextItem];

              return { status: 'loaded', data: nextList };
            });
          },
        );
      });
    },
  ],
});

export const selectedClubYearAtom = atom<string>({
  key: 'selectedClubYearAtom',
  default: thisYear,
});
