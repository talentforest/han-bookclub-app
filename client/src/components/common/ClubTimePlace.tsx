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
      <div className="mb-1 flex items-center gap-x-1">
        <FiCalendar className="text-[15px]" />
        <span className="text-[15px]">
          {!!time
            ? formatDate(time, 'M월 d일 EEEE h시 mm분')
            : '정해진 모임 시간이 없습니다.'}
        </span>
      </div>

      <div className="flex items-center gap-x-1">
        <FiMapPin className="text-[15px]" />
        <span className="text-[15px]">
          {!!place ? place : '정해진 모임 장소가 없습니다.'}
        </span>
      </div>
    </div>
  );
}
