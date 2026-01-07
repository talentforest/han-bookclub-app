interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={`bg-skeleton animate-shimmer h-12 rounded-3xl bg-white shadow-card ${className}`}
    />
  );
}
