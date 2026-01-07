import { useRecoilValue } from 'recoil';

import { challengeListByUserAtomFamily } from '@/data/challengeAtom';

import UserChallengeBookCard from '@/components/challenge/UserChallengeBookCard';
import GuideLine from '@/components/common/GuideLine';

interface ChallengeDisplayListProps {
  userId: string;
  limitNum?: number;
}

export default function ChallengeDisplayList({
  userId,
  limitNum,
}: ChallengeDisplayListProps) {
  const { status, data: challengeListByYear } = useRecoilValue(
    challengeListByUserAtomFamily(userId),
  );

  const { creatorId, docId, ...rest } = challengeListByYear?.[0] || {};

  const yearGuideLine = {
    2024: '최소 700페이지 이상의 도서를 정해 한해동안 완독합니다!',
    2025: '한해동안 모임책이나 추천책을 완독합니다!',
  };

  return (
    status === 'loaded' && (
      <>
        {limitNum === 1 && (
          <UserChallengeBookCard
            key={challengeListByYear[0].docId}
            challengeBook={Object.values(rest)[0]}
            creatorId={challengeListByYear[0].creatorId}
            docId={challengeListByYear[0].docId}
          />
        )}

        {(!limitNum || limitNum > 1) && (
          <ul className="flex flex-col divide-y-2 divide-dotted [&>li:first-child]:pt-0 [&>li:last-child]:pb-0">
            {challengeListByYear
              .slice(0, limitNum)
              .map(({ creatorId, docId, ...rest }) => (
                <li key={docId} className="py-6">
                  <h1 className="pb-1 pl-1 font-medium text-blue1">
                    {docId.slice(0, 4)}년 챌린지
                  </h1>

                  <GuideLine
                    text={yearGuideLine[+docId.slice(0, 4) as 2025 | 2024]}
                  />

                  <ul className="grid grid-cols-2 gap-4 max-sm:flex max-sm:flex-col">
                    {Object.entries(rest)
                      .slice(0, limitNum)
                      .map(([key, challengeBook]) => (
                        <li key={key}>
                          <UserChallengeBookCard
                            challengeBook={challengeBook}
                            creatorId={creatorId}
                            docId={docId}
                          />
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
          </ul>
        )}
      </>
    )
  );
}
