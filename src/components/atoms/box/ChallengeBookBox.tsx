import { IBookApi } from 'data/bookAtom';
import BookThumbnail from '../BookThumbnailImg';
import UserNameBox from 'components/organisms/UserNameBox';
import styled from 'styled-components';

interface Challenge {
  user: string;
  book: IBookApi;
}

interface Props {
  challenge: Challenge;
}

export default function ChallengeBookBox({ challenge }: Props) {
  const {
    user,
    book: { title, thumbnail, authors, publisher },
  } = challenge;

  return (
    <Box>
      <BookThumbnail title={title} thumbnail={thumbnail} />
      <div>
        <UserNameBox creatorId={user} fontSize={15} />
        <h1>{title}</h1>
        <div>
          <span>
            {authors[0]}
            {authors.length !== 1 && `(외 ${authors.length - 1}명)`}
          </span>
          <span> ・ {publisher}</span>
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
