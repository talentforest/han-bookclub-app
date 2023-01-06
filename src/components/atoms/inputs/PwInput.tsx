import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface IPwInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  autoComplete: string;
}

const PwInput = ({
  name,
  placeholder,
  value,
  onChange,
  autoComplete,
}: IPwInputProps) => {
  return (
    <Input
      type='password'
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
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
    border-radius: 10px;
    outline: 2px solid ${(props) => props.theme.container.yellow};
    border: none;
  }
  @media ${device.tablet} {
    height: 60px;
    font-size: 18px;
  }
`;

export default PwInput;
