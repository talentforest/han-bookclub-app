import { authService } from 'fbase';
import styled from 'styled-components';
import useChangePw from 'hooks/useChangePw';
import MobileHeader from 'layout/mobile/MobileHeader';
import SquareBtn from 'components/atoms/button/SquareBtn';
import Input from 'components/atoms/input/Input';

const ChangePassword = () => {
  const user = authService?.currentUser;
  const {
    onSubmit,
    originPassword,
    onOriginChange,
    newPassword,
    onNewChange,
    checkNewPassword,
    onCheckNewChange,
  } = useChangePw();

  return (
    <>
      <MobileHeader title='비밀번호 변경' backBtn />
      <main>
        <InputForm onSubmit={onSubmit}>
          <input
            hidden
            type='text'
            autoComplete='username'
            defaultValue={user?.email}
          />
          <Input
            name='password'
            type='password'
            value={originPassword}
            placeholder='기존 비밀번호를 작성해주세요.'
            onChange={onOriginChange}
            autoComplete='current-password'
          />
          <Input
            name='password'
            type='password'
            value={newPassword}
            placeholder='새로운 비밀번호를 작성해주세요.'
            onChange={onNewChange}
            autoComplete='new-password'
          />
          <Input
            name='password'
            type='password'
            value={checkNewPassword}
            placeholder='새로운 비밀번호를 다시 한번 작성해주세요.'
            onChange={onCheckNewChange}
            autoComplete='new-password'
          />
          <SquareBtn type='submit' name='변경하기' />
        </InputForm>
      </main>
    </>
  );
};

const InputForm = styled.form`
  input {
    margin-bottom: 10px;
  }
`;

export default ChangePassword;
