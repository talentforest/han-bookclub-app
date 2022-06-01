import { Link } from "react-router-dom";
import { Container, Header } from "theme/commonStyle";
import { ReactComponent as SettingIcon } from "assets/settings.svg";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { AccountCircle } from "@mui/icons-material";
import Title from "components/common/Title";
import styled from "styled-components";
import Subtitle from "components/common/Subtitle";
import MyRecords from "components/profile/MyRecords";

const Profile = () => {
  const userData = useRecoilValue(currentUserState);

  return (
    <>
      <NewHeader>
        <Title title="나의 책장" />
        <Link to="/setting">
          <SettingIcon />
        </Link>
      </NewHeader>
      <NewContainer>
        <div>
          {userData?.photoURL ? (
            <img src={userData.photoURL} alt="profileimg" />
          ) : (
            <AccountCircle />
          )}
          <span>{userData.displayName}</span>
        </div>
        <div>
          <Subtitle title="나의 기록" />
          <MyRecords />
        </div>
      </NewContainer>
    </>
  );
};

const NewContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  > div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 140px;
    margin-top: 10px;
    > img {
      object-fit: cover;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: ${(props) => props.theme.container.green};
    }
    > svg {
      width: 100px;
      height: 100px;
    }
    > span {
      font-size: 15px;
      font-weight: 700;
      padding-top: 10px;
    }
  }
  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

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
