import { ReactNode } from 'react';

import ReactDOM from 'react-dom';

import { FiX } from 'react-icons/fi';

interface Props {
  onToggleClick: () => void;
  width?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Modal({
  onToggleClick,
  title,
  children,
  className,
}: Props) {
  const el = document.getElementById('modal');
  return ReactDOM.createPortal(
    <>
      <div
        role="presentation"
        className="fixed inset-0 z-10 size-full cursor-pointer bg-black opacity-60"
        onClick={onToggleClick}
      />

      <section
        className={`fixed inset-0 z-10 m-auto flex h-fit max-h-[80vh] w-[55vw] flex-col rounded-2xl bg-white p-5 sm:w-[90%] sm:px-4 ${className}`}
      >
        <header className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-medium">{title}</h3>
          <button type="button" onClick={onToggleClick} className="px-1">
            <FiX size={20} />
          </button>
        </header>

        {children}
      </section>
    </>,
    el,
  );
}
