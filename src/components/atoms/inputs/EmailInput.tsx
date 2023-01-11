import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface IEmailInputProps {
  placeholder: string;
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const EmailInput = ({ placeholder, value, onChange }: IEmailInputProps) => {
  return (
    <Input
      type='email'
      name='email'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
      required
    />
  );
};

const Input = styled.input`
  width: 100%;
  padding: 12px 10px;
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.container.blue};
  border-radius: 10px;
  &:focus {
    outline: none;
  }
  @media ${device.tablet} {
    height: 60px;
    margin-bottom: 20px;
    font-size: 18px;
  }
`;

export default EmailInput;
