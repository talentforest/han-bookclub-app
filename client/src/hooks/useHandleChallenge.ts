import { useRecoilValue } from 'recoil';

import { challengeAtomFamily } from '@/data/challengeAtom';
import { userListAtom } from '@/data/userAtom';

import { BaseBookData, BookImpression, BookRank, UserRank } from '@/types';

export const useHandleChallenge = (year: string) => {
  const { status: challengeStatus, data: userChallengeList } = useRecoilValue(
    challengeAtomFamily(year),
  );

  const { data: memberList } = useRecoilValue(userListAtom);

  // 책 순위
  const getBookRankList = (): BookRank[] => {
    if (!userChallengeList) return;
    const map = new Map<string, Omit<BookRank, 'rank'>>();

    for (const challenge of userChallengeList) {
      const { docId, creatorId, ...bookObj } = challenge;

      for (const [_, value] of Object.entries(bookObj)) {
        const { book, readingTimeList, impressionList } = value;
        const title = book.title;

        const impressionsWithCreator: BookImpression[] = (
          impressionList ?? []
        ).map(impression => ({
          ...impression,
          creatorId: challenge.creatorId,
        }));

        const existing = map.get(title);

        if (!existing) {
          map.set(title, {
            ...book,
            total: readingTimeList?.length ?? 0,
            readerList: challenge.creatorId ? [challenge.creatorId] : [],
            impressionList: impressionsWithCreator,
          });
        } else {
          existing.total += readingTimeList?.length ?? 0;

          if (
            challenge.creatorId &&
            !existing.readerList.includes(challenge.creatorId)
          ) {
            existing.readerList.push(challenge.creatorId);
          }

          existing.impressionList.push(...impressionsWithCreator);
        }
      }
    }

    const sorted = Array.from(map.values()).sort((a, b) => {
      if (b.total !== a.total) return b.total - a.total;
      return a.title.localeCompare(b.title);
    });

    let prevTotal: number | null = null;
    let currentRank = 0;

    return sorted?.map((item, idx) => {
      if (prevTotal === null || item.total !== prevTotal) {
        currentRank = idx + 1;
        prevTotal = item.total;
      }
      return { ...item, rank: currentRank };
    });
  };

  // 유저 순위
  const getUserRankList = (): UserRank[] => {
    if (!userChallengeList || !memberList) return [];

    const challengeMap = new Map(
      (userChallengeList ?? []).map(ch => [ch.creatorId, ch]),
    );

    const base: Omit<UserRank, 'rank'>[] = memberList.map(member => {
      const challengeByUser = challengeMap.get(member.docId);

      if (!challengeByUser) {
        return {
          creatorId: member.docId,
          total: 0,
          bookList: [],
        };
      }

      let total = 0;

      const bookList: BaseBookData[] = [];

      const { docId, creatorId, ...bookObj } = challengeByUser;

      for (const [_, value] of Object.entries(bookObj)) {
        total += value?.readingTimeList?.length ?? 0;
        bookList.push(value.book);
      }

      return {
        creatorId,
        total,
        bookList,
      };
    });

    base.sort((a, b) => {
      if (b.total !== a.total) return b.total - a.total;
      return a.creatorId.localeCompare(b.creatorId);
    });

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
