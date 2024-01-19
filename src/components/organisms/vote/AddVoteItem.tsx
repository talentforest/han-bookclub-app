import { FiInfo, FiPlus } from 'react-icons/fi';
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
        <GuideBox>
          <FiInfo stroke='#e3463b' fontSize={13} />
          <span> 투표항목은 6개를 넘을 수 없습니다.</span>
        </GuideBox>
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
  margin: 10px 0;
  padding: 8px 12px 4px;
  border-radius: 20px;
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

const GuideBox = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: 3px;
  > span {
    padding-top: 2px;
    line-height: 0;
    font-size: 13px;
    color: ${({ theme }) => theme.text.red};
  }

  @media ${device.tablet} {
    display: block;
    margin-bottom: 6px;
    font-size: 16px;
    font-weight: 700;
  }
`;

export default AddVoteItem;
