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
          <div>
            <CheckCircleOutline />
            <Input
              type='text'
              placeholder='투표항목을 적어주세요.'
              name={`vote_item${item.id}`}
              value={item.item}
              onChange={(event) => onTitleChange(event, item.id)}
              required
            />
            {item.id > 2 && (
              <Close onClick={() => onItemDeleteClick(item.id)} />
            )}
          </div>
          <textarea
            placeholder='투표항목으로 선정한 이유를 작성해주세요.'
            value={item.selectReason}
            name={`selectReason${item.id}`}
            onChange={(event) => onTitleChange(event, item.id)}
          />
        </VoteItem>
      ))}
    </List>
  );
};

const List = styled.div`
  @media ${device.tablet} {
    span {
      font-size: 16px;
    }
  }
`;

const VoteItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
  > div {
    display: flex;
    width: 100%;
    align-items: center;
    svg {
      margin-right: 5px;
      width: 18px;
      height: 18px;
      fill: ${(props) => props.theme.text.accent};
      &:last-child {
        position: absolute;
        right: 0;
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
    }
    input {
      width: 100%;
      height: 30px;
      font-size: 16px;
    }
  }
  > textarea {
    font-size: 16px;
    width: 100%;
    margin-top: 5px;
    padding: 10px 5px;
    border-radius: 5px;
    border: none;
    border: 1px solid ${(props) => props.theme.text.lightGray};
    resize: none;
    &::placeholder {
      line-height: 22px;
    }
    &:focus {
      outline: none;
    }
  }
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    div {
    }
    svg {
      width: 18px;
      height: 18px;
    }
    input {
      height: 45px;
    }
  }
`;

const Input = styled.input`
  font-size: 16px;
  width: 100%;
  height: 30px;
  padding-left: 3px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
  background-color: transparent;
  &:focus {
    outline: none;
    border-bottom: 2px solid ${(props) => props.theme.container.yellow};
  }
  @media ${device.tablet} {
    font-size: 16px;
    height: 50px;
  }
`;

export default VoteItems;
