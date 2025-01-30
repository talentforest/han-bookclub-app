import { ReactNode } from 'react';

interface Props {
  text?: string;
  color?:
    | 'green'
    | 'lightGreen'
    | 'purple'
    | 'blue'
    | 'yellow'
    | 'red'
    | 'lightBlue'
    | 'lightGray';
  children?: ReactNode;
  shape?: 'rounded' | 'square';
  className?: string;
}

export default function Tag({
  text,
  color = 'blue',
  children,
  shape = 'square',
  className,
}: Props) {
  const bgColor = {
    blue: 'bg-blue1 text-white',
    lightBlue: 'bg-blue-200 text-text',
    yellow: 'bg-pointYellow text-white',
    purple: 'bg-purple3 text-text',
    lightGreen: 'bg-green3 text-text',
    green: 'bg-pointGreen text-text',
    red: 'bg-pointCoral text-white',
    lightGray: 'bg-white text-gray1',
  };

  const shapeStyle = {
    rounded: 'rounded-full',
    square: 'rounded-lg',
  };

  return (
    <div
      className={`text-sm ${shapeStyle[shape]} ${bgColor[color]} flex h-fit min-h-6 w-fit min-w-6 items-center gap-1 rounded-2xl px-3.5 py-1.5 shadow-card ${className}`}
    >
      <span>{text && text}</span>
      {children && children}
    </div>
  );
}
