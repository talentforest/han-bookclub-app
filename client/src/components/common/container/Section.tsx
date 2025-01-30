import { ReactNode } from 'react';

import Subtitle from 'components/common/Subtitle';

interface SectionProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export default function Section({
  children,
  title,
  className = '',
}: SectionProps) {
  return (
    <section
      className={`relative mb-20 mt-2.5 flex flex-col max-md:mb-16 ${className}`}
    >
      {title && <Subtitle title={title} />}
      {children}
    </section>
  );
}
