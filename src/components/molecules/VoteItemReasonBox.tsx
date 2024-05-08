import { IBookVoteItem } from 'data/voteAtom';
import { useState } from 'react';
import { FiChevronsDown, FiChevronsUp } from 'react-icons/fi';
import DottedDividingLine from 'components/atoms/DottedDividingLine';
import styled from 'styled-components';

interface Props {
  voteItems: IBookVoteItem[];
}

export default function VoteItemReasonBox({ voteItems }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => setIsOpen(!isOpen);

  return (
    <ReasonBox>
      <ToggleBtn onClick={toggleDetails}>
        👀 작성자의 간단한 선정 이유 보기
      </ToggleBtn>

      {isOpen && (
        <ul>
          {voteItems.map(({ selectReason, id, book }) => (
            <li key={id}>
              <span className='booktitle'>📚 {book.title}</span>
              <DottedDividingLine />

              {selectReason ? (
                <p>{selectReason}</p>
              ) : (
                <span className='emptyReason'>정보가 없습니다.</span>
              )}
            </li>
          ))}
        </ul>
      )}

      <Btn type='button' onClick={toggleDetails}>
        {isOpen ? <FiChevronsUp /> : <FiChevronsDown />}
        {isOpen ? '닫기' : '열기'}
      </Btn>
    </ReasonBox>
  );
}

const ReasonBox = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.container.gray};
  border-radius: 12px 15px;
  background-color: ${({ theme }) => theme.container.default};
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.container.lightGray};
  display: flex;
  flex-direction: column;
  > ul {
    padding: 0 12px 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    li {
      border-radius: 12px;
      border: 1px solid ${({ theme }) => theme.container.gray};
      background-color: ${({ theme }) => theme.container.default};
      padding: 3px 8px;
      display: flex;
      flex-direction: column;
      .booktitle {
        font-size: 15px;
        color: ${({ theme }) => theme.text.gray4};
        padding: 3px 0;
      }
      p {
        font-size: 15px;
        padding: 4px 0;
        white-space: pre-wrap;
        word-break: break-all;
      }
      > .emptyReason {
        font-size: 15px;
        margin-top: 4px;
        color: ${({ theme }) => theme.text.gray3};
      }
    }
  }
`;

const ToggleBtn = styled.button`
  padding: 10px 12px;
  text-align: start;
  cursor: pointer;
  color: ${({ theme }) => theme.text.blue3};
  font-size: 15px;
`;

const Btn = styled.button`
  font-size: 15px;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text.blue3};
  svg {
    font-size: 16px;
    margin-right: 3px;
    stroke: ${({ theme }) => theme.container.blue3};
  }
`;
