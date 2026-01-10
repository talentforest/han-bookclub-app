import { ReactNode } from 'react';

import { FaQuoteLeft } from 'react-icons/fa';

import EditorContent from '@/components/common/editor/EditorContent';

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
      {!isPreview ? (
        <div>
          <FaQuoteLeft
            className={`float-left ml-1.5 mr-2 mt-1 block size-10 text-purple3`}
          />
          <EditorContent
            text={replacedText}
            className={`${isDark ? 'text-white' : ''} text-start`}
          />
        </div>
      ) : (
        <span
          className={`${isDark ? 'text-white' : ''} line-clamp-4 text-start`}
          dangerouslySetInnerHTML={{ __html: replacedText }}
        />
      )}

      {children}
    </article>
  );
}
