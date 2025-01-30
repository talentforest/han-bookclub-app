import { useLocation } from 'react-router-dom';

import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { thisYear } from 'utils';

import MobileHeader from 'layout/mobile/MobileHeader';

import AbsenceMemberTable from 'components/absence/AbsenceMemberTable';
import BookFieldHostTable from 'components/bookClub/BookFieldHostTable';
import ChevronRightLinkBtn from 'components/common/button/ChevronRightLinkBtn';
import Section from 'components/common/container/Section';

type BookClubInfoType =
  | 'bookFieldAndHost'
  | 'absence'
  | 'challenge'
  | 'yearClosing';

export default function BookClubInformation() {
  const currUser = useRecoilValue(currentUserState);

  const { state } = useLocation();

  const infoPerType: {
    [key in BookClubInfoType]: {
      name: '월별 독서분야' | '모임불참' | '챌린지' | '연말결산';
    };
  } = {
    bookFieldAndHost: {
      name: '월별 독서분야',
    },
    absence: {
      name: '모임불참',
    },
    challenge: {
      name: '챌린지',
    },
    yearClosing: {
      name: '연말결산',
    },
  };

  const { name } = infoPerType[state as BookClubInfoType];

  return (
    <>
      <MobileHeader title={`${thisYear}년 ${name} 정보`} backBtn />

      <main>
        {name === '모임불참' && (
          <Section>
            <AbsenceMemberTable isMonth isFoldable />
            <ChevronRightLinkBtn
              title="나의 불참 설정하러 가기"
              to="/setting/absence"
              state={{ userId: currUser.uid }}
            />
          </Section>
        )}

        {name === '월별 독서분야' && (
          <Section title="월별 독서분야와 발제자">
            <BookFieldHostTable isEditable isFoldable isMonth />
          </Section>
        )}
      </main>
    </>
  );
}
