import { getNextMonthId, thisYear } from 'util/index';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { bookClubByYearState } from 'data/bookClubAtom';
import { getCollection } from 'api/getFbDoc';
import BookThumbnail from 'components/atoms/book/BookThumbnail';
import Tag from 'components/atoms/Tag';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import BookAuthorPublisher from 'components/atoms/book/BookAuthorPublisher';

export default function BookClubNextMonthBox() {
  const [thisYearBookClubInfos, setThisYearBookClubInfos] =
    useRecoilState(bookClubByYearState);

  const existNextBookClubDoc = thisYearBookClubInfos.find(
    (bookclub) => bookclub.id === getNextMonthId()
  );

  useEffect(() => {
    if (!existNextBookClubDoc) {
      getCollection(`BookClub-${thisYear}`, setThisYearBookClubInfos);
    }
  }, [existNextBookClubDoc]);

  const { book } = existNextBookClubDoc || {};

  return (
    existNextBookClubDoc?.book && (
      <Box>
        <BookThumbnail title={book.title} thumbnail={book.thumbnail} />

        <div>
          <Tag color='purple'>
            <span>다음 모임책</span>
          </Tag>

          <BookTextInfo>
            <h1>{book.title}</h1>
            <BookAuthorPublisher
              authors={book.authors}
              publisher={book.publisher}
            />
          </BookTextInfo>
        </div>
      </Box>
    )
  );
}

const Box = styled.div`
  padding: 12px 15px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 105px;
  grid-column: span 2;
  > div {
    flex: 1;
    height: 100%;
    gap: 5px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-direction: column;
  }
  @media ${device.desktop} {
    grid-column: span 2;
  }
`;

const BookTextInfo = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin: 0 4px 0 10px;
  > div {
    margin-top: 2px;
    display: flex;
  }
`;
