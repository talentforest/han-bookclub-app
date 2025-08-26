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
    <div className={`flex items-center ${className}`}>
      <span className="mt-0.5 text-[15px] text-gray1">D-DAY</span>
      <span>: {getDDay(hyphenDate)}</span>

      {isDateMark && (
        <span className="mt-0.5 text-sm text-gray1">
          ({formatDate(hyphenDate)})
        </span>
      )}
    </div>
  );
}
