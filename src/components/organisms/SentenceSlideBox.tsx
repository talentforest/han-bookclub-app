import { cutLetter, formatKRMarkDate } from 'util/index';
import { ISentence } from 'data/bookAtom';
import { SENTENCES2024 } from 'constants/index';
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi';
import BookThumbnail from 'components/atoms/BookThumbnail';
import UserName from 'components/atoms/UserName';
import styled from 'styled-components';
import EditorContent from 'components/atoms/EditorContent';
import LikeBtnInfoBox from '../molecules/LikeBtnInfoBox';

interface Props {
  sentence: ISentence;
}

export default function SentenceSlideBox({ sentence }: Props) {
  const { text, createdAt, thumbnail, title, creatorId, page } = sentence;

  return (
    <SentenceBox>
      <BoxHeader>
        <BookInfo>
          <BookThumbnail thumbnail={thumbnail} title={title} />
          <span className='title'>{title}</span>
        </BookInfo>

        <UserName creatorId={creatorId} fontSize={14} />
      </BoxHeader>

      <Content>
        <BiSolidQuoteLeft className='quote-left' />
        <EditorContent text={cutLetter(text, 260)} />
        <BiSolidQuoteRight className='quote-right' />
      </Content>

      <Page>p.{page}</Page>

      <BoxFooter>
        <SubmitedDate>
          {formatKRMarkDate(createdAt, 'YYYY년 MM월 DD일')}
        </SubmitedDate>

        <LikeBtnInfoBox post={sentence} collName={SENTENCES2024} />
      </BoxFooter>
    </SentenceBox>
  );
}

const SentenceBox = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.container.default};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 10px 12px;
  min-height: 160px;
  width: 100%;
`;

const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

const SubmitedDate = styled.span`
  color: ${({ theme }) => theme.text.gray3};
  font-size: 13px;
  align-self: flex-end;
  margin-right: 3px;
  margin-top: 2px;
`;

const Content = styled.div`
  margin: 18px 0 10px;
  flex: 1;
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

const BoxFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  gap: 8px;
`;

const Page = styled.span`
  line-height: 1.2;
  font-size: 14px;
  margin-top: 10px;
  color: ${({ theme }) => theme.text.gray3};
  align-self: flex-end;
  margin-right: 5px;
`;

const BookInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 16px;
  padding: 0 3px;
  flex: 1;
  img {
    border-radius: 2px;
  }
  .title {
    line-height: 1.2;
    font-size: 15px;
    color: ${({ theme }) => theme.text.gray3};
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
