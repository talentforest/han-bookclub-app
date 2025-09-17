import { LuBookHeart } from 'react-icons/lu';

interface LoopLoadingProps {
  size?: number;
  className?: string;
}

export default function LoopLoading({
  size = 200,
  className = '',
}: LoopLoadingProps) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-full ${className}`}
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth="11"
          fill="none"
          className="stroke-purple3"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray="45 240"
          strokeDashoffset="100"
          className="origin-center animate-spin border stroke-purple1"
        />
      </svg>
      <LuBookHeart className="absolute size-[40%] text-pointPurple" />
    </div>
  );
}
