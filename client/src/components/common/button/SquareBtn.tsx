import { ReactNode } from 'react';

interface SquareBtnProps {
  name: string;
  type?: 'button' | 'submit';
  children?: ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
  color?: 'gray' | 'purple' | 'blue' | 'lightBlue';
  className?: string;
  tailChildren?: ReactNode;
}

export default function SquareBtn({
  name,
  type = 'button',
  children,
  disabled,
  handleClick,
  color = 'blue',
  className = '',
  tailChildren,
}: SquareBtnProps) {
  const colorStyleObj = {
    gray: 'text-gray1 bg-gray4',
    blue: 'text-white bg-blue1',
    purple: 'text-white bg-purple2',
    lightBlue: 'text-blue4 bg-blue2',
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`flex h-12 min-h-12 w-fit min-w-max items-center justify-center rounded-lg px-4 text-[15px] shadow-lg disabled:bg-gray4 disabled:text-gray2 max-sm:px-4 ${colorStyleObj[color]} ${className}`}
    >
      {children}

      <span className="font-medium tracking-tight">{name}</span>

      {tailChildren}
    </button>
  );
}
