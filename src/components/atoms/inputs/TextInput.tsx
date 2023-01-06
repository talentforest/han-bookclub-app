import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface ITextInputProps {
  name?: string;
  placeholder: string;
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const TextInput = ({ name, placeholder, value, onChange }: ITextInputProps) => {
  return (
    <Input
      type='text'
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  );
};

const Input = styled.input`
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  padding: 15px;
  font-size: 16px;
  &:focus {
    border-radius: 10px;
    outline: 2px solid ${(props) => props.theme.container.yellow};
    border: none;
  }
  @media ${device.tablet} {
    height: 60px;
    margin-bottom: 20px;
    font-size: 18px;
  }
`;
export default TextInput;
