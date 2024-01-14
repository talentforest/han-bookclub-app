import styled from 'styled-components';
import RecommendedBookBox from './box/RecommendedBookBox';
import { useRecoilValue } from 'recoil';
import { allUsersState } from 'data/userAtom';

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
      <RecommendedBookList>
        {recommendedBookIds.map((docIds) => (
          <RecommendedBookBox key={docIds.docId} docIds={docIds} />
        ))}
      </RecommendedBookList>
    </ScrollContainerBox>
  );
}

const ScrollContainerBox = styled.div`
  margin-top: 15px;
  padding-bottom: 5px;
  overflow: scroll;
  scroll-behavior: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RecommendedBookList = styled.ul`
  position: relative;
  display: flex;
  gap: 18px;
  width: 1015px;
  padding-top: 30px;
`;
