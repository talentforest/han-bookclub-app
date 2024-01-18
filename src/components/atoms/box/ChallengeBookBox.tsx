import { IBookApi } from 'data/bookAtom';
import { cutLetter } from 'util/index';
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
    <Item>
      <BookThumbnail title={title} thumbnail={thumbnail} />
      <div>
        <UserNameBox creatorId={user} fontSize={15} />

        <h1>{cutLetter(title, 30)}</h1>

        <div>
          <span>
            {authors[0]}
            {authors.length !== 1 && `(외 ${authors.length - 1}명)`}
          </span>
          {publisher && <span> ・ {publisher}</span>}
        </div>
      </div>
    </Item>
  );
}

const Item = styled.li`
  position: relative;
  border-radius: 10px;
  background-color: #fff;
  padding: 8px 12px;
  height: 110px;
  margin-top: 30px;
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  align-items: center;

  > img {
    position: absolute;
    top: -12px;
    height: 110px;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    margin-left: 86px;
    width: 100%;
    height: 100%;

    h1 {
      padding-bottom: 5px;
      display: flex;
      align-items: flex-end;
      flex: 1;
      font-size: 16px;
      line-height: 1.3;
    }

    > div {
      > span {
        font-size: 15px;
        color: #888;
      }
    }
  }
`;
