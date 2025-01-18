import { FaRunning } from 'react-icons/fa';
import { getPercentage } from 'utils';

interface Props {
  currentPage: number;
  wholePage: number;
}

export default function PagePosition({ currentPage, wholePage }: Props) {
  const widthPercent = `${getPercentage(currentPage, wholePage).toFixed(0)}%`;

  return (
    <>
      <div className="mb-1 mt-3 flex h-[14px] w-full items-center rounded-2xl border border-blue2 p-0.5">
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
        <span className="absolute right-2.5 top-2.5 text-sm font-medium text-green1">
          ⭐️챌린지 달성⭐️
        </span>
      )}
    </>
  );
}
