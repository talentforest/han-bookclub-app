import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { BookField, USER, createAccountSteps } from 'appConstants';
import { authService, dbService } from 'fbase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const useCreateAccount = () => {
  const [currentStep, setCurrentStep] = useState(createAccountSteps[0]);

  const [keyword, setKeyword] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState('');

  const [username, setUsername] = useState('');
  const [userGender, setUserGender] = useState('');
  const [checkedBookField, setCheckedBookField] = useState(new Set());

  const navigate = useNavigate();

  const onFirstStepChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setKeyword(value);
  };

  const onFirstStepSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (keyword === process.env.REACT_APP_AUTH_MEMBER) {
      setCurrentStep({ step: 2, stepName: '계정 정보' });
    } else {
      alert('키워드가 일치하지 않습니다!');
    }
  };

  const onSecondStepSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      if (email.length === 0)
        return setShowErrorMsg('이메일이 작성되지 않았습니다!');

      if (password.length < 8)
        return setShowErrorMsg('비밀번호가 8자리 이하입니다.');

      if (password !== checkPassword)
        return setShowErrorMsg('비밀번호가 일치하지 않습니다.');

      window.alert(
        '다음 단계에서 간단한 정보를 작성하시면 회원가입이 완료됩니다!',
      );

      setCurrentStep({ step: 3, stepName: '멤버 정보' });
    } catch (error) {
      if ((error as Error).message.includes('email-already-in-use'))
        return setShowErrorMsg(
          '이미 사용되고 있는 이메일 계정입니다. 다른 이메일을 사용해주세요.',
        );
    }
  };

  const onSecondStepChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = event;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        setShowErrorMsg('');
        break;
      case 'checkPassword':
        setCheckPassword(value);
        break;
      default:
        break;
    }
  };

  const onThirdStepSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(authService, email, password);
      if (username && userGender && checkedBookField.size !== 0) {
        await setDoc(doc(dbService, USER, `${authService.currentUser?.uid}`), {
          favoriteBookField: Array.from(checkedBookField),
          gender: userGender,
          name: username,
          displayName: '한 페이지 멤버',
          photoURL: '',
        });
        window.alert(
          '회원가입이 성공적으로 완료되었습니다. 독서모임 한페이지의 멤버가 되신 것을 환영해요!',
        );
        navigate('/');
      } else {
        alert('입력하신 정보를 다시 한번 확인해주세요.');
      }
    } catch (error) {
      if ((error as Error).message.includes('auth/invalid-email'))
        return setShowErrorMsg('유효하지 않은 이메일 계정입니다.');
      console.error((error as Error).message);
    }
  };

  const onThirdStepChange = async (
    event: React.FormEvent<HTMLInputElement>,
  ) => {
    const {
      currentTarget: { name, value },
    } = event;

    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'gender':
        setUserGender(value);
        break;
      default:
        break;
    }
  };

  const checkedBoxHandler = (bookFields: BookField, checked: boolean) => {
    if (checked) {
      checkedBookField.add(bookFields);
      setCheckedBookField(checkedBookField);
    } else if (!checked && checkedBookField.has(bookFields)) {
      checkedBookField.delete(bookFields);
      setCheckedBookField(checkedBookField);
    }
  };

  return {
    currentStep,
    keyword,
    onFirstStepChange,
    onFirstStepSubmit,
    email,
    password,
    checkPassword,
    showErrorMsg,
    onSecondStepChange,
    onSecondStepSubmit,
    username,
    userGender,
    checkedBookField,
    onThirdStepChange,
    onThirdStepSubmit,
    checkedBoxHandler,
  };
};

export default useCreateAccount;
