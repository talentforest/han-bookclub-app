import React, { ForwardedRef } from 'react';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface ITextInputProps {
  name?: string;
  value?: string;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const RefInput = React.forwardRef(
  (props: ITextInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <Input
        ref={ref}
        type='text'
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required
      />
    );
  }
);

const Input = styled.input`
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.text.gray1};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 8px 10px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #aaa;
  }
  @media ${device.tablet} {
    height: 60px;
    margin-bottom: 20px;
  }
`;
export default RefInput;
