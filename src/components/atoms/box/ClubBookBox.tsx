import { FiChevronRight, FiLink } from 'react-icons/fi';
import { thisMonth } from 'util/index';
import { IBookApi } from 'data/bookAtom';
import Tag from '../Tag';
import styled from 'styled-components';
import BookThumbnailImg from '../BookThumbnailImg';
import device from 'theme/mediaQueries';

interface Props {
  book: IBookApi;
}

export default function ClubBookBox({ book }: Props) {
  return (
    <Box>
      <div>
        <Tag name={`${thisMonth}월의 모임`} />

        {book.title === '' ? (
          <NoInfoText>아직 등록된 책이 없어요.</NoInfoText>
        ) : (
          <BookTextInfo>
            <h1>{book.title}</h1>

            <div>
              <span>{book.authors} ・ </span>
              <span> {book.publisher}</span>
            </div>

            <div>
              <FiLink fontSize={10} stroke='#888' />
              <a href={book.url} target='_blank' rel='noreferrer'>
                상세정보 보러가기
              </a>
            </div>
          </BookTextInfo>
        )}
      </div>

      <BookThumbnailImg title={book.title} thumbnail={book.thumbnail} />

      {book.title === '' && (
        <RegisterClubBookBtn>
          <button>책 등록하러 가기</button>
          <FiChevronRight fontSize={15} color='red' />
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
  grid-column: 1 / span 3;
  > div {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  @media ${device.desktop} {
    grid-column: 1 / span 3;
  }
`;

const BookTextInfo = styled.div`
  width: 100%;
  margin-top: 10px;
  padding-left: 4px;

  > h1 {
    font-size: 20px;
  }

  > div {
    display: flex;
    align-items: center;

    > span {
      font-size: 15px;
      color: #666;
      line-height: 24px;
    }

    > a {
      margin: 3px 0 0 3px;
      color: #aaa;
      font-size: 13px;
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
