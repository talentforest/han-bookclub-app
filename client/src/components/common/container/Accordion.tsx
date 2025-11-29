import { ReactNode, useState } from 'react';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface AccordionProps {
  children: ReactNode;
  title?: ReactNode;
  headerChildren?: ReactNode;
  iconClassName?: string;
  className?: string;
}

export default function Accordion({
  title,
  children,
  headerChildren,
  iconClassName,
  className = '',
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => setIsOpen(prev => !prev);

  return (
    <li
      className={`h-fit list-none rounded-xl bg-white shadow-card ${className}`}
    >
      <div className="flex w-full items-center pl-4">
        {headerChildren ? headerChildren : <h1 className="py-2">{title}</h1>}

        <button
          type="button"
          onClick={toggleDetails}
          className="ml-auto px-4 py-5"
        >
          {isOpen ? (
            <FaChevronUp className={`size-3.5 text-blue3 ${iconClassName}`} />
          ) : (
            <FaChevronDown className={`size-3.5 text-blue3 ${iconClassName}`} />
          )}
        </button>
      </div>

      <div
        className={`flex overflow-hidden px-4 transition-[max-height] duration-500 ease-in-out max-sm:flex-col ${
          isOpen ? 'max-h-[5000px]' : 'max-h-0'
        }`}
      >
        {children}
      </div>
    </li>
  );
}
