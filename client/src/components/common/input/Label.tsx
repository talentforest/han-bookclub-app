import { ReactNode } from 'react';

interface LabelProps {
  title: string;
  children?: ReactNode;
  className?: string;
}

export default function Label({ title, children, className }: LabelProps) {
  return (
    <label
      htmlFor={!children ? title : undefined}
      className={`flex flex-col gap-1 ${className}`}
    >
      <span className="pl-1 text-sm text-gray1">{title}</span>
      {children && children}
    </label>
  );
}
