import { ReactNode } from 'react';

interface Props {
  name: string;
  type?: 'button' | 'submit';
  children?: ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
  color?: 'gray' | 'purple' | 'blue' | 'darkBlue';
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
}: Props) {
  const colorStyleObj = {
    gray: 'text-gray1 bg-gray4',
    blue: 'text-blue1 bg-blue2',
    darkBlue: 'text-white bg-darkBlue2',
    purple: 'text-purple1 bg-purple3',
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`flex h-12 min-h-12 w-fit min-w-max items-center justify-center rounded-lg px-4 text-[15px] shadow-card max-sm:px-4 ${colorStyleObj[color]} ${className}`}
    >
      {children}

      <span className="font-medium tracking-tight">{name}</span>

      {tailChildren}
    </button>
  );
}
