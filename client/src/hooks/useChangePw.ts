import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { authService } from 'fbase';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';

const useChangePw = () => {
  const [originPassword, setOriginPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkNewPassword, setCheckNewPassword] = useState('');
  const anonymous = authService.currentUser?.isAnonymous;
  const user = authService?.currentUser;
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!originPassword || !newPassword || !checkNewPassword) return;
    const credential = EmailAuthProvider.credential(
      user?.email,
      originPassword,
    );
    reauthenticateWithCredential(user, credential)
      .then(() => {
        if (newPassword !== checkNewPassword) {
          alertNotSameNewPassword();
          return;
        }
        successUpdatePassword();
      })
      .catch(error => {
        console.error(error);
        if ((error as Error).message.includes('auth/missing-email'))
          return window.alert('익명의 방문자입니다.');
      });
  };

  const onNewChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (anonymous) return alert('익명의 방문자입니다!');
    setNewPassword(event.currentTarget.value);
  };
  const onOriginChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (anonymous) return alert('익명의 방문자입니다!');
    setOriginPassword(event.currentTarget.value);
  };
  const onCheckNewChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (anonymous) return alert('익명의 방문자입니다!');
    setCheckNewPassword(event.currentTarget.value);
  };
  function alertNotSameNewPassword() {
    window.alert('새로운 비밀번호가 똑같지 않습니다. 다시 한번 확인해주세요.');
  }

  function successUpdatePassword() {
    updatePassword(user, newPassword)
      .then(() => {
        window.alert('비밀번호가 성공적으로 변경되었습니다.');
        setOriginPassword('');
        setNewPassword('');
        setCheckNewPassword('');
        navigate(-1);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return {
    onSubmit,
    originPassword,
    onOriginChange,
    newPassword,
    onNewChange,
    checkNewPassword,
    onCheckNewChange,
  };
};

export default useChangePw;
