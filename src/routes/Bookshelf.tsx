import { useRecoilState, useRecoilValue } from 'recoil';
import { IUserDataDoc, allUsersState, currentUserState } from 'data/userAtom';
import { MouseEvent, useEffect } from 'react';
import { Section } from './Home';
import { useLocation } from 'react-router-dom';
import { USER_DATA } from 'constants/index';
import { getCollection } from 'api/getFbDoc';
import { CircleImg, ImgBox } from 'components/atoms/UserImg';
import { FiUser } from 'react-icons/fi';
import { EmptyBox } from './BookClubHistory';
import BookThumbnailPostBox from 'components/organisms/PostBookThumbnailBox';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import Loading from 'components/atoms/Loading';
import Subtitle from 'components/atoms/Subtitle';
import Tag from 'components/atoms/Tag';
import MobileHeader from 'layout/mobile/MobileHeader';
import GuideLine from 'components/atoms/GuideLine';

const Bookshelf = () => {
  const currentUser = useRecoilValue(currentUserState);
  const [allUserDocs, setAllUserDocs] = useRecoilState(allUsersState);

  useEffect(() => {
    if (allUserDocs.length === 0) {
      getCollection(USER_DATA, setAllUserDocs);
    }
  }, []);

  const { state } = useLocation();
  const userId = state ? state.userId : currentUser;

  const user = allUserDocs.find((user) => user.id === userId);

  const onContextMenu = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const { id, photoURL, displayName, favoriteBookField, userRecords } =
    (user as IUserDataDoc) || {};

  const userFavBookField = favoriteBookField || [];
  const userSubjects = userRecords?.subjects || [];
  const userHostReviews = userRecords?.hostReviews || [];
  const userReviews = userRecords?.reviews || [];

  const isCurrentUser = currentUser.uid === id;
  const userName = isCurrentUser ? '나' : displayName;

  return (
    <>
      <MobileHeader
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
                <Tag key={field.id} color='purple'>
                  <span>{field.name}</span>
                </Tag>
              ))
            ) : (
              <Loading height='12vh' />
            )}
          </FavBookFieldList>
        </Section>

        <Section>
          <Subtitle title={`${userName}의 정리 기록`} />

          <PostList>
            {userHostReviews.length !== 0 ? (
              userHostReviews.map((hostReview) => (
                <BookThumbnailPostBox
                  key={hostReview.docId}
                  postId={hostReview}
                  postType='정리 기록'
                />
              ))
            ) : (
              <EmptyBookShelfBox>
                아직 작성한 발제자의 정리 기록이 없어요
              </EmptyBookShelfBox>
            )}
          </PostList>
        </Section>

        <Section>
          <Subtitle title={`${userName}의 발제문`} />
          <GuideLine text='2022년 6월 이후의 기록이 제공됩니다.' />

          <PostList>
            {userSubjects.length !== 0 ? (
              userSubjects.map((subjectId) => (
                <BookThumbnailPostBox
                  key={subjectId.docId}
                  postId={subjectId}
                  postType='발제문'
                />
              ))
            ) : (
              <EmptyBookShelfBox>
                아직 작성한 발제문이 없어요.
              </EmptyBookShelfBox>
            )}
          </PostList>
        </Section>

        <Section>
          <Subtitle title={`${userName}의 모임 후기`} />
          <GuideLine text='2022년 6월 이후의 기록이 제공됩니다.' />

          <PostList>
            {userReviews.length !== 0 ? (
              userReviews.map((reviewId) => (
                <BookThumbnailPostBox
                  key={reviewId.docId}
                  postId={reviewId}
                  postType='모임 후기'
                />
              ))
            ) : (
              <EmptyBookShelfBox>
                아직 작성한 모임 후기가 없어요.
              </EmptyBookShelfBox>
            )}
          </PostList>
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

export const PostList = styled.ul`
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

export const EmptyBookShelfBox = styled(EmptyBox)`
  grid-column: 1 / span 4;
  @media ${device.tablet} {
    height: 200px;
    grid-column: 1 / span 6;
  }
  @media ${device.desktop} {
    grid-column: 1 / span 7;
  }
`;

export default Bookshelf;
