import { formatDate, getDDay } from 'utils';

interface Props {
  hyphenDate: string;
  isDateMark?: boolean;
  className?: string;
}

export default function DDay({
  hyphenDate,
  isDateMark = true,
  className,
}: Props) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="mt-0.5">D-DAY</span>
      <span>: {getDDay(hyphenDate)}</span>

      {isDateMark && (
        <span className="mt-0.5 text-sm text-gray1">
          ({formatDate(hyphenDate)})
        </span>
      )}
    </div>
  );
}
