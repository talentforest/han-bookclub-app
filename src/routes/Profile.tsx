import { Link } from "react-router-dom";
import { Container, Header } from "theme/commonStyle";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { AccountCircle, Settings } from "@mui/icons-material";
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
          <Settings />
        </Link>
      </NewHeader>
      <NewContainer>
        <User>
          {userData?.photoURL ? (
            <img src={userData.photoURL} alt="profile" />
          ) : (
            <AccountCircle />
          )}
          <span>{userData.displayName}</span>
        </User>
        <section>
          <Subtitle title="나의 기록" />
          <span>내가 작성한 발제문과 모임 후기를 볼 수 있어요.</span>
          <MyRecords />
        </section>
      </NewContainer>
    </>
  );
};

const NewContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 30px;
    > span {
      font-size: 13px;
      padding-left: 15px;
      margin-bottom: 10px;
    }
  }
`;

const User = styled.div`
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
    width: 120px;
    height: 120px;
  }
  > span {
    font-size: 15px;
    font-weight: 700;
    padding-top: 10px;
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
