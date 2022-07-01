import { useNavigate } from "react-router-dom";
import { authService } from "fbase";
import styled from "styled-components";
import device from "theme/mediaQueries";

const LogOutButton = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    const checkLogOut = window.confirm("정말 로그아웃 하시겠어요?");
    if (checkLogOut === true) {
      authService.signOut();
      navigate("/");
    } else {
      return;
    }
  };
  return <LogOutBtn onClick={onLogOutClick}>로그아웃</LogOutBtn>;
};

const LogOutBtn = styled.button`
  font-size: 14px;
  border: none;
  background-color: transparent;
  @media ${device.tablet} {
    font-size: 18px;
  }
`;

export default LogOutButton;
