import { useRecoilValue } from 'recoil';
import { allUsersState } from 'data/userAtom';
import RecommendedBookBoxById from '../molecules/book-box/RecommendedBookBoxById';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface MonthData {
  monthId: string;
}

export default function RecommendedBooksByIdScrollBox() {
  const usersData = useRecoilValue(allUsersState);

  function compareYearMonth(a: MonthData, b: MonthData): number {
    return a.monthId.localeCompare(b.monthId);
  }

  const recommendedBookIds = usersData
    .map((item) => item?.userRecords?.recommendedBooks)
    .filter((item) => !!item?.length)
    .flat()
    .sort(compareYearMonth);

  return (
    <ScrollContainer>
      <RecommendedBookByIdList $length={recommendedBookIds.length}>
        {recommendedBookIds.map((docIds) => (
          <RecommendedBookBoxById key={docIds.docId} docIds={docIds} />
        ))}
      </RecommendedBookByIdList>
    </ScrollContainer>
  );
}

const ScrollContainer = styled.div`
  padding-bottom: 5px;
  overflow: scroll;
  scroll-behavior: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RecommendedBookByIdList = styled.ul<{ $length: number }>`
  position: relative;
  display: flex;
  gap: 10px;
  width: ${({ $length }) => `${$length * 130}px`};
  padding: 0 5px 0 2px;
  @media ${device.tablet} {
    gap: 15px;
  }
`;