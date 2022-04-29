import { Link } from "react-router-dom";
import { Container, Header } from "theme/globalStyle";
import { ReactComponent as SettingIcon } from "assets/settings.svg";
import Title from "components/common/Title";
import styled from "styled-components";
import ProfileImage from "components/common/ProfileImage";

const Profile = () => {
  return (
    <>
      <NewHeader>
        <Title title="나의 책장" />
        <Link to="/setting">
          <SettingIcon />
        </Link>
      </NewHeader>
      <Container>
        <ProfileImage />
      </Container>
    </>
  );
};

const NewHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > a {
    display: flex;
    align-items: center;
    svg {
      margin-top: 2px;
      width: 20px;
      height: 20px;
    }
  }
`;

export default Profile;
