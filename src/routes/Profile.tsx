import { authService } from "fbase";
import { useNavigate } from "react-router-dom";
import { Container } from "theme/globalStyle";
import BackBtn from "components/BackBtn";
import Title from "components/common/Title";
import styled from "styled-components";

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  return (
    <>
      <Container>
        <Title title="나의 정보" />
      </Container>
      <BackBtn />
      <LogOutBtn onClick={onLogOutClick}>Log out</LogOutBtn>
    </>
  );
};

const LogOutBtn = styled.button`
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.blue};
`;

export default Profile;
