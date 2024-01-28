import { getNextMonthId, thisYear } from 'util/index';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { bookClubByYearState } from 'data/bookClubAtom';
import { getCollection } from 'api/getFbDoc';
import BookThumbnailImg from 'components/atoms/BookThumbnailImg';
import Tag from 'components/atoms/Tag';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import BookAuthorPublisher from 'components/atoms/BookAuthorPublisher';

export default function NextMonthClubBookBox() {
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
        <BookThumbnailImg title={book.title} thumbnail={book.thumbnail} />

        <div>
          <Tag name='다음 모임책' color='purple' />

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
  grid-column: 1 / span 3;
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
    grid-column: 1 / span 3;
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
