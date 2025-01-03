import { FiChevronRight, FiLink } from 'react-icons/fi';
import { thisMonth } from 'util/index';
import { ISearchedBook } from 'data/bookAtom';
import Tag from '../atoms/Tag';
import styled from 'styled-components';
import BookThumbnail from '../atoms/book/BookThumbnail';
import BookAuthorPublisher from 'components/atoms/book/BookAuthorPublisher';
import { useNavigate } from 'react-router-dom';

interface Props {
  book: ISearchedBook;
}

export default function BookClubThisMonthBox({ book }: Props) {
  const { title, thumbnail, authors, publisher, url } = book;

  const navigate = useNavigate();

  return (
    <Box>
      <div>
        <Tag>
          <span>{+thisMonth}월의 모임</span>
        </Tag>

        {title === '' ? (
          <>
            <NoInfoText>아직 등록된 책이 없어요.</NoInfoText>
            <RegisterClubBookBtn>
              <button onClick={() => navigate('/search')}>
                책 등록하러 가기
              </button>
              <FiChevronRight fontSize={16} color='#aaa' />
            </RegisterClubBookBtn>
          </>
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
    </Box>
  );
}

const Box = styled.div`
  padding: 15px 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  min-height: 120px;
  grid-column: span 2;
  > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    height: 100%;
    flex: 1;
  }
`;

const BookTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  margin-top: 10px;
  padding-left: 4px;
  > h1 {
    line-height: 1.3;
    font-size: 18px;
    margin-top: 5px;
  }
  > div {
    display: flex;
    margin: 4px 0 6px;
    flex: 1;
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
  margin-top: 4px;
  font-size: 18px;
`;

const RegisterClubBookBtn = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  > button {
    color: #888;
  }
`;
