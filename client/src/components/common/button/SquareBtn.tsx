import { ReactNode } from 'react';

interface Props {
  name: string;
  type?: 'button' | 'submit';
  children?: ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
  color?: 'gray' | 'purple' | 'blue' | 'orange';
  className?: string;
}

export default function SquareBtn({
  name,
  type = 'button',
  children,
  disabled,
  handleClick,
  color = 'blue',
  className = '',
}: Props) {
  const colorStyleObj = {
    gray: 'text-gray1 bg-gray4',
    blue: 'text-blue1 bg-blue2',
    purple: 'text-purple1 bg-purple3',
    orange: 'text-orange1 bg-orange3',
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`flex min-h-8 w-fit min-w-max items-center justify-center rounded-lg px-4 shadow-card sm:px-3 sm:py-2 ${colorStyleObj[color]} ${className}`}
    >
      {children}

      <span className="text-[15px] font-medium">{name}</span>
    </button>
  );
}
