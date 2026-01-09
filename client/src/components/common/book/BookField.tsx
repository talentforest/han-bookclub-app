import { FiBookmark } from 'react-icons/fi';

interface BookFieldProps {
  field: string;
  className?: string;
}

export default function BookField({ field, className }: BookFieldProps) {
  return (
    <div className={`flex items-center gap-x-0.5 ${className}`}>
      <FiBookmark className="text-[15px] text-purple2" />
      <span className="text-[15px] text-purple2">{field}</span>
    </div>
  );
}
