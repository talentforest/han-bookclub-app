import { FiBookmark } from 'react-icons/fi';

interface BookFieldProps {
  field: string;
}

export default function BookField({ field }: BookFieldProps) {
  return (
    <div className="mt-2 flex flex-1 items-center gap-x-0.5">
      <FiBookmark className="text-[15px] text-purple2" />
      <span className="text-[15px] text-purple2">{field}</span>
    </div>
  );
}
