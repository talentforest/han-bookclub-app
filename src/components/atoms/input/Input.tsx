import { MutableRefObject } from 'react';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface IInputProps {
  id?: string;
  type?: 'password' | 'email' | 'text';
  name: string;
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
    <InputBox
      id={id}
      ref={ref}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      required={required}
    />
  );
};

export const InputBox = styled.input`
  width: 100%;
  min-height: 40px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #eee;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;
  font-size: 16px;
  @media ${device.tablet} {
    height: 45px;
  }
`;

export default Input;
