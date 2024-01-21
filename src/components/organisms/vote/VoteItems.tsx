import { LabeledBox } from 'components/atoms/inputs/BoxLabeledInput';
import Input from 'components/atoms/inputs/Input';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface IVoteProps {
  vote: {
    title: string;
    voteItem: {
      id: number;
      item: string;
      voteCount: number;
      selectReason: string;
    }[];
  };
  onTitleChange: (
    event:
      | React.FormEvent<HTMLInputElement>
      | React.FormEvent<HTMLTextAreaElement>,
    id?: number
  ) => void;
  onItemDeleteClick: (id: number) => void;
  openTextArea: boolean;
}

const VoteItems = ({
  vote,
  onTitleChange,
  onItemDeleteClick,
  openTextArea,
}: IVoteProps) => {
  return (
    <ul>
      {vote.voteItem?.map((item) => (
        <VoteItem key={item.id}>
          <LabeledVoteItem>
            <div className='label'>{item.id}번</div>
            <Input
              name={`vote_item${item.id}`}
              type='text'
              placeholder='투표항목을 적어주세요.'
              value={item.item}
              onChange={(event) => onTitleChange(event, item.id)}
              required
            />
          </LabeledVoteItem>

          {openTextArea && (
            <Textarea
              placeholder='선정 이유에 대한 작성은 선택사항입니다.'
              value={item.selectReason}
              name={`selectReason${item.id}`}
              onChange={(event) => onTitleChange(event, item.id)}
            />
          )}
        </VoteItem>
      ))}
    </ul>
  );
};

const VoteItem = styled.li`
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
  }
`;

const LabeledVoteItem = styled(LabeledBox)`
  width: 100%;
  margin-bottom: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;
  div.label {
    width: 50px;
    border: 1px solid ${({ theme }) => theme.text.gray1};
  }
  > input {
    box-shadow: none;
    width: 100%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    font-size: 16px;
  }
`;

const Textarea = styled.textarea`
  font-size: 16px;
  width: 100%;
  height: 120px;
  margin-bottom: 15px;
  padding: 8px;
  border-radius: 10px;
  border: none;
  border: 1px solid ${({ theme }) => theme.text.gray1};
  box-shadow: 2px 2px 2px 2px rgba(200, 200, 200, 0.2);
  resize: none;
  &::placeholder {
    color: #aaa;
  }
  &:focus {
    outline: none;
  }
`;

export default VoteItems;
