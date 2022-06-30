import { Link } from "react-router-dom";
import { ButtonHeader, Container } from "theme/commonStyle";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { AccountCircle, Settings } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getBookMeetingInfoData } from "util/getFirebaseDoc";
import styled from "styled-components";
import Subtitle from "components/common/Subtitle";
import useWindowSize from "hooks/useWindowSize";
import device, { deviceSizes } from "theme/mediaQueries";
import MyRecommendBook from "components/profile/MyRecommendBook";
import MyRecord from "components/profile/MyRecord";

export interface IRecord {
  title: string;
  subjects: DocumentType[];
  reviews: DocumentType[];
}

const Profile = () => {
  const [docData, setDocData] = useState([]);
  const { windowSize } = useWindowSize();
  const userData = useRecoilValue(currentUserState);

  useEffect(() => {
    getBookMeetingInfoData(setDocData);

    return () => {
      getBookMeetingInfoData(setDocData);
    };
  }, []);

  return (
    <>
      {windowSize.width < +deviceSizes.tablet ? (
        <ButtonHeader>
          <h1>나의 책장</h1>
          <Link to="/setting">
            <Settings />
          </Link>
        </ButtonHeader>
      ) : (
        <></>
      )}
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
          <Wrapper>
            {docData.map((item) => (
              <MyRecord key={item.id} item={item} />
            ))}
          </Wrapper>
        </section>
        <section>
          <Subtitle title="내가 추천한 책" />
          <span>내가 추천한 책을 볼 수 있어요.</span>
          {docData.map((item) => (
            <MyRecommendBook key={item.id} item={item} />
          ))}
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
    margin-top: 50px;
    > span {
      font-size: 13px;
      padding-left: 15px;
      margin-bottom: 10px;
    }
  }
  @media ${device.tablet} {
    section {
      > span {
        font-size: 16px;
      }
    }
  }
`;

const User = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 240px;
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
    text-align: center;
  }
  @media ${device.tablet} {
    width: 270px;
    > img {
      width: 160px;
      height: 160px;
    }
    > svg {
      width: 180px;
      height: 180px;
    }
    > span {
      font-size: 17px;
      padding-top: 20px;
    }
    > a {
      > svg {
        position: absolute;
        right: 30px;
      }
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
`;

export default Profile;
