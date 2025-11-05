import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { authService } from '@/fbase';
import {
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const useLogIn = (isLoggedIn: boolean) => {
  const [currEmail, setCurrEmail] = useState({ email: '', error: '' });
  const [currPassword, setCurrPassword] = useState({ password: '', error: '' });

  const navigate = useNavigate();

  const errorMsg = {
    email: {
      HAS_NOT_EMAIL: '이메일이 입력되지 않았습니다.',
    },
    password: {
      HAS_NOT_PASSWORD: '비밀번호가 입력되지 않았습니다.',
      NOT_CORRECT: '아이디나 비밀번호를 다시 한번 확인해주세요.',
    },
  };

  const setErrorMsg = (type: 'email' | 'password', error: string) => {
    if (type === 'email') {
      setCurrEmail(prev => ({ ...prev, error }));
    }
    if (type === 'password') {
      setCurrPassword(prev => ({ ...prev, error }));
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email } = currEmail;
    const { password } = currPassword;

    const {
      email: { HAS_NOT_EMAIL },
      password: { HAS_NOT_PASSWORD, NOT_CORRECT },
    } = errorMsg;

    try {
      if (!email && !password) {
        setErrorMsg('email', HAS_NOT_EMAIL);
        setErrorMsg('password', HAS_NOT_PASSWORD);
        return;
      }

      if (!email) {
        setErrorMsg('email', HAS_NOT_EMAIL);
        return;
      }

      if (!password) {
        setErrorMsg('password', HAS_NOT_PASSWORD);
        return;
      }

      await signInWithEmailAndPassword(authService, email, password);

      navigate('/');
    } catch (error) {
      if ((error as Error).message.includes('invalid-login-credentials'))
        setErrorMsg('password', NOT_CORRECT);
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = event;

    if (name === 'email') {
      setCurrEmail({ email: value, error: '' });
    }

    if (name === 'password') {
      setCurrPassword({ password: value, error: '' });
    }
  };

  const onAnonymousLoginClick = () => {
    if (!isLoggedIn) {
      try {
        signInAnonymously(authService);
        onAuthStateChanged(authService, user => {
          if (user) {
            navigate('/');
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    currEmail,
    currPassword,
    onSubmit,
    onChange,
    onAnonymousLoginClick,
  };
};
