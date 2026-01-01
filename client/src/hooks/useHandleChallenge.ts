import { useEffect, useMemo } from 'react';

import { where } from 'firebase/firestore';

import { useRecoilState, useRecoilValue } from 'recoil';

import { rereadingChallengeAtom } from '@/data/challengeAtom';
import { allUsersAtom } from '@/data/userAtom';

import { getCollection } from '@/api';

import { CHALLENGE } from '@/appConstants';

import { BaseBookData, BookWithRank, UserRank } from '@/types';

export const useHandleChallenge = (year: string) => {
  const memberList = useRecoilValue(allUsersAtom);

  const [userChallengeList, setUserChallengeList] = useRecoilState(
    rereadingChallengeAtom,
  );

  useEffect(() => {
    if (!userChallengeList) {
      getCollection(
        CHALLENGE,
        setUserChallengeList,
        where('__name__', '>=', `${year}-`),
      );
    }
  }, []);

  // 책 순위
  const bookWithRankList: BookWithRank[] = useMemo(() => {
    if (!userChallengeList) return null;

    const usersBookList = userChallengeList
      .map(item => {
        const { creatorId, id, ...rest } = item;

        return Object.entries(rest).map(
          ([_, { book, counts, impressionList }]) => {
            return {
              ...book,
              counts,
              id,
              impressionList: impressionList.map(item => ({
                ...item,
                creatorId,
              })),
            };
          },
        );
      })
      .flat();

    return Object.values(
      usersBookList.reduce<Record<string, BookWithRank>>((acc, book) => {
        const { title, counts, impressionList } = book;

        if (!acc[title]) {
          acc[title] = { ...book, readers: 1 };
        } else {
          acc[title].counts += counts;
          acc[title].readers += 1;
          acc[title].impressionList = [
            ...(acc[title].impressionList ?? []),
            ...impressionList,
          ];
        }

        return acc;
      }, {}),
    ).sort((a, b) => {
      return b.counts + b.readers - (a.counts + a.readers);
    });
  }, [userChallengeList]);

  // 유저 순위
  const userRankList: UserRank[] = useMemo(() => {
    const memberChallengeList = memberList.map(({ id }) => {
      const matched = userChallengeList?.find(
        ({ creatorId }) => creatorId === id,
      );
      return matched || { id, creatorId: id };
    });

    const usersWithCounts = memberChallengeList
      .map(user => {
        const rereadingBookList: ({ counts: number } & BaseBookData)[] =
          Object.entries(user)
            .filter(([key]) => key !== 'id' && key !== 'creatorId')
            .map(([_, value]: any) => ({
              ...value.book,
              counts: value.counts,
            }));

        const totalScore = rereadingBookList.reduce(
          (acc, cur) => acc + cur.counts,
          0,
        );

        return {
          creatorId: user.creatorId,
          totalScore,
          rereadingBookList,
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore);

    // rank 계산 (동점자 처리)
    let rank = 0;
    let prevScore: number | null = null;
    let prevRank = 0;

    return usersWithCounts.map((user, idx) => {
      const { rereadingBookList, creatorId, totalScore } = user;

      if (prevScore === totalScore) {
        rank = prevRank;
      } else {
        rank = idx + 1;
      }

      prevScore = totalScore;
      prevRank = rank;

      const totalRereadingCounts = rereadingBookList.reduce(
        (acc, { counts }) => acc + counts,
        0,
      );

      return { creatorId, rank, rereadingBookList, totalRereadingCounts };
    });
  }, [userChallengeList]);

  return {
    bookWithRankList,
    userRankList,
  };
};
