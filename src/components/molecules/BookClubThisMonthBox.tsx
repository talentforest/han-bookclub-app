import { FiChevronRight, FiLink } from 'react-icons/fi';
import { getLocaleDate, thisMonth } from 'util/index';
import { ISearchedBook } from 'data/bookAtom';
import Tag from '../atoms/Tag';
import styled from 'styled-components';
import BookThumbnail from '../atoms/BookThumbnail';
import BookAuthorPublisher from 'components/atoms/BookAuthorPublisher';

interface Props {
  book: ISearchedBook;
}

export default function BookClubThisMonthBox({ book }: Props) {
  const month = getLocaleDate(thisMonth, { month: 'numeric' });

  const { title, thumbnail, authors, publisher, url } = book;

  return (
    <Box>
      <div>
        <Tag>
          <span>{month}월의 모임</span>
        </Tag>

        {title === '' ? (
          <NoInfoText>아직 등록된 책이 없어요.</NoInfoText>
        ) : (
          <BookTextInfo>
            <h1>{title}</h1>
            <BookAuthorPublisher authors={authors} publisher={publisher} />

            <a href={url} target='_blank' rel='noreferrer'>
              <FiLink fontSize={12} stroke='#888' />
              <span>상세정보 보러가기</span>
            </a>
          </BookTextInfo>
        )}
      </div>

      <BookThumbnail title={title} thumbnail={thumbnail} />

      {title === '' && (
        <RegisterClubBookBtn>
          <button>책 등록하러 가기</button>
          <FiChevronRight fontSize={16} color='#aaa' />
        </RegisterClubBookBtn>
      )}
    </Box>
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
  height: 140px;
  grid-column: span 2;
  > div {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
  }
`;

const BookTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 5px;
  flex: 1;
  padding-left: 4px;
  > h1 {
    font-size: 20px;
  }
  > div {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    span {
      font-size: 15px;
      color: #666;
      line-height: 1.5;
    }
  }
  > a {
    display: flex;
    align-items: center;
    span {
      line-height: 1;
      color: #aaa;
      font-size: 14px;
    }
  }
`;

const NoInfoText = styled.span`
  font-size: 18px;
`;

const RegisterClubBookBtn = styled.div`
  display: flex;
  align-items: center;
  place-self: end;
  padding-top: 10px;
  > button {
    color: #888;
  }
`;
