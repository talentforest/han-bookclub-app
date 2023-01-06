import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { AccountCircle } from '@mui/icons-material';
import { authService } from 'fbase';
import { clubDocsState, IBasicDoc } from 'data/documentsAtom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { CLUB_INFO } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { ImgBox, ProfileImg } from 'components/atoms/ProfileImage';
import Subtitle from 'components/atoms/Subtitle';
import MyRecommendBook from 'components/organisms/mybookshelf/MyRecommendBook';
import MyRecord from 'components/organisms/mybookshelf/MyRecord';
import device from 'theme/mediaQueries';
import styled from 'styled-components';

export interface IRecord {
  title: string;
  subjects: IBasicDoc[];
  reviews: IBasicDoc[];
}

const MyBookshelf = () => {
  const [bookMeetings, setBookMeetings] = useRecoilState(clubDocsState);
  const userData = useRecoilValue(currentUserState);
  const anonymous = authService.currentUser?.isAnonymous;

  useEffect(() => {
    getCollection(CLUB_INFO, setBookMeetings);
  }, [setBookMeetings]);

  return (
    <main>
      <ProfileBox>
        {userData?.photoURL ? (
          <ProfileImg src={userData.photoURL} alt='profile' />
        ) : (
          <AccountCircle />
        )}
        <span>{anonymous ? '익명의 방문자' : userData?.displayName}</span>
      </ProfileBox>
      <Section>
        <Subtitle title='나의 기록' />
        <span>내가 작성한 발제문과 모임 후기를 볼 수 있어요.</span>
        <RecordList>
          {bookMeetings.map((bookMeeting) => (
            <MyRecord key={bookMeeting.id} bookMeeting={bookMeeting} />
          ))}
        </RecordList>
      </Section>
      <Section>
        <Subtitle title='내가 추천한 책' />
        <span>내가 추천한 책을 볼 수 있어요.</span>
        <RecordList>
          {bookMeetings.map((bookMeeting) => (
            <MyRecommendBook key={bookMeeting.id} bookMeeting={bookMeeting} />
          ))}
        </RecordList>
      </Section>
    </main>
  );
};

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px 0 50px;
  > span {
    font-size: 13px;
    margin-bottom: 10px;
  }

  @media ${device.tablet} {
    > span {
      font-size: 16px;
    }
  }
`;
const ProfileBox = styled(ImgBox)`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  span {
    margin-top: 15px;
    font-weight: 700;
  }
`;
const RecordList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  gap: 10px;
`;

export default MyBookshelf;
