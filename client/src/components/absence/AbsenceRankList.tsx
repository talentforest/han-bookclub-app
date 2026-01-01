import { useCallback, useEffect } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { absenceAtom } from '@/data/absenceAtom';
import { allUsersAtom } from '@/data/userAtom';

import { getDocument } from '@/api';

import { ABSENCE_MEMBERS } from '@/appConstants';

import Confetti from '@/components/event/Confetti';
import RankItem from '@/components/event/RankItem';

type AbsenceRank = Record<string, { rank: number; absenceCount: number }>;

export default function AbsenceRankList() {
  const usersDoc = useRecoilValue(allUsersAtom);

  const [absenceMonthList, setAbsenceList] = useRecoilState(
    absenceAtom('2025'),
  );

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

        // 찾는 랭크에 맞는 배열 반환
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
    getDocument('BookClub-2025', ABSENCE_MEMBERS, setAbsenceList);
  }, []);

  const userIdList = getMatchRankList(1, 1).map(rank => Object.keys(rank)[0]);

  return (
    <div>
      <Confetti
        title="우수 멤버"
        userIdList={userIdList}
        marqueeText="우수 멤버로 선정된 것을 축하합니다!"
      />

      <ul className="mt-3 grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:flex max-sm:flex-col">
        {getMatchRankList(1, 10).map(rankedUser => {
          const userId = Object.keys(rankedUser)[0];
          const { rank, absenceCount } = rankedUser[userId];

          return (
            <RankItem
              key={userId}
              rank={rank}
              userId={userId}
              data={`불참 ${absenceCount}회`}
            />
          );
        })}
      </ul>
    </div>
  );
}
