import { getDocument } from 'api/getFbDoc';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { thisYearMonthId } from 'util/index';
import { thisMonthBookClubState } from 'data/bookClubAtom';
import { THIS_YEAR_BOOKCLUB } from 'constants/fbRouteName';
import ClubBookBox from 'components/molecules/book-box/ClubBookBox';
import HeaderBox from 'components/atoms/HeaderBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

export default function ThisMonthClub() {
  const [thisMonthClub, setThisMonthClub] = useRecoilState(
    thisMonthBookClubState
  );

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
  margin: 6px 0 12px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media ${device.desktop} {
    grid-template-columns: repeat(6, 1fr);
  }
`;
