import { ReactNode } from 'react';

import ReactDOM from 'react-dom';

import { FiX } from 'react-icons/fi';

import { useHandleModal } from '@/hooks';

interface ModalProps {
  width?: string;
  title: string;
  children: ReactNode;
  className?: string;
  headerType?: 'normal' | 'onlyTitle' | 'noHeader';
}

export default function Modal({
  title,
  children,
  className,
  headerType = 'normal',
}: ModalProps) {
  const { hideModal } = useHandleModal();

  const el = document.getElementById('modal');

  return ReactDOM.createPortal(
    <section
      className={`fixed inset-0 z-10 m-auto flex h-fit max-h-[80vh] w-[55vw] flex-col rounded-2xl bg-white p-5 max-sm:w-[90%] max-sm:px-4 ${className}`}
    >
      {headerType !== 'noHeader' && (
        <header className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-medium">{title}</h3>
          {headerType !== 'onlyTitle' && (
            <button type="button" onClick={() => hideModal()} className="px-1">
              <FiX size={20} />
            </button>
          )}
        </header>
      )}
      <div className="flex flex-col overflow-scroll scrollbar-hide">
        {children}
      </div>
    </section>,
    el,
  );
}
