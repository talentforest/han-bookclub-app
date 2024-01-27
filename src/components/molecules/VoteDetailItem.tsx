import { IVoteItem } from 'data/voteAtom';
import VoteDetailItemPercent from './VoteDetailItemPercent';
import device from 'theme/mediaQueries';
import styled from 'styled-components';

interface Props {
  selected: boolean;
  voteItem: IVoteItem;
  voteItems: IVoteItem[];
  disabled?: boolean;
  onClick?: () => void;
}

export default function VoteDetailItem({
  onClick,
  selected,
  voteItem,
  voteItems,
  disabled,
}: Props) {
  return (
    <li>
      <VoteItemBtn
        $disabled={disabled}
        $selected={selected}
        onClick={onClick}
        disabled={disabled}
      >
        <ItemText>{voteItem.item}</ItemText>
        <VoteDetailItemPercent voteItems={voteItems} voteItemId={voteItem.id} />
      </VoteItemBtn>
    </li>
  );
}

const VoteItemBtn = styled.button<{ $selected: boolean; $disabled: boolean }>`
  cursor: pointer;
  white-space: pre-line;
  word-break: break-all;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  border: ${({ $selected, theme }) =>
    $selected
      ? `2px solid ${theme.container.blue1}`
      : `1px solid ${theme.text.gray1}`};
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: ${({ theme }) => theme.container.default};
  font-size: 16px;
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
  text-align: start;
  @media ${device.tablet} {
    width: 85%;
    font-size: 18px;
  }
`;
