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
  size?: 'sm' | 'md' | 'lg';
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
  size = 'md',
}: SquareBtnProps) {
  const colorStyleObj = {
    gray: 'text-gray1 bg-gray4',
    blue: 'text-white bg-blue1',
    purple: 'text-white bg-purple2',
    lightBlue: 'text-blue4 bg-blue2',
  };

  const sizeObj: { [size in 'sm' | 'md' | 'lg']: string } = {
    lg: 'h-14 min-h-14 px-4 text-[17px]',
    md: 'h-12 min-h-12 px-4 text-[15px]',
    sm: 'h-9 min-h-4 px-2 text-[13px]',
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`flex w-fit min-w-max items-center justify-center rounded-lg shadow-lg disabled:bg-gray4 disabled:text-gray2 max-sm:px-4 ${sizeObj[size]} ${colorStyleObj[color]} ${className}`}
    >
      {children}

      <span className="font-medium tracking-tight">{name}</span>

      {tailChildren}
    </button>
  );
}
