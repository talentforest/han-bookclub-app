import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { USER } from 'appConstants';
import { authService, dbService } from 'fbase';
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';

const useDeleteAccount = () => {
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const userData = useRecoilValue(currentUserState);
  const navigate = useNavigate();
  const anonymous = authService.currentUser?.isAnonymous;

  const onDeleteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === '') return;
    const user = authService.currentUser;
    const credential = EmailAuthProvider.credential(user?.email, password);
    try {
      const checkDeleteAccount = window.confirm('정말 탈퇴하시겠어요?');
      if (checkDeleteAccount === true) {
        reauthenticateWithCredential(user, credential)
          .then(() => {
            const UserDataRef = doc(dbService, USER, `${userData.uid}`);
            deleteDoc(UserDataRef);
            deleteUser(user);
            navigate('/');
          })
          .catch(error => {
            if (error.message.includes('wrong-password')) {
              setShowMessage(true);
            }
          });
      } else {
        window.alert('취소되었습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (anonymous) return alert('익명의 방문자입니다!');
    setPassword(event.currentTarget.value);
  };

  return {
    onDeleteSubmit,
    showMessage,
    password,
    onChange,
  };
};

export default useDeleteAccount;
