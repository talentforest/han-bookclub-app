import { FaMedal } from 'react-icons/fa';

import UserImgName from '@/components/common/user/UserImgName';

interface RankItemProps {
  rank: number;
  userId: string;
  data: string;
}

export default function RankItem({ rank, userId, data }: RankItemProps) {
  return (
    <li
      key={rank}
      className={`bg-darkGray flex w-full items-center gap-x-2 rounded-xl px-4 py-2.5 shadow-card`}
    >
      {rank === 1 && <FaMedal className="size-5 text-yellow-300" />}

      <span className="font-RomanticGumi text-lg font-bold text-white">
        {rank}
        <span className="text-sm font-bold text-white">위</span>
      </span>

      <UserImgName userId={userId} className="ml-2 text-white" />

      <span className="ml-auto flex font-medium text-white">{data}</span>
    </li>
  );
}
