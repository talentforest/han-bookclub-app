import { cutLetter, getFbRoute, thisYearMonthId } from 'util/index';
import { recommendBookState } from 'data/bookAtom';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { thisMonthClubState } from 'data/documentsAtom';
import device from 'theme/mediaQueries';
import BookThumbnailImg from '../BookThumbnailImg';
import useAddDoc from 'hooks/handleFbDoc/useAddDoc';
import styled from 'styled-components';
import SquareBtn from '../buttons/SquareBtn';

interface Props {
  onModalClose: () => void;
}
export default function CreateRecommendBookBox({ onModalClose }: Props) {
  const [text, setText] = useState('');
  const userData = useRecoilValue(currentUserState);
  const thisMonthClub = useRecoilValue(thisMonthClubState);
  const recommendBook = useRecoilValue(recommendBookState);

  const { book } = thisMonthClub;

  const { title, thumbnail, authors, url } = recommendBook;

  const collName = getFbRoute(thisYearMonthId).RECOMMENDED_BOOKS;

  const docData = {
    text,
    createdAt: Date.now(),
    creatorId: userData.uid,
    title: book.title,
    thumbnail: book.thumbnail,
    recommendedBook: { title, thumbnail, url, authors },
  };

  const { onAddDocSubmit, onChange } = useAddDoc({
    setText,
    collName,
    docData,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === '') {
      return window.alert('추천하는 책 정보를 찾아서 넣어주세요.');
    }
    onAddDocSubmit(event);
    onModalClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Textarea
        placeholder='추천하고 싶은 이유를 작성해주세요.'
        onChange={onChange}
        value={text}
      />
      <Footer>
        {thumbnail && (
          <BookInfo>
            <BookThumbnailImg title={title} thumbnail={thumbnail} />
            <div>
              <h3>{cutLetter(title, 17)}</h3>
              {!!authors.length && (
                <span>
                  {authors[0]}
                  {authors.length !== 1 && `(외 ${authors.length - 1}명)`}
                </span>
              )}
            </div>
          </BookInfo>
        )}

        <SquareBtn name='추천하기' type='submit' />
      </Footer>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media ${device.tablet} {
    padding: 15px 20px;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  font-size: 16px;
  white-space: pre-wrap;
  word-wrap: break-word;
  resize: none;
  border: 1px solid #ccc;
  padding: 6px 8px;
  margin-bottom: 10px;
  border-radius: 10px;
  &::placeholder {
    color: #aaa;
  }
  &:focus {
    outline: none;
  }
  @media ${device.tablet} {
    height: 130px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 40px;
`;

const BookInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  flex: 1;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-size: 14px;
    }
    span {
      font-size: 14px;
      color: #888;
      line-height: 16px;
    }
  }
`;
