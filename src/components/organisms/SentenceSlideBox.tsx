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
  const { text, createdAt, thumbnail, title, creatorId } = sentence;

  return (
    <SentenceBox>
      <BoxHeader>
        <BookInfo>
          <BookThumbnail thumbnail={thumbnail} title={title} />
          <span>{title}</span>
        </BookInfo>
      </BoxHeader>

      <Content>
        <BiSolidQuoteLeft className='quote-left' />
        <EditorContent text={cutLetter(text, 260)} />
        <BiSolidQuoteRight className='quote-right' />
      </Content>

      <BoxFooter>
        <UserName creatorId={creatorId} fontSize={14} />
        <div>
          <SubmitedDate>
            {formatKRMarkDate(createdAt, 'YYYY년 MM월 DD일')}
          </SubmitedDate>
          <LikeBtnInfoBox post={sentence} collName={SENTENCES2024} />
        </div>
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
`;

const BookInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 20px;
  img {
    border-radius: 2px;
  }
  span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.2;
    margin-top: 4px;
    color: ${({ theme }) => theme.text.gray3};
  }
`;

const Content = styled.div`
  margin: 18px 0 10px;
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

const SubmitedDate = styled.span`
  color: ${({ theme }) => theme.text.gray3};
  font-size: 13px;
  align-self: flex-end;
  margin-right: 3px;
`;

const BoxFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  a {
    align-self: flex-end;
    margin-right: 5px;
  }
  > div {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
