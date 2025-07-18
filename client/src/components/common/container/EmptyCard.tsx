import { ReactNode } from 'react';

import SquareBtn from '@/components/common/button/SquareBtn';
import { LuArrowUpRight } from 'react-icons/lu';

interface EmptyContainerProps {
  text: string;
  children?: ReactNode;
  createBtnTitle?: string;
  onCreateClick?: () => void;
}

export default function EmptyCard({
  text,
  children,
  createBtnTitle,
  onCreateClick,
}: EmptyContainerProps) {
  return (
    <div className="flex h-full min-h-[200px] w-full flex-col items-center justify-center gap-5 rounded-card bg-white p-4 shadow-card max-md:h-[200px]">
      <span className="text-sm text-gray1">{text}</span>
      {onCreateClick && (
        <SquareBtn
          name={createBtnTitle}
          color="blue"
          handleClick={onCreateClick}
          tailChildren={<LuArrowUpRight size={18} />}
        />
      )}
      {children}
    </div>
  );
}
