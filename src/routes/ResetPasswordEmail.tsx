import { useState } from 'react';
import { authService } from 'fbase';
import { sendPasswordResetEmail } from 'firebase/auth';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import Subtitle from 'components/atoms/Subtitle';
import SquareBtn from 'components/atoms/button/SquareBtn';
import Input from 'components/atoms/input/Input';
import MobileHeader from 'layout/mobile/MobileHeader';

const ResetPasswordEmail = () => {
  const [email, setEmail] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendPasswordResetEmail(authService, email).catch((error) => {
      console.log(error);
    });
    setSubmitSuccess(true);
    setEmail('');
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSubmitSuccess(false);
    setEmail(event.currentTarget.value);
  };

  return (
    <>
      <MobileHeader showDesktop title='비밀번호 찾기' backBtn />

      <main>
        <Subtitle title='비밀번호가 생각나지 않으세요?' />
        <Detail>가입할 때 사용하신 계정 이메일을 적어주세요.</Detail>

        <InputForm onSubmit={onSubmit}>
          <Input
            name='email'
            type='email'
            value={email}
            placeholder='계정 이메일을 적어주세요.'
            onChange={onChange}
          />
          <SquareBtn type='submit' name='전송하기' />
        </InputForm>

        {submitSuccess ? (
          <Message>
            해당 이메일에 비밀번호 재설정 링크가 전송되었어요.
            <br /> 수신함에 메일이 보이지 않는다면 스팸을 확인해주세요.
          </Message>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};

const Detail = styled.p`
  margin-bottom: 10px;
  padding-left: 4px;
  color: ${({ theme }) => theme.text.gray4};
  font-size: 14px;
  @media ${device.tablet} {
    font-size: 14px;
  }
`;

const Message = styled(Detail)`
  color: #888;
  font-size: 14px;
  margin: 10px 0;
  text-align: start;
`;

const InputForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  > input {
    width: 100%;
  }
  > button {
    width: 100px;
  }
  @media ${device.tablet} {
    width: 70%;
  }
`;
export default ResetPasswordEmail;
