interface LabelProps {
  text: string;
  htmlFor?: string;
  className?: string;
}

export default function Label({ text, htmlFor, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor || text}
      className={`flex flex-col py-1 pl-1 text-sm font-medium text-blue1 ${className}`}
    >
      {text}
    </label>
  );
}
