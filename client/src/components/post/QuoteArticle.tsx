import { ReactNode } from 'react';

import { FaQuoteLeft } from 'react-icons/fa';

interface SubjectProps {
  subject: string;
  isDark?: boolean;
  isPreview?: boolean;
  children?: ReactNode;
  className?: string;
}

export default function QuoteArticle({
  subject,
  isDark,
  isPreview,
  children,
  className,
}: SubjectProps) {
  const replacedText = subject?.replaceAll('📍', '');

  return (
    <article
      className={`flex flex-col overflow-scroll scrollbar-hide ${className}`}
    >
      <p
        className={`${isPreview ? 'line-clamp-4' : ''} break-all text-start after:clear-both after:block after:content-['']`}
      >
        {!isPreview && (
          <FaQuoteLeft
            className={`float-left ml-1.5 mr-2 mt-1 block size-10 text-purple3`}
          />
        )}
        <span
          className={`${isDark ? 'text-white' : ''} text-start`}
          dangerouslySetInnerHTML={{ __html: replacedText }}
        />
      </p>

      {children}
    </article>
  );
}
