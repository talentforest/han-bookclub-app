import { useState } from 'react';
import { recommendBookState } from 'data/bookAtom';
import { Link } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';
import { getFbRoute, cutLetter } from 'util/index';
import { thisMonthState } from 'data/documentsAtom';
import useAddDoc from 'hooks/handleFbDoc/useAddDoc';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import PostBtn from 'components/atoms/buttons/PostBtn';

const RecommendCreateBox = () => {
  const [text, setText] = useState('');
  const thisMonthDoc = useRecoilValue(thisMonthState);
  const {
    id,
    book: { title, thumbnail },
  } = thisMonthDoc;
  const myRecommendBook = useRecoilValue(recommendBookState);
  const userData = useRecoilValue(currentUserState);
  const collectionName = getFbRoute(id).RECOMMEND;
  const docData = {
    text,
    createdAt: Date.now(),
    creatorId: userData.uid,
    title,
    thumbnail,
    recommendBookTitle: myRecommendBook?.title,
    recommendBookThumbnail: myRecommendBook?.thumbnail,
    recommendBookUrl: myRecommendBook?.url,
    recommendBookAuthor: myRecommendBook?.authors,
  };

  const { onAddDocSubmit, onChange } = useAddDoc({
    text,
    setText,
    collectionName,
    docData,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (myRecommendBook?.title === '') {
      window.alert('추천책 정보를 찾아서 넣어주세요.');
      return;
    }
    onAddDocSubmit(event);
  };

  return (
    <>
      <LinkBtn to='/search'>
        추천책 정보 찾으러 가기
        <Search />
      </LinkBtn>
      <Form onSubmit={handleSubmit}>
        <Textarea
          placeholder='이달의 책과 관련해 추천하고 싶은 책을 작성해주세요. 위에서 추천책 정보를 찾으실 수 있습니다.'
          onChange={onChange}
          value={text}
        />
        {myRecommendBook?.thumbnail ? (
          <Footer>
            <BookInfo smSize>
              <img src={myRecommendBook.thumbnail} alt='recommend book' />
              <div>
                <h5>{cutLetter(myRecommendBook.title, 12)}</h5>
                {myRecommendBook.url && (
                  <a
                    href={myRecommendBook.url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    상세정보 보러가기
                  </a>
                )}
              </div>
            </BookInfo>
            <PostBtn value='추천하기' />
          </Footer>
        ) : (
          <PostBtn value='추천하기' />
        )}
      </Form>
    </>
  );
};

const Form = styled.form`
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.container.default};
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
  @media ${device.tablet} {
    padding: 15px 20px;
  }
`;
const LinkBtn = styled(Link)`
  width: 100%;
  padding: 8px 14px;
  background-color: #fff;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.text.gray};
  svg {
    width: 24px;
    height: 24px;
    fill: ${(props) => props.theme.text.gray};
  }
`;
const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  font-size: 16px;
  white-space: pre-wrap;
  word-wrap: break-word;
  resize: none;
  border: none;
  margin-bottom: 10px;
  &:focus {
    outline: none;
  }
  @media ${device.tablet} {
    height: 130px;
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 5px;
`;
const BookInfo = styled.div<{ smSize: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  > img {
    width: auto;
    height: ${(props) => (props.smSize ? '40px' : '70px')};
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
  }
  > div {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    > a {
      color: ${(props) => props.theme.text.accent};
    }
  }
`;

export default RecommendCreateBox;
