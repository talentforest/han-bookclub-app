import { authService } from 'fbase';
import styled from 'styled-components';
import PwInput from 'components/atoms/inputs/PwInput';
import SubmitBtn from 'components/atoms/buttons/SubmitBtn';
import useChangePw from 'hooks/useChangePw';
import Header from 'layout/mobile/Header';

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
      <Header title='비밀번호 변경' backBtn />
      <main>
        <InputForm onSubmit={onSubmit}>
          <input
            hidden
            type='text'
            autoComplete='username'
            defaultValue={user?.email}
          />
          <PwInput
            name='password'
            value={originPassword}
            placeholder='기존 비밀번호를 작성해주세요.'
            onChange={onOriginChange}
            autoComplete='current-password'
          />
          <PwInput
            name='password'
            value={newPassword}
            placeholder='새로운 비밀번호를 작성해주세요.'
            onChange={onNewChange}
            autoComplete='new-password'
          />
          <PwInput
            name='password'
            value={checkNewPassword}
            placeholder='새로운 비밀번호를 다시 한번 작성해주세요.'
            onChange={onCheckNewChange}
            autoComplete='new-password'
          />
          <SubmitBtn children='변경하기' />
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
