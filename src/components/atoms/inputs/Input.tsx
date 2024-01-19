import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface IPwInputProps {
  type?: 'password' | 'email' | 'text';
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  autoComplete?: 'new-password' | 'username' | 'current-password' | 'email';
  required?: boolean;
}

const Input = ({
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  autoComplete,
  required,
}: IPwInputProps) => {
  return (
    <InputBox
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
