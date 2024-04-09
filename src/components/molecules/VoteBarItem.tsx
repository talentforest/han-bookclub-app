import { FiCheckCircle } from 'react-icons/fi';
import { IBookVoteItem, IVoteCountById } from 'data/voteAtom';
import { getPercentage } from 'util/index';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface Props {
  selected: boolean;
  voteCountsById: IVoteCountById[];
  voteItem: IBookVoteItem;
  totalVoteCount: number;
}

export default function VoteBarItem({
  selected,
  voteCountsById,
  totalVoteCount,
  voteItem,
}: Props) {
  const {
    id: voteItemId,
    book: { title },
  } = voteItem;

  const currentVoteItem = voteCountsById.find(({ id }) => id === voteItemId);

  const gauge = `${getPercentage(currentVoteItem.voteCount, totalVoteCount)}%`;

  return (
    <BarItem key={voteItemId} $selected={!!selected}>
      <FiCheckCircle fontSize={14} />
      <ItemText>{title}</ItemText>
      <GaugeBox $gauge={gauge}>{gauge}</GaugeBox>
    </BarItem>
  );
}

const BarItem = styled.li<{ $selected: boolean }>`
  cursor: pointer;
  white-space: pre-line;
  word-break: break-all;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  border: ${({ $selected, theme }) =>
    $selected
      ? `2px solid ${theme.container.blue3}`
      : `2px solid ${theme.text.gray1}`};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: ${({ theme }) => theme.container.default};
  svg {
    z-index: 2;
    stroke: ${({ theme }) => theme.text.blue2};
  }
  @media ${device.tablet} {
    padding: 10px 15px;
    margin-top: 15px;
    min-height: 50px;
  }
`;

const ItemText = styled.span`
  z-index: 1;
  width: 75%;
  line-height: 1.5;
  margin-left: 8px;
  @media ${device.tablet} {
    width: 85%;
    font-size: 18px;
  }
`;

const GaugeBox = styled.div<{ $gauge: string }>`
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
