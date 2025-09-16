import { TextareaHTMLAttributes } from 'react';

import Label from '@/components/common/input/Label';

interface TextareaProps {
  label?: string;
  containerClassName?: string;
}

export default function Textarea({
  label,
  containerClassName,
  ...rest
}: TextareaProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={`relative flex flex-col ${containerClassName}`}>
      {label && <Label text={label} />}

      <textarea
        {...rest}
        className={`h-32 w-full resize-none rounded-xl border border-gray1 p-3 outline-none hover:bg-blue-50 ${rest.className}`}
      />
    </div>
  );
}
