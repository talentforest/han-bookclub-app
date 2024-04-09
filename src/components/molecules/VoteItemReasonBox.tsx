import DottedDividingLine from 'components/atoms/DottedDividingLine';
import { IBookVoteItem } from 'data/voteAtom';
import { useState } from 'react';
import { FiChevronsUp } from 'react-icons/fi';
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
        <>
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

          <CloseBtn type='button' onClick={toggleDetails}>
            <FiChevronsUp />
            닫기
          </CloseBtn>
        </>
      )}
    </ReasonBox>
  );
}

const ReasonBox = styled.div`
  border: 1px solid ${({ theme }) => theme.container.gray};
  border-radius: 12px 15px;
  background-color: ${({ theme }) => theme.container.default};
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.container.lightGray};
  display: flex;
  flex-direction: column;
  > ul {
    padding: 0 12px 10px;
    margin-bottom: 3px;
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
        font-size: 14px;
        color: ${({ theme }) => theme.text.gray4};
        padding: 3px 0;
      }
      p {
        font-size: 14px;
        padding: 4px 0;
        white-space: pre-wrap;
        word-break: break-all;
      }
      > .emptyReason {
        font-size: 14px;
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
  font-size: 15px;
  color: ${({ theme }) => theme.container.blue3};
`;

const CloseBtn = styled.button`
  border-radius: 8px;
  align-self: flex-end;
  padding: 5px 8px;
  margin: 0 12px 5px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text.gray3};
  svg {
    font-size: 16px;
    margin-right: 3px;
    stroke: ${({ theme }) => theme.text.gray3};
  }
`;
