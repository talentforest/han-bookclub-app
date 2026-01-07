import { formatDate, getDDay } from '@/utils';

interface DDayProps {
  hyphenDate: string;
  isDateMark?: boolean;
  className?: string;
}

export default function DDay({
  hyphenDate,
  isDateMark = true,
  className,
}: DDayProps) {
  return (
    <div className={`flex items-center gap-x-1 ${className}`}>
      <span>DDAY</span>
      <span className="font-bold text-red-500">: {getDDay(hyphenDate)}</span>

      {isDateMark && (
        <span className="ml-1 text-gray1">
          ({formatDate(hyphenDate, 'yyyy년 M월 d일')})
        </span>
      )}
    </div>
  );
}
