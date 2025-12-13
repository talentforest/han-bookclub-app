import { ReactNode } from 'react';

interface RankStageProps<T> {
  firstRank: T[];
  secondRank: T[];
  thirdRank: T[];
  children: (item: T) => ReactNode;
}

export default function RankStage<T>({
  firstRank,
  secondRank,
  thirdRank,
  children,
}: RankStageProps<T>) {
  return (
    <div className="relative mx-auto min-h-60 w-[290px]">
      <img
        src={`${import.meta.env.VITE_PUBLIC_URL}/stage.png`}
        alt="stage"
        className="mt-24 w-full"
      />

      <div className="absolute bottom-[88px] flex h-32 w-full items-end justify-around">
        <div className="mb-1.5 flex h-fit items-end justify-center">
          {secondRank.length !== 0
            ? secondRank.map(children)
            : [{ rank: 2 } as T].map(children)}
        </div>

        {/* 1위 */}
        <div className="mb-[52px] flex h-fit max-w-20 items-end justify-center">
          {firstRank.length !== 0
            ? firstRank.map(children)
            : [{ rank: 1 } as T].map(children)}
        </div>

        <div className="flex h-fit max-w-20 items-end justify-center">
          {secondRank.length + firstRank.length < 3 &&
            (thirdRank.length !== 0
              ? thirdRank.map(children)
              : [{ rank: 3 } as T].map(children))}
        </div>
      </div>
    </div>
  );
}
