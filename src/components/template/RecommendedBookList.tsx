import { useRecoilState } from 'recoil';
import { getFbRoute, thisYearMonthId } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { useEffect } from 'react';
import { recommendsState } from 'data/documentsAtom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import PostRecommendedBook from 'components/atoms/post/PostRecommendedBook';
import { EmptyBox } from 'routes/BookClubHistory';

interface Props {
  yearMonthId?: string;
}

const RecommendedBookList = ({ yearMonthId = thisYearMonthId }: Props) => {
  const [recommendedBooks, setRecommendedBooks] =
    useRecoilState(recommendsState);

  const { pathname } = useLocation();

  const historyPage = pathname.includes('history');

  useEffect(() => {
    getCollection(
      getFbRoute(yearMonthId).RECOMMENDED_BOOKS,
      setRecommendedBooks
    );
  }, []);

  return (
    <RecommendedBookListBox>
      {recommendedBooks.length !== 0 ? (
        recommendedBooks?.map((recommendedBook) => (
          <PostRecommendedBook
            key={recommendedBook.id}
            recommendedBookDoc={recommendedBook}
            collName={getFbRoute(yearMonthId).RECOMMENDED_BOOKS}
          />
        ))
      ) : (
        <EmptyRecommendedBookBoxs>
          {historyPage
            ? '추천된 책이 없습니다.'
            : '첫번째로 추천하고 싶은 책을 남겨보세요.'}
        </EmptyRecommendedBookBoxs>
      )}
    </RecommendedBookListBox>
  );
};

export const RecommendedBookListBox = styled.div<{ $grid?: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  @media ${device.tablet} {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
  @media ${device.desktop} {
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
  }
`;

const EmptyRecommendedBookBoxs = styled(EmptyBox)`
  height: 180px;
  grid-column: 1 / span 3;
  @media ${device.tablet} {
    height: 220px;
    grid-column: 1 / span 4;
  }
  @media ${device.desktop} {
    grid-column: 1 / span 5;
  }
`;

export default RecommendedBookList;
