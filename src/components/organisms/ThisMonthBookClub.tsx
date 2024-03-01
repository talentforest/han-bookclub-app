import { getDocument } from 'api/getFbDoc';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getMeetingTime, thisYearMonthId } from 'util/index';
import { thisMonthBookClubState } from 'data/bookClubAtom';
import { THIS_YEAR_BOOKCLUB } from 'constants/fbRouteName';
import { useLocation } from 'react-router-dom';
import BookClubThisMonthBox from 'components/molecules/BookClubThisMonthBox';
import LabelOnTopBox from 'components/molecules/LabelOnTopBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

export default function ThisMonthBookClub() {
  const [thisMonthBookClub, setThisMonthBookClub] = useRecoilState(
    thisMonthBookClubState
  );

  const { book, meeting } = thisMonthBookClub;

  useEffect(() => {
    if (thisYearMonthId) {
      getDocument(THIS_YEAR_BOOKCLUB, thisYearMonthId, setThisMonthBookClub);
    }
  }, []);

  const { pathname } = useLocation();

  return (
    <BoxesContainer>
      {book && <BookClubThisMonthBox book={book} />}

      {meeting && (
        <>
          <LabelOnTopBox
            labelOnTop='모임 시간'
            content={meeting.time ? getMeetingTime(meeting.time) : ''}
            meeting={meeting}
            editable={pathname !== '/'}
          />
          <LabelOnTopBox
            labelOnTop='모임 장소'
            content={meeting.place}
            meeting={meeting}
            editable={pathname !== '/'}
          />
        </>
      )}
    </BoxesContainer>
  );
}

const BoxesContainer = styled.div`
  margin: 4px 0 10px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media ${device.desktop} {
    grid-template-columns: repeat(5, 1fr);
  }
`;
