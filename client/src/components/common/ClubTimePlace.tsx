import { FiCalendar, FiMapPin } from 'react-icons/fi';

import { formatDate } from '@/utils';

interface ClubTimePlaceProps {
  time: string;
  place: string;
  className?: string;
}

export default function ClubTimePlace({
  time,
  place,
  className,
}: ClubTimePlaceProps) {
  return (
    <div className={className}>
      <div className="mb-1 flex items-start gap-x-1">
        <FiCalendar className="mt-[3px] min-w-fit text-[15px] text-gray1" />
        <span className="text-[15px]">
          {!!time
            ? formatDate(time, 'M월 d일 a h:mm')
            : '정해진 모임 시간이 없습니다.'}
        </span>
      </div>

      <div className="flex items-start gap-x-1">
        <FiMapPin className="mt-[3px] min-w-fit text-[15px] text-gray1" />
        <span className="text-[15px]">
          {!!place ? place : '정해진 모임 장소가 없습니다.'}
        </span>
      </div>
    </div>
  );
}
