import { CheckCircleOutline, Close } from '@mui/icons-material';
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
}

const VoteItems = ({ vote, onTitleChange, onItemDeleteClick }: IVoteProps) => {
  return (
    <List>
      {vote.voteItem?.map((item) => (
        <VoteItem key={item.id}>
          <CheckCircleOutline />
          <InputBox>
            <Input
              type='text'
              placeholder='투표항목을 적어주세요.'
              name={`vote_item${item.id}`}
              value={item.item}
              onChange={(event) => onTitleChange(event, item.id)}
              required
            />
            <Textarea
              placeholder='투표항목으로 선정한 이유를 작성해주세요.'
              value={item.selectReason}
              name={`selectReason${item.id}`}
              onChange={(event) => onTitleChange(event, item.id)}
            />
            {item.id > 2 && (
              <Close onClick={() => onItemDeleteClick(item.id)} />
            )}
          </InputBox>
        </VoteItem>
      ))}
    </List>
  );
};

const List = styled.ul`
  @media ${device.tablet} {
    span {
      font-size: 16px;
    }
  }
`;
const VoteItem = styled.li`
  position: relative;
  display: flex;
  gap: 3px;
  margin-bottom: 15px;
  > svg {
    margin-top: 5px;
    width: 22px;
    height: 22px;
    fill: ${(props) => props.theme.text.accent};
  }
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;
const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  svg {
    position: absolute;
    bottom: 1px;
    left: -1px;
    width: 22px;
    height: 22px;
    fill: ${(props) => props.theme.text.gray};
  }
`;
const Input = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid ${(props) => props.theme.text.lightGray};
  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.container.yellow};
  }
  @media ${device.tablet} {
    font-size: 16px;
  }
`;
const Textarea = styled.textarea`
  font-size: 16px;
  width: 100%;
  margin-top: 5px;
  padding: 10px 5px;
  border-radius: 10px;
  border: none;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  resize: none;
  &::placeholder {
    line-height: 22px;
  }
  &:focus {
    outline: none;
  }
`;

export default VoteItems;
