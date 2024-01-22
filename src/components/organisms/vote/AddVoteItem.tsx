import GuideBox from 'components/atoms/GuideBox';
import { FiPlus } from 'react-icons/fi';
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
      {vote.voteItem?.length > 5 && (
        <GuideBox text='투표항목은 6개를 넘을 수 없습니다.' color='red' />
      )}

      <AddVoteItemBtn onClick={onItemPlusClick}>
        <FiPlus fontSize={18} stroke='#3d64ff' />
        <span>투표 항목 추가</span>
      </AddVoteItemBtn>
    </>
  );
};

const AddVoteItemBtn = styled.button`
  cursor: pointer;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-top: 5px;
  padding: 6px 10px 3px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.container.yellow1};
  gap: 3px;
  span {
    color: ${({ theme }) => theme.text.blue3};
    padding-right: 2px;
  }
  svg {
    padding-bottom: 3px;
  }

  @media ${device.tablet} {
    font-size: 16px;
    svg {
      width: 20px;
      height: 20px;
      fill: ${({ theme }) => theme.text.blue3};
    }
  }
`;

export default AddVoteItem;
