import { ReactNode, useState } from 'react';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface AccordionProps {
  children: ReactNode;
  title?: ReactNode;
  headerChildren?: ReactNode;
  iconClassName?: string;
  className?: string;
  titleClassName?: string;
  initialOpen?: boolean;
}

export default function Accordion({
  title,
  children,
  headerChildren,
  iconClassName,
  className = '',
  titleClassName = '',
  initialOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const toggleDetails = () => setIsOpen(prev => !prev);

  return (
    <div className={`h-fit rounded-xl bg-white shadow-card ${className}`}>
      <div className="flex w-full items-center pl-4">
        {headerChildren ? (
          headerChildren
        ) : (
          <h1 className={titleClassName}>{title}</h1>
        )}

        <button type="button" onClick={toggleDetails} className="ml-auto p-4">
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
    </div>
  );
}
