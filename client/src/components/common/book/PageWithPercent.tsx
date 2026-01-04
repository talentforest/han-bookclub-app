import { getPercentageNum } from '@/utils';

interface PageWithPercentProps {
  currentPage: number;
  wholePage: number;
}

export default function PageWithPercent({
  currentPage,
  wholePage,
}: PageWithPercentProps) {
  const percentNum = getPercentageNum(currentPage, wholePage);

  return (
    <span
      className={`px-0.5 pt-2 text-sm font-medium tracking-tighter ${percentNum === 100 ? 'text-green1' : 'text-pointCoral'}`}
    >
      {currentPage} / {wholePage} ({percentNum}
      %)
    </span>
  );
}
