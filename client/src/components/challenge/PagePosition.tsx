interface PagePositionProps {
  percentage: string;
}

export default function PagePosition({ percentage }: PagePositionProps) {
  return (
    <div className="mt-2 flex items-center gap-4">
      <div
        className={`flex h-[14px] w-full items-center rounded-2xl border p-0.5 ${percentage === '100%' ? 'border-green1' : 'border-yellow-600'}`}
      >
        <div
          style={{ width: percentage }}
          className={`relative h-full rounded-3xl ${percentage === '100%' ? 'w-full bg-green1' : 'bg-yellow-300'}`}
        />
      </div>
    </div>
  );
}
