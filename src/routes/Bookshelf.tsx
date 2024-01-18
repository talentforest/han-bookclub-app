import { useRecoilState, useRecoilValue } from 'recoil';
import { IExtraUserData, allUsersState, currentUserState } from 'data/userAtom';
import { MouseEvent, useEffect } from 'react';
import { Section } from './Home';
import { useLocation } from 'react-router-dom';
import { USER_DATA } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { CircleImg, ImgBox } from 'components/atoms/UserImg';
import BookImgRecordBox from 'components/organisms/mybookshelf/BookImgRecordBox';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import Loading from 'components/atoms/Loading';
import Subtitle from 'components/atoms/Subtitle';
import Tag from 'components/atoms/Tag';
import Header from 'layout/mobile/Header';
import Guide from 'components/atoms/Guide';
import { FiUser } from 'react-icons/fi';

const Bookshelf = () => {
  const currentUser = useRecoilValue(currentUserState);
  const [allUserDocs, setAllUserDocs] = useRecoilState(allUsersState);

  useEffect(() => {
    if (allUserDocs.length === 0) {
      getCollection(USER_DATA, setAllUserDocs);
    }
  }, []);

  const {
    state: { userId },
  } = useLocation();

  const user = allUserDocs.find((user) => user.id === userId);

  const onContextMenu = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const { id, photoURL, displayName, favoriteBookField, userRecords } =
    (user as IExtraUserData) || {};

  const userFavBookField = favoriteBookField || [];
  const userSubjects = userRecords?.subjects || [];
  const userHostReviews = userRecords?.hostReviews || [];
  const userReviews = userRecords?.reviews || [];

  const isCurrentUser = currentUser.uid === id;
  const userName = isCurrentUser ? '나' : displayName;

  return (
    <>
      <Header
        title={`${userName}의 책장`}
        settingBtn={isCurrentUser}
        backBtn={!isCurrentUser}
      />

      <main>
        <Section>
          <UserBox>
            <ImgBox>
              {photoURL ? (
                <CircleImg
                  onContextMenu={onContextMenu}
                  src={photoURL}
                  alt={`${displayName}의 프로필 이미지`}
                />
              ) : (
                <CircleImg as='div' className='no-image'>
                  <FiUser fontSize={30} stroke='#aaa' />
                </CircleImg>
              )}
            </ImgBox>
            <span>{displayName}</span>
          </UserBox>
        </Section>

        <Section>
          <Subtitle title={`${userName}의 독서 분야 취향`} />

          <FavBookFieldList>
            {userFavBookField.length !== 0 ? (
              userFavBookField.map((field) => (
                <Tag key={field.id} name={field.name} color='purple' />
              ))
            ) : (
              <Loading height='12vh' />
            )}
          </FavBookFieldList>
        </Section>

        <Section>
          <Subtitle title={`${userName}의 정리 기록`} />

          <RecordList>
            {userHostReviews.length !== 0 ? (
              userHostReviews.map((hostReview) => (
                <BookImgRecordBox
                  key={hostReview.docId}
                  recordId={hostReview}
                  recordSort='hostReview'
                />
              ))
            ) : (
              <EmptyBox>아직 작성한 발제자의 정리 기록이 없어요</EmptyBox>
            )}
          </RecordList>
        </Section>

        <Section>
          <Subtitle title={`${userName}의 발제문`} />
          <Guide text='2022년 6월 이후의 기록이 제공됩니다.' />

          <RecordList>
            {userSubjects.length !== 0 ? (
              userSubjects.map((subjectId) => (
                <BookImgRecordBox
                  key={subjectId.docId}
                  recordId={subjectId}
                  recordSort='subjects'
                />
              ))
            ) : (
              <EmptyBox>아직 작성한 발제문이 없어요.</EmptyBox>
            )}
          </RecordList>
        </Section>

        <Section>
          <Subtitle title={`${userName}의 모임 후기`} />
          <Guide text='2022년 6월 이후의 기록이 제공됩니다.' />

          <RecordList>
            {userReviews.length !== 0 ? (
              userReviews.map((reviewId) => (
                <BookImgRecordBox
                  key={reviewId.docId}
                  recordId={reviewId}
                  recordSort='reviews'
                />
              ))
            ) : (
              <EmptyBox>아직 작성한 모임 후기가 없어요.</EmptyBox>
            )}
          </RecordList>
        </Section>
      </main>
    </>
  );
};

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FavBookFieldList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 60px;
  margin-bottom: 40px;
`;

export const RecordList = styled.ul`
  min-height: 15vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  gap: 12px 10px;
  margin-top: 10px;
  @media ${device.tablet} {
    gap: 20px 15px;
    grid-template-columns: repeat(6, 1fr);
  }
  @media ${device.desktop} {
    grid-template-columns: repeat(7, 1fr);
  }
`;

export const EmptyBox = styled.div`
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
  box-shadow: ${(props) => props.theme.boxShadow};
  grid-column: 1 / span 4;

  @media ${device.tablet} {
    height: 160px;
    font-size: 14px;
    grid-column: 1 / span 6;
  }
  @media ${device.desktop} {
    grid-column: 1 / span 7;
  }
`;

export default Bookshelf;
