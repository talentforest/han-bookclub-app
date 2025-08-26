import { ReactNode } from 'react';

import ReactDOM from 'react-dom';

import { FiX } from 'react-icons/fi';

interface ModalProps {
  onToggleClick?: () => void;
  width?: string;
  title: string;
  children: ReactNode;
  className?: string;
  headerType?: 'normal' | 'onlyTitle' | 'noHeader';
}

export default function Modal({
  onToggleClick,
  title,
  children,
  className,
  headerType = 'normal',
}: ModalProps) {
  const el = document.getElementById('modal');

  return ReactDOM.createPortal(
    <>
      <div
        role="presentation"
        className={`fixed inset-0 z-10 size-full ${onToggleClick ? 'cursor-pointer' : 'cursor-default'} bg-black opacity-60`}
        onClick={onToggleClick}
      />
      <section
        className={`fixed inset-0 z-10 m-auto flex h-fit max-h-[80vh] w-[55vw] flex-col rounded-2xl bg-white p-5 max-sm:w-[90%] max-sm:px-4 ${className}`}
      >
        {headerType !== 'noHeader' && (
          <header className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-medium">{title}</h3>
            {headerType !== 'onlyTitle' && (
              <button type="button" onClick={onToggleClick} className="px-1">
                <FiX size={20} />
              </button>
            )}
          </header>
        )}
        <div className="flex flex-col overflow-scroll scrollbar-hide">
          {children}
        </div>
      </section>
    </>,
    el,
  );
}
