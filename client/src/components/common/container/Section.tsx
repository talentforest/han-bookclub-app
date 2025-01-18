import { ReactNode } from 'react';

import Subtitle from 'components/common/Subtitle';

interface SectionProps {
  children: ReactNode;
  title?: string;
}

export default function Section({ children, title }: SectionProps) {
  return (
    <section className="relative mb-20 mt-2.5 flex flex-col sm:mb-10 md:mb-16">
      {title && <Subtitle title={title} />}
      {children}
    </section>
  );
}
