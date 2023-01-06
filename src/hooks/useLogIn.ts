import { authService } from 'fbase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogIn = () => {
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

  return {
    email,
    password,
    error,
    onSubmit,
    onChange,
  };
};

export default useLogIn;
