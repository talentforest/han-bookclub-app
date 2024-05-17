import { useRecoilState } from 'recoil';
import { getFbRoute, thisYearMonthId } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { useEffect } from 'react';
import { recommendsState } from 'data/documentsAtom';
import { useLocation } from 'react-router-dom';
import { EmptyBox } from 'routes/BookClubHistory';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import PostRecommendedBookBox from 'components/organisms/PostRecommendedBookBox';
import PostFooter from 'components/molecules/PostFooter';

interface Props {
  yearMonthId?: string;
}

const RecommendedBookScrollList = ({
  yearMonthId = thisYearMonthId,
}: Props) => {
  const [recommendedBooks, setRecommendedBooks] =
    useRecoilState(recommendsState);

  const { pathname } = useLocation();

  const editable = !pathname.includes('history');

  useEffect(() => {
    getCollection(
      getFbRoute(yearMonthId).RECOMMENDED_BOOKS,
      setRecommendedBooks
    );
  }, []);

  return (
    <ScrollContainer $length={recommendedBooks.length}>
      {recommendedBooks.length !== 0 ? (
        <RecommendedBookList $length={recommendedBooks.length}>
          {recommendedBooks?.map((recommendedBook) => (
            <PostRecommendedBookBox
              key={recommendedBook.id}
              recommendedBookDoc={recommendedBook}
              collName={getFbRoute(yearMonthId).RECOMMENDED_BOOKS}
            >
              <PostFooter
                collName={getFbRoute(yearMonthId).RECOMMENDED_BOOKS}
                footerType='likes'
                post={recommendedBook}
                createdAt={recommendedBook.createdAt}
              />
            </PostRecommendedBookBox>
          ))}
        </RecommendedBookList>
      ) : (
        <EmptyRecommendedBookBox>
          {!editable
            ? '추천된 책이 없습니다.'
            : '첫번째로 추천하고 싶은 책을 남겨보세요.'}
        </EmptyRecommendedBookBox>
      )}
    </ScrollContainer>
  );
};

const ScrollContainer = styled.div<{ $length: number }>`
  padding-bottom: 5px;
  overflow: ${({ $length }) => ($length === 0 ? 'none' : 'scroll')};
  scroll-behavior: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RecommendedBookList = styled.ul<{ $length: number }>`
  position: relative;
  display: flex;
  gap: 10px;
  width: ${({ $length }) => `${$length * 130}px`};
  padding: 0 5px 0 2px;
  @media ${device.tablet} {
    gap: 15px;
  }
`;

const EmptyRecommendedBookBox = styled(EmptyBox)`
  height: 180px;
  @media ${device.tablet} {
    height: 220px;
  }
`;

export default RecommendedBookScrollList;
