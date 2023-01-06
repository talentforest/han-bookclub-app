import { IVoteItem } from 'data/voteItemAtom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import { percentage } from 'util/index';

interface PropsType {
  voteItems: IVoteItem[];
  item: IVoteItem;
  totalVoteCount: number;
}

const Percentage = ({ voteItems, item, totalVoteCount }: PropsType) => {
  const existVoteCount: number = voteItems[item.id - 1].voteCount;

  return (
    <Container
      $gauge={
        existVoteCount && `${percentage(existVoteCount, totalVoteCount)}%`
      }
    >
      {existVoteCount !== 0 && `${percentage(existVoteCount, totalVoteCount)}%`}
    </Container>
  );
};

const Container = styled.div<{ $gauge: string }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  color: ${(props) => props.theme.text.accent};
  font-size: 13px;
  top: 0;
  right: 0;
  width: ${(props) => (props.$gauge ? props.$gauge : '10px')};
  height: 100%;
  border-radius: 3px;
  background-color: ${(props) => props.theme.container.lightBlue};
  @media ${device.tablet} {
    font-size: 16px;
  }
`;

export default Percentage;
