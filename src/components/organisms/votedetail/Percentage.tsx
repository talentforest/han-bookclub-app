import { IVoteItem } from 'data/voteItemAtom';
import { percentage } from 'util/index';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface PropsType {
  voteItems: IVoteItem[];
  voteItemId: number;
}

const Percentage = ({ voteItems, voteItemId }: PropsType) => {
  // 총 투표수
  const totalVoteCount = voteItems
    ?.map((item) => item.voteCount)
    .reduce((prev, curr) => prev + curr);

  const existVoteCount = () => {
    if (voteItems) {
      return voteItems[voteItemId - 1].voteCount;
    }
  };

  return (
    <Container
      $gauge={
        existVoteCount() && `${percentage(existVoteCount(), totalVoteCount)}%`
      }
    >
      {existVoteCount() !== 0 &&
        `${percentage(existVoteCount(), totalVoteCount)}%`}
    </Container>
  );
};

const Container = styled.div<{ $gauge: string }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  color: ${({ theme }) => theme.text.blue3};
  font-size: 14px;
  top: 0;
  right: 0;
  width: ${({ $gauge }) => ($gauge ? $gauge : '10px')};
  height: 100%;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.container.blue1};
  @media ${device.tablet} {
    font-size: 16px;
  }
`;

export default Percentage;
