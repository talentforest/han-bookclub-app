import styled from 'styled-components';
import BookThumbnail from '../BookThumbnailImg';
import UsernameBox from 'components/organisms/UsernameBox';
import { IBookApi } from 'data/bookAtom';

interface Challenge {
  user: string;
  book: IBookApi;
}

interface Props {
  challenge: Challenge;
}

export default function ChallengeBookBox({ challenge }: Props) {
  const { user, book } = challenge;

  return (
    <Box>
      <BookThumbnail title={book.title} thumbnail={book.thumbnail} />
      <div>
        <UsernameBox creatorId={user} fontSize={15} />
        <h1>{book.title}</h1>
        <div>
          <span>{book.authors.join('・')} ・ </span>
          <span>{book.publisher}</span>
        </div>
      </div>
    </Box>
  );
}

const Box = styled.div`
  position: relative;
  border-radius: 10px;
  background-color: #fff;
  padding: 12px;
  height: 95px;
  margin-top: 30px;
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  align-items: center;

  > img {
    position: absolute;
    top: -15px;
    height: 100px;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-left: 88px;
    h1 {
      font-size: 17px;
      margin-top: 12px;
      margin-bottom: 6px;
    }
    > div {
      > span {
        font-size: 15px;
        color: #888;
      }
    }
  }
`;
