import styled from 'styled-components';
import { getPercentage } from 'util/index';

interface Props {
  currentPage: number;
  wholePage: number;
}

export default function PageWithPercent({ currentPage, wholePage }: Props) {
  const percentNum = getPercentage(currentPage, wholePage);

  return (
    <Page>
      {currentPage}p / {wholePage}p ({percentNum.toFixed(0)}%)
    </Page>
  );
}

const Page = styled.div`
  color: ${({ theme }) => theme.text.gray3};
  font-size: 13px;
`;
