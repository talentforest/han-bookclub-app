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
      className="h-11 w-full rounded-xl px-3 shadow-card"
    />
  );
};

export default Input;
