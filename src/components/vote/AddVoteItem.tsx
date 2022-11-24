import { Add, Info } from '@mui/icons-material';
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
  onItemPlusClick: () => void;
}

const AddVoteItem = ({ vote, onItemPlusClick }: IVoteProps) => {
  return (
    <>
      <AddItem onClick={onItemPlusClick}>
        <Add />
        투표항목 추가하기
      </AddItem>
      {vote.voteItem?.length > 5 && (
        <PlusItem>
          <Info />
          투표항목은 6개를 넘을 수 없습니다.
        </PlusItem>
      )}
    </>
  );
};

const AddItem = styled.div`
  cursor: pointer;
  width: fit-content;
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 20px;
  color: ${(props) => props.theme.text.accent};
  border: 1px solid ${(props) => props.theme.container.blue};
  padding: 2px 10px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.container.lightBlue};
  svg {
    width: 18px;
    height: 18px;
    fill: ${(props) => props.theme.text.accent};
  }
  @media ${device.tablet} {
    font-size: 16px;
    svg {
      width: 20px;
      height: 20px;
      fill: ${(props) => props.theme.text.accent};
    }
  }
`;

const PlusItem = styled.div`
  font-size: 14px;
  margin: 5px 0;
  svg {
    float: left;
    margin: 2px 3px 0 0;
    width: 16px;
    height: 16px;
  }
  @media ${device.tablet} {
    display: block;
    margin-bottom: 6px;
    font-size: 16px;
    font-weight: 700;
  }
`;

export default AddVoteItem;
