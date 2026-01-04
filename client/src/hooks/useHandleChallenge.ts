import { useRecoilValue } from 'recoil';

import { challengeAtomFamily } from '@/data/challengeAtom';
import { userListAtom } from '@/data/userAtom';

import {
  BaseBookData,
  BookImpression,
  BookRank,
  ChallengeBookValue,
  UserRank,
} from '@/types';

export const useHandleChallenge = (year: string) => {
  const { status: challengeStatus, data: userChallengeList } = useRecoilValue(
    challengeAtomFamily(year),
  );

  const { data: memberList } = useRecoilValue(userListAtom);

  // 책 순위
  const getBookRankList = (): BookRank[] => {
    if (!userChallengeList) return;
    const map = new Map<
      string,
      Omit<BookRank, 'rank'> // rank는 마지막에 부여
    >();

    for (const ch of userChallengeList) {
      const creatorId = ch.creatorId;

      for (const [key, value] of Object.entries(ch)) {
        if (key === 'docId' || key === 'creatorId') continue;
        if (!isChallengeBookValue(value)) continue;

        const { book, counts, impressionList } = value;
        const title = book.title;

        const impressionsWithCreator: BookImpression[] = (
          impressionList ?? []
        ).map(impression => ({ ...impression, creatorId }));

        const existing = map.get(title);

        if (!existing) {
          map.set(title, {
            ...book,
            total: counts ?? 0,
            readerList: creatorId ? [creatorId] : [],
            impressionList: impressionsWithCreator,
          });
        } else {
          existing.total += counts ?? 0;

          // readerList 중복 방지
          if (creatorId && !existing.readerList.includes(creatorId)) {
            existing.readerList.push(creatorId);
          }

          existing.impressionList.push(...impressionsWithCreator);
        }
      }
    }

    // 정렬 기준: total DESC (동점이면 안정정렬용 title)
    const sorted = Array.from(map.values()).sort((a, b) => {
      if (b.total !== a.total) return b.total - a.total;
      return a.title.localeCompare(b.title);
    });

    // rank 부여: 1,1,3 방식
    let prevTotal: number | null = null;
    let currentRank = 0;

    return sorted.map((item, idx) => {
      if (prevTotal === null || item.total !== prevTotal) {
        currentRank = idx + 1;
        prevTotal = item.total;
      }
      return { ...item, rank: currentRank };
    });
  };

  const isChallengeBookValue = (
    value: unknown,
  ): value is ChallengeBookValue => {
    if (!value || typeof value !== 'object') return false;

    const v = value as any;
    return (
      v.book &&
      typeof v.book === 'object' &&
      typeof v.counts === 'number' &&
      Array.isArray(v.impressionList)
    );
  };

  // 유저 순위
  const getUserRankList = (): UserRank[] => {
    if (!userChallengeList || !memberList) return [];
    // userChallengeList가 없으면 전원 0점으로 처리
    const challengeMap = new Map(
      (userChallengeList ?? []).map(ch => [ch.creatorId, ch]),
    );

    const base: Omit<UserRank, 'rank'>[] = memberList.map(m => {
      const creatorId = m.docId;
      const ch = challengeMap.get(creatorId);

      if (!ch) {
        return {
          creatorId,
          total: 0,
          bookList: [],
        };
      }

      let total = 0;
      const bookList: BaseBookData[] = [];

      for (const [key, value] of Object.entries(ch)) {
        if (key === 'docId' || key === 'creatorId') continue;
        if (!isChallengeBookValue(value)) continue;

        total += value.counts ?? 0;
        bookList.push(value.book);
      }

      return {
        creatorId,
        total,
        bookList,
      };
    });

    // 정렬: total DESC, 안정정렬 creatorId
    base.sort((a, b) => {
      if (b.total !== a.total) return b.total - a.total;
      return a.creatorId.localeCompare(b.creatorId);
    });

    // rank: 1,1,3 방식
    let prevTotal: number | null = null;
    let currentRank = 0;

    return base.map((item, idx) => {
      if (prevTotal === null || item.total !== prevTotal) {
        currentRank = idx + 1;
        prevTotal = item.total;
      }
      return { ...item, rank: currentRank };
    });
  };

  return {
    getBookRankList,
    getUserRankList,
    challengeStatus,
  };
};
