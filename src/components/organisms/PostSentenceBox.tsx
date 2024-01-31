import { getLocaleDate } from 'util/index';
import { ISentence } from 'data/bookAtom';
import { SENTENCES2024 } from 'constants/index';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import BookThumbnail from 'components/atoms/BookThumbnail';
import UserName from 'components/atoms/UserName';
import PostHandleBtns from '../molecules/PostHandleBtns';
import styled from 'styled-components';
import EditorContent from 'components/atoms/EditorContent';
import LikeBtnInfoBox from '../molecules/LikeBtnInfoBox';

interface Props {
  sentence: ISentence;
}

export default function PostSentenceBox({ sentence }: Props) {
  const currentUser = useRecoilValue(currentUserState);

  const { text, createdAt, thumbnail, title, creatorId } = sentence;

  return (
    <SentenceBox>
      <BoxHeader>
        <BookInfo>
          <BookThumbnail thumbnail={thumbnail} title={title} />
          <span>{title}</span>
        </BookInfo>

        {creatorId === currentUser.uid && (
          <PostHandleBtns
            collName={SENTENCES2024}
            postType='공유하고 싶은 문구'
            post={sentence}
          />
        )}
      </BoxHeader>

      <Content>
        <EditorContent text={text} />
      </Content>

      <BoxFooter>
        <span>{getLocaleDate(createdAt)}</span>
        <div>
          <UserName creatorId={creatorId} />
          <LikeBtnInfoBox post={sentence} collName={SENTENCES2024} />
        </div>
      </BoxFooter>
    </SentenceBox>
  );
}

const SentenceBox = styled.li`
  padding: 10px 12px;
  background-color: ${({ theme }) => theme.container.default};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;
`;

const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  border-left: 4px solid ${({ theme }) => theme.container.gray};
  padding: 0 3px 0 8px;
  margin-top: 20px;
`;

const BookInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 16px;
  img {
    border-radius: 4px;
  }
  span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.2;
    margin-top: 4px;
    font-size: 14px;
    color: ${({ theme }) => theme.text.gray3};
  }
`;

const BoxFooter = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  > span {
    align-self: flex-end;
    line-height: 1;
    font-size: 13px;
    color: ${({ theme }) => theme.text.gray2};
  }
  a {
    align-self: flex-start;
    span {
      margin-top: 4px;
      font-size: 14px;
      color: ${({ theme }) => theme.text.gray2};
    }
  }
  > div {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }
`;
