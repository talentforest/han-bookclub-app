import { ReactNode } from 'react';

interface Props {
  text?: string;
  color?: 'green' | 'purple' | 'blue' | 'yellow' | 'red';
  children?: ReactNode;
  shape?: 'rounded' | 'square';
  className?: string;
}

export default function Tag({
  text,
  color = 'blue',
  children,
  shape = 'rounded',
  className,
}: Props) {
  const textColor = {
    blue: 'text-[#3d70a0]',
    yellow: 'text-[#9f8116]',
    purple: 'text-[#695ac8]',
    green: 'text-[#379a32]',
    red: 'text-[#ea4f4f]',
  };

  const bgColor = {
    blue: 'bg-[#d1e9ff]',
    yellow: 'bg-[#ffe69d]',
    purple: 'bg-[#e3defd]',
    green: 'bg-[#bcf5d5]',
    red: 'bg-[#ffdfdf]',
  };

  const shapeStyle = {
    rounded: 'rounded-full',
    square: 'rounded-lg',
  };

  return (
    <div
      className={`text-sm sm:text-[13px] ${shapeStyle[shape]} ${bgColor[color]} flex h-fit w-fit min-w-fit items-center gap-1 rounded-2xl px-3.5 py-1.5 shadow-card ${className}`}
    >
      <span className={`${textColor[color]}`}>{text && text}</span>
      {children && children}
    </div>
  );
}
