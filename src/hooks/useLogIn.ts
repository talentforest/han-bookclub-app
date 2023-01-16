import { authService } from 'fbase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';

const useLogIn = (isLoggedIn: boolean) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigator = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(authService, email, password);
      navigator('/');
    } catch (error) {
      if ((error as Error).message.includes('user-not-found'))
        return setError('해당 유저의 정보를 찾을 수 없습니다.');
      if ((error as Error).message.includes('password'))
        return setError('비밀번호가 일치하지 않습니다.');
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onAnonymousLoginClick = () => {
    if (!isLoggedIn) {
      try {
        signInAnonymously(authService);
        onAuthStateChanged(authService, (user) => {
          if (user) {
            navigator('/');
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    email,
    password,
    error,
    onSubmit,
    onChange,
    onAnonymousLoginClick,
  };
};

export default useLogIn;
