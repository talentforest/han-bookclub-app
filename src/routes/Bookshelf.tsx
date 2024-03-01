import { useRecoilState, useRecoilValue } from 'recoil';
import { IUserDataDoc, allUsersState, currentUserState } from 'data/userAtom';
import { useEffect } from 'react';
import { Section } from './Home';
import { useLocation } from 'react-router-dom';
import { USER_DATA } from 'constants/index';
import { getCollection } from 'api/getFbDoc';
import { PostType } from 'components/molecules/PostHandleBtns';
import { EmptyBox } from './BookClubHistory';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import Loading from 'components/atoms/Loading';
import Subtitle from 'components/atoms/Subtitle';
import Tag from 'components/atoms/Tag';
import MobileHeader from 'layout/mobile/MobileHeader';
import GuideLine from 'components/atoms/GuideLine';
import AbsenceMonthTable from 'components/organisms/AbsenceMonthTable';
import UserImgName from 'components/molecules/UserImgName';
import BookshelfPostList from 'components/organisms/BookshelfPostList';

const Bookshelf = () => {
  const [allUserDocs, setAllUserDocs] = useRecoilState(allUsersState);
  const currentUser = useRecoilValue(currentUserState);

  const { state } = useLocation();
  const userId = state ? state.userId : currentUser;
  const userData = allUserDocs.find((user) => user.id === userId);

  useEffect(() => {
    if (allUserDocs.length === 0) {
      getCollection(USER_DATA, setAllUserDocs);
    }
  }, []);

  const {
    id,
    photoURL,
    displayName,
    favoriteBookField,
    userRecords, //
  } = (userData as IUserDataDoc) || {};

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
          <UserImgName photoURL={photoURL} displayName={displayName} />
        </Section>

        <Section>
          <Subtitle title={`${userName}의 독서 모임 불참 정보`} />
          <AbsenceMonthTable userId={userId} />
        </Section>

        <Section>
          <Subtitle title={`${userName}의 독서 분야 취향`} />
          <FavBookFieldList>
            {favoriteBookField && favoriteBookField?.length !== 0 ? (
              favoriteBookField.map((field) => (
                <Tag key={field.id} color='purple'>
                  <span>{field.name}</span>
                </Tag>
              ))
            ) : (
              <Loading height='12vh' />
            )}
          </FavBookFieldList>
        </Section>

        {(['정리 기록', '발제문', '모임 후기'] as PostType[]).map(
          (postType) => (
            <Section key={postType}>
              <Subtitle title={`${userName}의 ${postType}`} />
              <GuideLine text='2022년 6월 이후의 기록이 제공됩니다.' />
              <BookshelfPostList
                userRecords={userRecords}
                postType={postType}
              />
            </Section>
          )
        )}
      </main>
    </>
  );
};

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
