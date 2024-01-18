import { getDocument } from 'api/getFbDoc';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { THIS_YEAR_BOOKCLUB, thisYearMonthId } from 'util/index';
import { thisMonthClubState } from 'data/documentsAtom';
import ClubBookBox from 'components/atoms/box/ClubBookBox';
import HeaderBox from 'components/atoms/box/HeaderBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

export default function ThisMonthClub() {
  const [thisMonthClub, setThisMonthClub] = useRecoilState(thisMonthClubState);

  const { book, meeting } = thisMonthClub;

  useEffect(() => {
    if (thisYearMonthId) {
      getDocument(THIS_YEAR_BOOKCLUB, thisYearMonthId, setThisMonthClub);
    }
  }, []);

  return (
    <BoxesContainer>
      {book && <ClubBookBox book={book} />}

      {meeting && <HeaderBox header='모임 시간' meeting={meeting} />}
      {meeting && <HeaderBox header='모임 장소' meeting={meeting} />}
      <HeaderBox header='이달의 발제자' />
    </BoxesContainer>
  );
}

const BoxesContainer = styled.div`
  margin: 12px 0;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media ${device.desktop} {
    grid-template-columns: repeat(6, 1fr);
  }
`;
