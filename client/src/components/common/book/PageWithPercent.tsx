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
      className={`text-sm font-medium tracking-tighter ${percentNum === 100 ? 'text-green2' : 'text-pointCoral'}`}
    >
      {percentNum === 100 ? '🎊' : '❗️'} {currentPage} / {wholePage} (
      {percentNum}
      %)
    </span>
  );
}
