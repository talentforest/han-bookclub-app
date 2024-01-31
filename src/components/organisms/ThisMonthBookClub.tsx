import { getDocument } from 'api/getFbDoc';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getMeetingTime, thisMonth, thisYearMonthId } from 'util/index';
import { thisMonthBookClubState } from 'data/bookClubAtom';
import { THIS_YEAR_BOOKCLUB } from 'constants/fbRouteName';
import { fieldHostDocState } from 'data/bookFieldHostAtom';
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

  const bookFieldHostDoc = useRecoilValue(fieldHostDocState);

  const thisMonthHosts = bookFieldHostDoc.info?.find(
    ({ month }) => month === +thisMonth
  )?.hosts;

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
      <LabelOnTopBox
        labelOnTop='이달의 발제자'
        content={thisMonthHosts}
        editable={false}
      />
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
