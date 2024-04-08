import { cutLetter } from 'util/index';
import { Link } from 'react-router-dom';
import { IBookVote } from 'data/voteAtom';
import { LabeledBox } from 'components/atoms/input/BoxLabeledInput';
import { FiChevronRight, FiMoreHorizontal } from 'react-icons/fi';
import { MdOutlineHowToVote } from 'react-icons/md';
import DDay from 'components/atoms/DDay';
import device from 'theme/mediaQueries';
import styled from 'styled-components';

interface PropsType {
  voteDetail: IBookVote;
}

const VoteProgressBox = ({ voteDetail }: PropsType) => {
  const { id, title, voteItems, deadline, voteId } = voteDetail;

  return (
    <VoteBox>
      <Title>
        <MdOutlineHowToVote fill='#316cff' fontSize={20} />
        {cutLetter(title, 40)}
      </Title>

      <ItemList>
        {voteItems?.slice(0, 2).map(({ id, book }) => (
          <LabelVoteBox key={id}>
            <div className='label'>{`${id}번`}</div>
            <div className='info'>{cutLetter(book.title, 16)}</div>
          </LabelVoteBox>
        ))}
        {voteItems.length > 2 && <FiMoreHorizontal />}
      </ItemList>

      <Bottom>
        <DDay hyphenDate={deadline} isDateMark={false} />
        <Link to={`/vote/${voteId}`} state={{ voteDocId: id }}>
          <span>투표하러 가기</span>
          <FiChevronRight fontSize={16} />
        </Link>
      </Bottom>
    </VoteBox>
  );
};

const VoteBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 210px;
  width: 100%;
  border-radius: 15px;
  padding: 12px 15px;
  background-color: ${({ theme }) => theme.container.default};
  box-shadow: ${({ theme }) => theme.boxShadow};
  @media ${device.tablet} {
    min-height: 240px;
  }
`;

const Title = styled.h4`
  font-size: 16px;
  margin-bottom: 5px;
  svg {
    float: left;
    margin-right: 4px;
    padding-top: 3px;
  }
`;

const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  margin-bottom: 10px;
`;

const LabelVoteBox = styled(LabeledBox)`
  height: 35px;
  width: 100%;
  margin-bottom: 8px;
  div.label {
    min-width: 0;
    width: 50px;
    font-size: 15px;
    background-color: ${({ theme }) => theme.container.yellow2};
    color: ${({ theme }) => theme.text.blue1};
  }
  div.info {
    height: 100%;
    width: 100%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    align-items: center;
    padding-left: 8px;
    padding-top: 3px;
    font-size: 15px;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  > p {
    color: ${({ theme }) => theme.text.gray2};
  }
  > a {
    display: flex;
    align-items: center;
    svg {
      line-height: 0;
      stroke: ${({ theme }) => theme.text.gray2};
    }
    span {
      color: ${({ theme }) => theme.text.gray2};
    }
  }
  @media ${device.tablet} {
    > p {
      font-size: 14px;
    }
    > a {
      font-size: 14px;
    }
  }
`;

export default VoteProgressBox;
