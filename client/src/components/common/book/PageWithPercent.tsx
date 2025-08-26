import { getPercentage } from '@/utils';

interface PageWithPercentProps {
  currentPage: number;
  wholePage: number;
}

export default function PageWithPercent({
  currentPage,
  wholePage,
}: PageWithPercentProps) {
  const percentNum = getPercentage(currentPage, wholePage);

  return (
    <span className="text-[13px] font-medium text-gray1">
      {currentPage}p / {wholePage}p ({percentNum.toFixed(0)}%)
    </span>
  );
}
