import { useState } from 'react';

import Subtitle from '@/components/common/Subtitle';
import SquareBtn from '@/components/common/button/SquareBtn';
import Input from '@/components/common/input/Input';
import { authService } from '@/fbase';
import MobileHeader from '@/layout/mobile/MobileHeader';
import { sendPasswordResetEmail } from 'firebase/auth';

const ResetPasswordEmail = () => {
  const [email, setEmail] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendPasswordResetEmail(authService, email).catch(error => {
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
      <MobileHeader showDesktop title="비밀번호 찾기" backBtn />

      <main>
        <Subtitle title="비밀번호가 생각나지 않으세요?" />
        <p>가입할 때 사용하신 계정 이메일을 적어주세요.</p>

        <form onSubmit={onSubmit}>
          <Input
            name="email"
            type="email"
            value={email}
            placeholder="계정 이메일을 적어주세요."
            onChange={onChange}
          />
          <SquareBtn type="submit" name="전송하기" />
        </form>

        {submitSuccess ? (
          <span>
            해당 이메일에 비밀번호 재설정 링크가 전송되었어요.
            <br /> 수신함에 메일이 보이지 않는다면 스팸을 확인해주세요.
          </span>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};

export default ResetPasswordEmail;
