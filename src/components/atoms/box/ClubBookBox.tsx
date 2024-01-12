import { FiChevronRight, FiLink } from 'react-icons/fi';
import { thisMonth } from 'util/index';
import { IBookApi } from 'data/bookAtom';
import Tag from '../Tag';
import styled from 'styled-components';
import BookThumbnailImg from '../BookThumbnailImg';

interface Props {
  book: IBookApi;
}

export default function ClubBookBox({ book }: Props) {
  return (
    <Box>
      <div>
        <Tag name={`${thisMonth}월의 모임책`} />

        {book.title === '' ? (
          <NoInfoText>아직 등록된 책이 없어요.</NoInfoText>
        ) : (
          <BookTextInfo>
            <h1>{book.title}</h1>

            <div>
              <h3>{book.authors} 지음・</h3>
              <h3>{book.publisher} 출판</h3>
            </div>

            <div>
              <FiLink fontSize={11} />
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
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`;

const BookTextInfo = styled.div`
  width: 100%;
  margin-top: 16px;
  padding-left: 4px;

  > h1 {
    font-size: 20px;
  }

  > div {
    margin-top: 4px;
    display: flex;
    align-items: center;

    > h3 {
      font-size: 15px;
      color: #888;
      line-height: 24px;
      margin-bottom: 4px;
    }

    > a {
      margin: 3px 0 0 3px;
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
