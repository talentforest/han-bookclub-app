import { IVoteCountById } from 'data/voteAtom';
import { cutLetter, getPercentage } from 'util/index';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface Props {
  voteCountsById: IVoteCountById[];
  totalVoteCount: number;
}
export default function VoteGaugeBarBox({
  voteCountsById,
  totalVoteCount,
}: Props) {
  return (
    <GaugeBarsBox>
      {voteCountsById.map(({ id, title, voteCount }) => (
        <GaugeBar key={id}>
          <span>{cutLetter(title, 30)}</span>
          <GaugeByBook
            $id={id}
            $gauge={getPercentage(voteCount, totalVoteCount)}
          />
          <span>{getPercentage(voteCount, totalVoteCount)}%</span>
        </GaugeBar>
      ))}
    </GaugeBarsBox>
  );
}

const GaugeBarsBox = styled.div`
  margin-bottom: 30px;
  @media ${device.tablet} {
    margin-bottom: 50px;
  }
`;

const GaugeBar = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 18px;
  width: 100%;
  border-radius: 30px;
  margin-bottom: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.container.default};
  > span {
    padding: 0 10px;
    font-size: 11px;
    z-index: 1;
  }
`;

const GaugeByBook = styled.div<{ $gauge: number; $id: number }>`
  position: absolute;
  height: 100%;
  width: ${({ $gauge }) => `${$gauge}%`};
  border-radius: 30px;
  min-width: 20px;
  background-color: ${({ theme, $id }) =>
    $id === 1
      ? theme.container.purple2
      : $id === 2
      ? theme.container.yellow2
      : $id === 3
      ? theme.container.blue2
      : theme.container.pink};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3px;
  padding: 0 8px;
`;
