import { ReactNode } from 'react';

import Subtitle from '@/components/common/Subtitle';

interface SectionProps {
  children: ReactNode;
  title?: string;
  titleBtn?: ReactNode;
  className?: string;
}

export default function Section({
  children,
  title,
  titleBtn,
  className = '',
}: SectionProps) {
  return (
    <section
      className={`relative flex flex-col pb-20 pt-2.5 max-md:pb-16 ${className}`}
    >
      {title &&
        (titleBtn ? (
          <div className="mb-2 flex items-center justify-between px-1">
            <Subtitle title={title} />
            {titleBtn}
          </div>
        ) : (
          <Subtitle title={title} className="mb-2 pl-1" />
        ))}
      {children}
    </section>
  );
}
