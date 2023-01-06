import { BookFieldType } from 'components/organisms/login/BookField';
import { authService, dbService } from 'fbase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_DATA } from 'util/index';

const useCreateAccount = (setShowNextStep?: (step: boolean) => void) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState('');
  const [username, setUsername] = useState('');
  const [userGender, setUserGender] = useState('');
  const [checkedBookField, setCheckedBookField] = useState(new Set());
  const navigate = useNavigate();

  const onFirstStepSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (password.length < 8)
        return setShowErrorMsg('비밀번호가 8자리 이하입니다.');
      if (password !== checkPassword)
        return setShowErrorMsg('비밀번호가 일치하지 않아요.');

      window.alert(
        '다음 단계에서 간단한 정보를 작성하시면 회원가입이 완료됩니다!'
      );
      setShowNextStep(true);
    } catch (error) {
      if ((error as Error).message.includes('email-already-in-use'))
        return setShowErrorMsg(
          '이미 사용되고 있는 이메일 계정입니다. 다른 이메일을 사용해주세요.'
        );
    }
  };

  const onFirstStepChange = (event: React.FormEvent<HTMLInputElement>) => {
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

  const onLastStepSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(authService, email, password);
      if (username && userGender && checkedBookField.size !== 0) {
        await setDoc(
          doc(dbService, USER_DATA, `${authService.currentUser?.uid}`),
          {
            favoriteBookField: Array.from(checkedBookField),
            gender: userGender,
            name: username,
            displayName: '한 페이지 멤버',
            photoUrl: '',
          }
        );
        window.alert(
          '회원가입이 성공적으로 완료되었습니다. 한페이지 북클럽의 멤버가 되신 것을 환영해요!'
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

  const onLastStepChange = async (event: React.FormEvent<HTMLInputElement>) => {
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

  const checkedBoxHandler = (bookFields: BookFieldType, checked: boolean) => {
    if (checked) {
      checkedBookField.add(bookFields);
      setCheckedBookField(checkedBookField);
    } else if (!checked && checkedBookField.has(bookFields)) {
      checkedBookField.delete(bookFields);
      setCheckedBookField(checkedBookField);
    }
  };

  return {
    email,
    password,
    checkPassword,
    showErrorMsg,
    onFirstStepChange,
    onFirstStepSubmit,
    username,
    userGender,
    checkedBookField,
    onLastStepChange,
    onLastStepSubmit,
    checkedBoxHandler,
  };
};

export default useCreateAccount;
