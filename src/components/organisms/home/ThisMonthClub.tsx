import { getDocument } from 'api/getFbDoc';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { THIS_YEAR_BOOKCLUB, thisYearMonthId } from 'util/index';
import { thisMonthClubState } from 'data/documentsAtom';
import ClubBookBox from 'components/atoms/box/ClubBookBox';
import HeaderBox from 'components/atoms/box/HeaderBox';
import styled from 'styled-components';

export default function ThisMonthClub() {
  const [thisMonthClub, setThisMonthClub] = useRecoilState(thisMonthClubState);

  const { book, meeting } = thisMonthClub;

  useEffect(() => {
    if (thisYearMonthId) {
      getDocument(THIS_YEAR_BOOKCLUB, thisYearMonthId, setThisMonthClub);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ClubBookBox book={book} />

      <BoxesContainer>
        <HeaderBox header='이달의 발제자' />
        <HeaderBox header='모임 시간' meeting={meeting} />
        <HeaderBox header='모임 장소' meeting={meeting} />
      </BoxesContainer>
    </>
  );
}

const BoxesContainer = styled.div`
  display: flex;
  margin-top: 12px;
  gap: 10px;
`;
