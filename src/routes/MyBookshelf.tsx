import { useRecoilValue } from 'recoil';
import { currentUserState, userExtraInfoState } from 'data/userAtom';
import { AccountCircle } from '@mui/icons-material';
import { authService } from 'fbase';
import { IDocument } from 'data/documentsAtom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { USER_DATA } from 'util/index';
import { ImgBox, ProfileImg } from 'components/atoms/ProfileImage';
import { getDocument } from 'api/getFbDoc';
import Subtitle from 'components/atoms/Subtitle';
import MyRecommendBook from 'components/organisms/mybookshelf/MyRecommendBook';
import MyRecord from 'components/organisms/mybookshelf/MyRecord';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import Loading from 'components/atoms/Loading';

export interface IRecord {
  title: string;
  subjects: IDocument[];
  reviews: IDocument[];
}

const MyBookshelf = () => {
  const userData = useRecoilValue(currentUserState);
  const [userExtraData, setUserExtraData] = useRecoilState(userExtraInfoState);
  const anonymous = authService.currentUser?.isAnonymous;
  const existUserExtraData = Object.keys(userExtraData).length;

  useEffect(() => {
    if (userData.uid && !existUserExtraData) {
      getDocument(USER_DATA, userData.uid, setUserExtraData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.uid]);

  return userExtraData?.userRecords ? (
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
        <Subtitle title='나의 발제문' />
        <span>내가 작성한 발제문을 볼 수 있어요.</span>
        <RecordList>
          {userExtraData.userRecords.subjects.length ? (
            userExtraData.userRecords?.subjects.map((subjectId) => (
              <MyRecord key={subjectId.docId} recordId={subjectId} />
            ))
          ) : (
            <EmptyBox>아직 작성한 발제문이 없어요.</EmptyBox>
          )}
        </RecordList>
      </Section>
      <Section>
        <Subtitle title='나의 모임 후기' />
        <span>내가 작성한 모임 후기를 볼 수 있어요.</span>
        <RecordList>
          {userExtraData.userRecords.reviews.length ? (
            userExtraData.userRecords.reviews.map((reviewId) => (
              <MyRecord key={reviewId.docId} recordId={reviewId} review />
            ))
          ) : (
            <EmptyBox>아직 작성한 발제문이 없어요.</EmptyBox>
          )}
        </RecordList>
      </Section>
      <Section>
        <Subtitle title='내가 추천한 책' />
        <span>내가 추천한 책을 볼 수 있어요.</span>
        <RecordList>
          {userExtraData.userRecords.recommendedBooks.length ? (
            userExtraData.userRecords.recommendedBooks?.map(
              (recommendedBookId) => (
                <MyRecommendBook
                  key={recommendedBookId.docId}
                  recommendedBookId={recommendedBookId}
                />
              )
            )
          ) : (
            <EmptyBox>아직 작성한 발제문이 없어요.</EmptyBox>
          )}
        </RecordList>
      </Section>
    </main>
  ) : (
    <Loading full />
  );
};

const EmptyBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  text-align: center;
  color: ${(props) => props.theme.text.lightBlue};
  background-color: ${(props) => props.theme.container.default};
  width: 100%;
  height: 120px;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
`;
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
  @media ${device.tablet} {
    grid-template-columns: repeat(5, 1fr);
  }
  @media ${device.desktop} {
    grid-template-columns: repeat(6, 1fr);
  }
`;

export default MyBookshelf;
