import { EmptyBox } from 'routes/BookClubHistory';
import { FiSearch } from 'react-icons/fi';
import { IBookVoteItem } from 'data/voteAtom';
import { cutLetter } from 'util/index';
import BookThumbnail from './BookThumbnail';
import styled from 'styled-components';

interface Props {
  voteItem: IBookVoteItem;
  toggleSearch: (itemId: number) => void;
}

export default function BookVoteItem({ voteItem, toggleSearch }: Props) {
  const {
    id,
    book: { title, thumbnail },
  } = voteItem;

  const onClick = () => toggleSearch(id);

  return (
    <VoteItem>
      <BookBtn type='button' onClick={onClick}>
        {title === '' ? (
          <EmptyBox className='empty-box'>
            <FiSearch fontSize={25} />
            <span>책 등록하기</span>
          </EmptyBox>
        ) : (
          <BookThumbnail thumbnail={thumbnail} title={title} />
        )}
      </BookBtn>

      {title !== '' && <BookTitle>{cutLetter(title, 20)}</BookTitle>}
    </VoteItem>
  );
}

const VoteItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 40%;
  border: 1px solid ${({ theme }) => theme.container.gray};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 15px;
  padding: 14px 8px;
  .empty-box {
    aspect-ratio: 0.7 / 1;
    height: 110px;
    background-color: ${({ theme }) => theme.container.lightGray};
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    span {
      margin-top: 8px;
      font-size: 13px;
      color: ${({ theme }) => theme.text.gray2};
    }
  }
`;

const BookBtn = styled.button`
  height: 110px;
  svg {
    stroke: ${({ theme }) => theme.container.purple2};
  }
`;

const BookTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  line-height: 1.4;
  color: ${({ theme }) => theme.text.gray3};
  margin-bottom: -3px;
`;
