import { IUserPostDocs } from 'data/userAtom';
import { EmptyBox } from 'routes/BookClubHistory';
import { PostType } from 'components/molecules/PostHandleBtns';
import BookThumbnailPostBox from 'components/organisms/PostBookThumbnailBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface Props {
  userRecords: IUserPostDocs;
  postType: PostType;
}

export default function BookshelfPostList({ userRecords, postType }: Props) {
  const userSubjects = userRecords?.subjects || [];
  const userHostReviews = userRecords?.hostReviews || [];
  const userReviews = userRecords?.reviews || [];

  const postIds =
    postType === '발제문'
      ? userSubjects
      : postType === '모임 후기'
      ? userReviews
      : postType === '정리 기록'
      ? userHostReviews
      : [];

  return (
    <PostList>
      {postIds.length !== 0 ? (
        postIds.map((postId) => (
          <BookThumbnailPostBox
            key={postId.docId}
            postId={postId}
            postType={postType}
          />
        ))
      ) : (
        <EmptyBookShelfBox>아직 작성한 {postType}가 없어요.</EmptyBookShelfBox>
      )}
    </PostList>
  );
}

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
