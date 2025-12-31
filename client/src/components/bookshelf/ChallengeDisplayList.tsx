import { useEffect, useState } from 'react';

import { orderBy, where } from 'firebase/firestore';

import { getCollection } from '@/api';

import { CHALLENGE } from '@/appConstants';

import { CompleteReadingChallenge } from '@/types';

import UserChallengeBookCard from '@/components/challenge/UserChallengeBookCard';

interface ChallengeDisplayListProps {
  userId: string;
  limitNum?: number;
}

export default function ChallengeDisplayList({
  userId,
  limitNum,
}: ChallengeDisplayListProps) {
  const [challengeListByYear, setChallengeListByYear] = useState<
    CompleteReadingChallenge[]
  >([]);

  useEffect(() => {
    getCollection(
      CHALLENGE,
      setChallengeListByYear,
      where('creatorId', '==', userId),
      orderBy('createdAt', 'asc'),
    );
  }, []);

  return limitNum === 1 ? (
    challengeListByYear[0] ? (
      <UserChallengeBookCard
        key={challengeListByYear[0].books[0].title}
        challengeBook={challengeListByYear[0].books[0]}
        creatorId={challengeListByYear[0].creatorId}
        docId={challengeListByYear[0].id}
      />
    ) : (
      <></>
    )
  ) : (
    <ul className="grid grid-cols-2 gap-4 max-sm:flex max-sm:flex-col">
      {challengeListByYear?.slice(0, limitNum).map(challengeByYear => (
        <li key={challengeByYear.id}>
          {limitNum !== 1 && (
            <h3 className="mb-2 ml-1.5 font-medium text-blue1">
              {challengeByYear.id.slice(0, 4)}년
            </h3>
          )}

          <ul className="grid grid-cols-1 gap-y-3">
            {challengeByYear.books
              ?.slice(0, limitNum)
              ?.map(challengeBook => (
                <UserChallengeBookCard
                  key={challengeBook.title}
                  challengeBook={challengeBook}
                  creatorId={challengeByYear.creatorId}
                  docId={challengeListByYear[0].id}
                />
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
