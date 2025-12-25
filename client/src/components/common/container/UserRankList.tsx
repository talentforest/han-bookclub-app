import { FaMedal } from 'react-icons/fa';

import UserImgName from '@/components/common/user/UserImgName';
import Confetti from '@/components/event/Confetti';

interface UserRankListProps {
  userIdList: string[];
  rankedUserList: AbsenceRank[];
}

type AbsenceRank = Record<string, { rank: number; absenceCount: number }>;

export default function UserRankList({
  userIdList,
  rankedUserList,
}: UserRankListProps) {
  return (
    <div>
      <Confetti
        title="우수 멤버"
        userIdList={userIdList}
        marqueeText="우수 멤버로 선정된 것을 축하합니다!"
      />

      <ul className="mt-3 grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:flex max-sm:flex-col">
        {rankedUserList.map(rankedUser => (
          <li
            key={Object.keys(rankedUser)[0]}
            className={`bg-darkGray flex w-full items-center gap-x-2 rounded-xl px-4 py-2.5 shadow-card`}
          >
            {rankedUser[Object.keys(rankedUser)[0]].rank === 1 && (
              <FaMedal className="size-5 text-yellow-300" />
            )}

            <span className="font-RomanticGumi text-lg font-bold text-white">
              {rankedUser[Object.keys(rankedUser)[0]].rank}
              <span className="text-sm font-bold text-white">위</span>
            </span>

            <UserImgName
              userId={Object.keys(rankedUser)[0]}
              className="ml-2 font-medium text-white"
            />

            <div className="ml-auto flex font-medium">
              <span className="block w-8 text-white">불참 </span>
              <span className="w-[25px] text-white">
                {rankedUser[Object.keys(rankedUser)[0]].absenceCount}회
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
