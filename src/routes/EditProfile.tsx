import { Container } from "theme/globalStyle";
import { Header } from "./Setting";
import { currentUserState } from "data/atom";
import { useRecoilValue } from "recoil";
import BackButton from "components/common/BackButton";
import Subtitle from "components/common/Subtitle";
import styled from "styled-components";
import ProfileImage from "components/common/ProfileImage";

const EditProfile = () => {
  const currentUserData = useRecoilValue(currentUserState);

  return (
    <>
      <NewHeader>
        <div>
          <BackButton />
          <Subtitle title="프로필 정보" />
        </div>
        <button>수정</button>
      </NewHeader>
      <NewContainer>
        <ProfileImage />
        <UserInfo>
          <li>
            <span>닉네임</span>
            <span>천호동불주먹</span>
          </li>
          <li>
            <span>이름</span>
            <span>전예림</span>
          </li>
          <li>
            <span>이메일</span>
            <span>{currentUserData?.email}</span>
          </li>
        </UserInfo>
      </NewContainer>
    </>
  );
};

const NewContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NewHeader = styled(Header)`
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
  }
  > button {
    border: none;
    background-color: transparent;
    color: ${(props) => props.theme.text.lightBlue};
    cursor: pointer;
  }
`;

const UserInfo = styled.ul`
  width: 90%;
  margin-top: 20px;
  > li {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    > span:first-child {
      font-weight: 700;
      font-size: 12px;
    }
  }
`;

export default EditProfile;
