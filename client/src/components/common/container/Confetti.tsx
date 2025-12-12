import { ReactNode } from 'react';

interface ConfettiProps {
  children: ReactNode;
  className?: string;
}

export default function Confetti({ children, className }: ConfettiProps) {
  return (
    <div className={`relative ${className}`}>
      <img
        src={`${import.meta.env.BASE_URL}/confetti.png`}
        alt="컨페티"
        className="absolute left-0 right-0 top-0 -z-10 mx-auto opacity-80"
      />

      {children}
    </div>
  );
}
