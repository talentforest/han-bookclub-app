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
      <span className="text-[15px] text-gray1">D-DAY</span>
      <span className="text-red-500">: {getDDay(hyphenDate)}</span>

      {isDateMark && (
        <span className="ml-2 text-sm text-gray1">
          {formatDate(hyphenDate)}
        </span>
      )}
    </div>
  );
}
