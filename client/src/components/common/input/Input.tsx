import { MutableRefObject } from 'react';

interface IInputProps {
  id?: string;
  type?: 'password' | 'email' | 'text';
  name?: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: 'new-password' | 'username' | 'current-password' | 'email';
  required?: boolean;
  ref?: MutableRefObject<HTMLInputElement>;
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
}: IInputProps) => {
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
      className="h-12 w-full rounded-xl border border-gray2 px-4 py-3 shadow-card focus:outline-none"
    />
  );
};

export default Input;
