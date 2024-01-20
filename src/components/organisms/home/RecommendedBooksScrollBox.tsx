import { useRecoilValue } from 'recoil';
import { allUsersState } from 'data/userAtom';
import RecommendedBookBox from '../../atoms/box/RecommendedBookBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface MonthData {
  monthId: string;
}

export default function RecommendedBooksScrollBox() {
  const usersData = useRecoilValue(allUsersState);

  function compareYearMonth(a: MonthData, b: MonthData): number {
    return a.monthId.localeCompare(b.monthId);
  }

  const recommendedBookIds = usersData
    .map((item) => item?.userRecords?.recommendedBooks)
    .filter((item) => !!item?.length)
    .flat()
    .slice(0, 8)
    .sort(compareYearMonth);

  return (
    <ScrollContainerBox>
      <RecommendedBookList $length={recommendedBookIds.length}>
        {recommendedBookIds.map((docIds) => (
          <RecommendedBookBox key={docIds.docId} docIds={docIds} />
        ))}
      </RecommendedBookList>
    </ScrollContainerBox>
  );
}

const ScrollContainerBox = styled.div`
  padding-bottom: 5px;
  overflow: scroll;
  scroll-behavior: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RecommendedBookList = styled.ul<{ $length: number }>`
  position: relative;
  display: flex;
  gap: 10px;
  width: ${({ $length }) => `${$length * 130}px`};
  padding: 25px 5px 0 2px;
  @media ${device.tablet} {
    gap: 15px;
  }
`;
