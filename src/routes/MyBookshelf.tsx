import { useRecoilValue } from 'recoil';
import { currentUserState, userExtraInfoState } from 'data/userAtom';
import { AccountCircle } from '@mui/icons-material';
import { authService } from 'fbase';
import { IDocument } from 'data/documentsAtom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { USER_DATA, existDocObj } from 'util/index';
import { ImgBox, ProfileImg } from 'components/atoms/ProfileImage';
import { getDocument } from 'api/getFbDoc';
import { category } from 'data/categoryAtom';
import MyRecommendBook from 'components/organisms/mybookshelf/MyRecommendBook';
import MyRecord from 'components/organisms/mybookshelf/MyRecord';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import Loading from 'components/atoms/Loading';
import CategoryBtns from 'components/organisms/CategoryBtns';
import Subtitle from 'components/atoms/Subtitle';
import Guide from 'components/atoms/Guide';

export interface IRecord {
  title: string;
  subjects: IDocument[];
  reviews: IDocument[];
}

const MyBookshelf = () => {
  const [category, setCategory] = useState('subjects' as category);
  const [userExtraData, setUserExtraData] = useRecoilState(userExtraInfoState);
  const userData = useRecoilValue(currentUserState);
  const anonymous = authService.currentUser?.isAnonymous;

  const mySubjects = userExtraData.userRecords?.subjects;
  const myReviews = userExtraData.userRecords?.reviews;
  const myRecommendedBooks = userExtraData.userRecords?.recommendedBooks;
  const myHostReviews = userExtraData.userRecords?.hostReviews;

  useEffect(() => {
    if (userData.uid && !existDocObj(userExtraData)) {
      getDocument(USER_DATA, userData.uid, setUserExtraData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserExtraData, userData.uid]);

  const onCategoryClick = (category: category) => setCategory(category);

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
        <Subtitle title='나의 발제자 모임 정리 기록' />
        {anonymous && <EmptyBox>익명의 방문자입니다!</EmptyBox>}
        {!anonymous &&
          (existDocObj(userExtraData?.userRecords || {}) ? (
            <RecordList>
              {myHostReviews.length ? (
                myHostReviews.map((subjectId) => (
                  <MyRecord
                    key={subjectId.docId}
                    recordId={subjectId}
                    recordSort='hostReview'
                  />
                ))
              ) : (
                <EmptyBox>아직 작성한 발제자 모임 정리 기록이 없어요</EmptyBox>
              )}
            </RecordList>
          ) : (
            <Loading height='30vh' />
          ))}
      </Section>
      <Section>
        <Subtitle title='나의 독서모임 기록' />
        <Guide text='2022년 6월 이후의 기록이 제공됩니다.' />
        <CategoryBtns
          category={category}
          onCategoryClick={onCategoryClick}
          myRecord
        />
        {anonymous && <EmptyBox>익명의 방문자입니다!</EmptyBox>}
        {!anonymous &&
          (existDocObj(userExtraData?.userRecords || {}) ? (
            <RecordList>
              {category === 'recommends' &&
                (myRecommendedBooks.length ? (
                  myRecommendedBooks?.map((recommendedBookId) => (
                    <MyRecommendBook
                      key={recommendedBookId.docId}
                      recommendedBookId={recommendedBookId}
                    />
                  ))
                ) : (
                  <EmptyBox>아직 추천했던 책이 없어요.</EmptyBox>
                ))}
              {category === 'subjects' &&
                (mySubjects.length ? (
                  mySubjects.map((subjectId) => (
                    <MyRecord
                      key={subjectId.docId}
                      recordId={subjectId}
                      recordSort='subjects'
                    />
                  ))
                ) : (
                  <EmptyBox>아직 작성한 발제문이 없어요.</EmptyBox>
                ))}
              {category === 'reviews' &&
                (myReviews.length ? (
                  myReviews.map((reviewId) => (
                    <MyRecord
                      key={reviewId.docId}
                      recordId={reviewId}
                      recordSort='reviews'
                    />
                  ))
                ) : (
                  <EmptyBox>아직 작성한 모임 후기가 없어요.</EmptyBox>
                ))}
            </RecordList>
          ) : (
            <Loading height='30vh' />
          ))}
      </Section>
    </main>
  );
};

const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  text-align: center;
  color: ${(props) => props.theme.text.lightBlue};
  background-color: ${(props) => props.theme.container.default};
  width: 100%;
  height: 140px;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  @media ${device.tablet} {
    height: 160px;
  }
`;
const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px 0 50px;
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
  min-height: 15vh;
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
