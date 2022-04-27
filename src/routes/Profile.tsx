import { authService } from "fbase";
import { useNavigate } from "react-router-dom";
import { Container, Header } from "theme/globalStyle";
import BackBtn from "components/BackButton";
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
      <NewHeader>
        <Title title="나의 정보" />
        <span>프로필 편집</span>
      </NewHeader>
      <Container>
        <BackBtn />
        <LogOutBtn onClick={onLogOutClick}>Log Out</LogOutBtn>
      </Container>
    </>
  );
};

const NewHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 12px;
    font-weight: 500;
  }
`;

const LogOutBtn = styled.button`
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.blue};
`;

export default Profile;
