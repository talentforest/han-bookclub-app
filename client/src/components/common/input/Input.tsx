import { MutableRefObject } from 'react';

interface InputProps {
  id?: string;
  type?: 'password' | 'email' | 'text';
  name?: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: 'new-password' | 'username' | 'current-password' | 'email';
  required?: boolean;
  ref?: MutableRefObject<HTMLInputElement>;
  className?: string;
}

const Input = ({
  id,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  autoComplete,
  required,
  ref,
  className,
}: InputProps) => {
  return (
    <input
      id={id}
      ref={ref}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      required={required}
      className={`h-12 w-full rounded-xl border px-3 py-2 shadow-card focus:outline-none ${className}`}
    />
  );
};

export default Input;
