import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { authService, dbService } from '@/fbase';
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { USER } from '@/appConstants';

export const useDeleteAccount = () => {
  const [password, setPassword] = useState('');

  const [showMessage, setShowMessage] = useState(false);

  const {
    data: { uid },
  } = useRecoilValue(currAuthUserAtom);

  const navigate = useNavigate();

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
            const userDataRef = doc(dbService, USER, uid);
            deleteDoc(userDataRef);
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
    const anonymous = authService.currentUser?.isAnonymous;
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
