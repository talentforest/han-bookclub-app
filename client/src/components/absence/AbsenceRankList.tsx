import { useCallback } from 'react';

import { useRecoilValue } from 'recoil';

import { absenceAtom } from '@/data/absenceAtom';
import { userListAtom } from '@/data/userAtom';

import Confetti from '@/components/event/Confetti';
import RankItem from '@/components/event/RankItem';

type AbsenceRank = {
  docId: string;
  name?: string;
  breakCount: number;
  onceCount: number;
  total: number;
  rank: number;
};

export default function AbsenceRankList({ year }: { year: string }) {
  const { data: usersDoc } = useRecoilValue(userListAtom);

  const { status, data: absenceMonthObj } = useRecoilValue(absenceAtom(year));

  const getMatchRankList: (rankFrom: number, rankTo: number) => AbsenceRank[] =
    useCallback(
      (rankFrom, rankTo) => {
        if (!absenceMonthObj || !usersDoc) return [];

        const counter = new Map<
          string,
          { breakCount: number; onceCount: number }
        >();

        Object.values(absenceMonthObj).forEach(
          ({ breakMembers, onceAbsenceMembers }) => {
            (breakMembers ?? []).forEach(uid => {
              const prev = counter.get(uid) ?? { breakCount: 0, onceCount: 0 };
              counter.set(uid, { ...prev, breakCount: prev.breakCount + 1 });
            });

            (onceAbsenceMembers ?? []).forEach(uid => {
              const prev = counter.get(uid) ?? { breakCount: 0, onceCount: 0 };
              counter.set(uid, { ...prev, onceCount: prev.onceCount + 1 });
            });
          },
        );

        const list: Omit<AbsenceRank, 'rank'>[] = usersDoc.map(({ docId }) => {
          const { breakCount, onceCount } = counter.get(docId) ?? {
            breakCount: 0,
            onceCount: 0,
          };
          const total = breakCount + onceCount;
          return { docId, breakCount, onceCount, total };
        });

        list.sort((a, b) => {
          if (a.total !== b.total) return a.total - b.total;
          return a.docId.localeCompare(b.docId);
        });

        // 동점 처리 rank 부여 (1,1,3 방식)
        const ranked: AbsenceRank[] = [];
        let prevTotal: number | null = null;
        let currentRank = 0;

        for (let i = 0; i < list.length; i++) {
          const item = list[i];

          if (prevTotal === null || item.total !== prevTotal) {
            currentRank = i + 1;
            prevTotal = item.total;
          }

          ranked.push({ ...item, rank: currentRank });
        }

        return ranked.filter(({ rank }) => rank >= rankFrom && rank <= rankTo);
      },
      [absenceMonthObj, usersDoc],
    );

  const userRankList = getMatchRankList(1, 1);

  return (
    <div>
      <Confetti
        title="우수 멤버"
        userIdList={userRankList.map(({ docId }) => docId)}
        marqueeText="우수 멤버로 선정된 것을 축하합니다!"
      />

      {status === 'loaded' && (
        <ul className="mt-3 grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:flex max-sm:flex-col">
          {getMatchRankList(1, 10).map(({ docId, rank, total }) => {
            return (
              <RankItem
                key={docId}
                rank={rank}
                userId={docId}
                data={`불참 ${total}회`}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
