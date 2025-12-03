import { useCallback, useEffect } from 'react';

import { FaMedal } from 'react-icons/fa';

import { useRecoilState, useRecoilValue } from 'recoil';

import { absenceAtom } from '@/data/absenceAtom';
import { allUsersAtom } from '@/data/userAtom';

import { getDocument } from '@/api';

import { ABSENCE_MEMBERS, BOOKCLUB_THIS_YEAR } from '@/appConstants';

import UserImgName from '@/components/common/user/UserImgName';

type AbsenceRank = Record<string, { rank: number; absenceCount: number }>;

export default function AbsenceRankList() {
  const usersDoc = useRecoilValue(allUsersAtom);

  const [absenceMonthList, setAbsenceList] = useRecoilState(absenceAtom);

  const getMatchRankList: (rankFrom: number, rankTo: number) => AbsenceRank[] =
    useCallback(
      (rankFrom, rankTo) => {
        if (absenceMonthList?.absenceMembers === undefined) return [];

        const allAbsenceUserList = absenceMonthList?.absenceMembers?.flatMap(
          ({ breakMembers, onceAbsenceMembers }) => [
            ...breakMembers,
            ...onceAbsenceMembers,
          ],
        );

        const absenceUserObj = new Set(allAbsenceUserList);

        const noAbsenceUserList: Record<string, number>[] = usersDoc
          .filter(({ id }) => !absenceUserObj.has(id))
          .map(({ id }) => ({ [id]: 0 }));

        const absenceUserList: Record<string, number>[] = Object.entries(
          allAbsenceUserList.reduce(
            (acc, cur) => {
              acc[cur] = (acc[cur] || 0) + 1;
              return acc;
            },
            {} as Record<string, number>,
          ),
        ).map(([key, value]) => ({ [key]: value }));

        const rankedAbsenceList: AbsenceRank[] = [
          ...noAbsenceUserList,
          ...absenceUserList,
        ]
          .sort((a, b) => +Object.values(a) - +Object.values(b))
          .reduce((acc: AbsenceRank[], cur, idx, sortedArr) => {
            const [userId, absenceCount] = Object.entries(cur)[0];

            let rank;

            if (idx === 0) {
              rank = 1;
            } else {
              const [_, prevAbsenceCount] = Object.entries(
                sortedArr[idx - 1],
              )[0];
              const prevRank = Object.values(acc[idx - 1])[0]?.rank;
              rank =
                absenceCount === prevAbsenceCount ? prevRank : prevRank + 1;
            }

            acc.push({ [userId]: { rank, absenceCount } });

            return acc;
          }, []);

        const result = rankedAbsenceList.filter(item => {
          const userId = Object.keys(item)[0];
          const itemRank = item[userId].rank;

          const fromToArr = Array.from(
            { length: rankTo - rankFrom + 1 },
            (_, i) => rankFrom + i,
          );

          return fromToArr.includes(itemRank);
        });

        return result;
      },
      [absenceMonthList, usersDoc],
    );

  useEffect(() => {
    getDocument(BOOKCLUB_THIS_YEAR, ABSENCE_MEMBERS, setAbsenceList);
  }, []);

  return (
    <ul className="flex flex-col gap-y-2">
      {getMatchRankList(1, 3).map(rankedUser => (
        <li
          key={Object.keys(rankedUser)[0]}
          className={`flex w-full items-center rounded-xl bg-white px-5 py-3 shadow-card ${rankedUser[Object.keys(rankedUser)[0]].rank === 1 ? 'border-2 border-yellow-400 !py-4' : ''}`}
        >
          {rankedUser[Object.keys(rankedUser)[0]].rank === 1 && (
            <FaMedal className="mr-2 size-5 text-yellow-600" />
          )}

          <span className="w-12 font-RomanticGumi text-base font-medium text-blue2">{`${rankedUser[Object.keys(rankedUser)[0]].rank}위`}</span>
          <UserImgName userId={Object.keys(rankedUser)[0]} />

          <div className="ml-auto flex font-medium">
            <span className="block w-8">불참 </span>
            <span className="w-[25px]">
              {rankedUser[Object.keys(rankedUser)[0]].absenceCount}회
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
