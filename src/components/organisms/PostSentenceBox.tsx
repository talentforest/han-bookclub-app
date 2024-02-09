import { ISentence } from 'data/bookAtom';
import { SENTENCES2024 } from 'constants/index';
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import BookThumbnail from 'components/atoms/BookThumbnail';
import UserName from 'components/atoms/UserName';
import styled from 'styled-components';
import EditorContent from 'components/atoms/EditorContent';
import LikeBtnInfoBox from '../molecules/LikeBtnInfoBox';
import PostHandleBtns from 'components/molecules/PostHandleBtns';

interface Props {
  sentence: ISentence;
}

export default function PostSentenceBox({ sentence }: Props) {
  const currentUser = useRecoilValue(currentUserState);

  const { text, thumbnail, title, creatorId, page } = sentence;

  return (
    <SentenceItem>
      <Content>
        <BookThumbnail thumbnail={thumbnail} title={title} />
        <BoxHeader>
          <h4>{title}</h4>
          {creatorId === currentUser.uid && (
            <PostHandleBtns
              collName={SENTENCES2024}
              postType='공유하고 싶은 문구'
              post={sentence}
            />
          )}
        </BoxHeader>

        <BiSolidQuoteLeft className='quote-left' />
        <EditorContent text={text} />
        <BiSolidQuoteRight className='quote-right' />
      </Content>

      <Page>p.{page}</Page>

      <BoxFooter>
        <UserName creatorId={creatorId} fontSize={14} />
        <LikeBtnInfoBox post={sentence} collName={SENTENCES2024} />
      </BoxFooter>
    </SentenceItem>
  );
}

const SentenceItem = styled.li`
  display: flex;
  flex-direction: column;
  margin: 20px 0 30px;
  padding-left: 10px;
  border-left: 6px solid ${({ theme }) => theme.container.gray};
`;

const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const Content = styled.div`
  margin: 5px 0;
  img {
    float: left;
    height: 75px;
    margin: 0 12px 5px 0;
  }
  h4 {
    margin-right: 4px;
    font-size: 14px;
    color: ${({ theme }) => theme.text.gray3};
  }
  .quote-left {
    margin-right: 6px;
    fill: ${({ theme }) => theme.text.gray2};
  }
  p {
    display: inline;
    min-height: 0;
    font-size: 16px;
    padding: 5px 0;
    margin-top: 3px;
    line-height: 1.6;
  }
  .quote-right {
    margin-left: 6px;
    fill: ${({ theme }) => theme.text.gray2};
  }
`;

const Page = styled.span`
  line-height: 1.2;
  font-size: 14px;
  margin-top: 10px;
  color: ${({ theme }) => theme.text.gray3};
  align-self: flex-end;
  margin-right: 5px;
`;

const BoxFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;
