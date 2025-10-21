import { ReactNode } from 'react';

type tagColor =
  | 'green'
  | 'lightGreen'
  | 'purple'
  | 'blue'
  | 'yellow'
  | 'red'
  | 'lightBlue'
  | 'lightGray';

interface TagProps {
  text?: string;
  color?: tagColor;
  shape?: 'rounded' | 'square';
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export default function Tag({
  text,
  color = 'blue',
  children,
  shape = 'square',
  className,
  onClick,
}: TagProps) {
  const bgColor = {
    blue: 'bg-blue1 text-white',
    lightBlue: 'bg-blue-100 text-blue-700',
    yellow: 'bg-amber-100 text-yellow-700',
    purple: 'bg-purple3 text-purple-700',
    lightGreen: 'bg-green3 text-green-700',
    green: 'bg-emerald-200 text-green-900',
    red: 'bg-pointCoral text-white',
    lightGray: 'bg-white text-gray1',
  };

  const shapeStyle = {
    rounded: 'rounded-full',
    square: 'rounded-lg',
  };

  return onClick ? (
    <button type="button" onClick={onClick} className="min-w-fit">
      <div
        className={`text-sm ${shapeStyle[shape]} ${bgColor[color]} flex h-fit min-h-6 w-fit min-w-6 items-center gap-1 rounded-2xl px-4 py-2.5 ${className}`}
      >
        <span>{text && text}</span>
        {children && children}
      </div>
    </button>
  ) : (
    <div
      className={`min-w-fit text-sm ${shapeStyle[shape]} ${bgColor[color]} flex h-fit min-h-6 w-fit min-w-6 items-center gap-1 rounded-2xl px-4 py-2.5 ${className}`}
    >
      <span>{text && text}</span>
      {children && children}
    </div>
  );
}
