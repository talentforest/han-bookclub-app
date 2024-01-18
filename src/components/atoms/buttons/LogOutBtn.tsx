import { useNavigate } from 'react-router-dom';
import { authService } from 'fbase';
import styled from 'styled-components';
import useAlertAskJoin from 'hooks/useAlertAskJoin';

const LogOutBtn = () => {
  const { anonymous } = useAlertAskJoin('see');

  const navigate = useNavigate();

  const onLogOutClick = () => {
    if (anonymous) return window.alert('익명의 방문자입니다!');

    const checkLogOut = window.confirm('정말 로그아웃 하시겠어요?');

    if (checkLogOut === true) {
      authService.signOut();
      navigate('/');
    } else {
      return;
    }
  };

  return <Btn onClick={onLogOutClick}>로그아웃</Btn>;
};

const Btn = styled.button`
  border: none;
  background-color: transparent;
`;

export default LogOutBtn;
