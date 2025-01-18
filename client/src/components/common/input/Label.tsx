interface LabelProps {
  title: string;
}

export default function Label({ title }: LabelProps) {
  return (
    <label htmlFor={title} className="mb-2 text-sm text-gray1">
      투표 제목
    </label>
  );
}
