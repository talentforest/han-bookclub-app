import React, { ForwardedRef } from 'react';

interface RefInputProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
}

const RefInput = React.forwardRef(function RefInput(
  props: RefInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      type="text"
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      required
      className={`h-12 w-full rounded-xl pl-4 shadow-card placeholder:text-gray3 focus:outline-none ${props.className}`}
    />
  );
});

export default RefInput;
