import { FaRunning } from 'react-icons/fa';
import { getPercentage } from 'utils';

import Tag from 'components/common/Tag';

interface Props {
  currentPage: number;
  wholePage: number;
  isEnd: boolean;
}

export default function PagePosition({ currentPage, wholePage, isEnd }: Props) {
  const widthPercent = `${getPercentage(currentPage, wholePage).toFixed(0)}%`;

  return (
    <div className="mt-2 flex items-center gap-4">
      <div className="flex h-[14px] w-full items-center rounded-2xl border border-blue2 p-0.5">
        <div
          style={{ width: widthPercent }}
          className={`relative h-full rounded-3xl ${widthPercent === '100%' ? 'w-full bg-green1' : 'bg-yellow-300'}`}
        >
          <FaRunning
            className="absolute -right-1 bottom-0.5 fill-gray1"
            fontSize={14}
          />
        </div>
      </div>

      {widthPercent === '100%' && (
        <Tag
          text="🚀 챌린지 성공"
          color="green"
          className="ml-auto min-w-fit font-medium"
        />
      )}

      {widthPercent !== '100%' && isEnd && (
        <Tag
          text="😭 챌린지 실패"
          color="red"
          className="ml-auto min-w-fit font-medium"
        />
      )}
    </div>
  );
}
