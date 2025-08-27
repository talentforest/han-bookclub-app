import { useLocation } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { thisYear } from '@/utils';

import { BookClubInfo } from '@/types';

import MobileHeader from '@/layout/mobile/MobileHeader';

import AbsenceMemberTable from '@/components/absence/AbsenceMemberTable';
import BookFieldHostTable from '@/components/bookClub/BookFieldHostTable';
import ChevronRightLinkBtn from '@/components/common/button/ChevronRightLinkBtn';
import Section from '@/components/common/container/Section';

export default function MonthlyClubInfo() {
  const { uid } = useRecoilValue(currAuthUserAtom);

  const { state } = useLocation() as { state: BookClubInfo };

  const infoPerType: {
    [key in BookClubInfo]: {
      name: '월별 독서분야' | '모임불참' | '챌린지' | '연말결산';
    };
  } = {
    fieldAndHost: {
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

  const { name } = infoPerType[state];

  return (
    <>
      <MobileHeader title={`${thisYear}년 ${name} 정보`} backBtn />

      <main>
        {name === '모임불참' && (
          <Section>
            <AbsenceMemberTable isMonth />
            <ChevronRightLinkBtn
              title="나의 불참 설정하러 가기"
              to="/setting/absence"
              state={{ userId: uid }}
              className="pt-3"
            />
          </Section>
        )}

        {name === '월별 독서분야' && (
          <Section title="월별 독서분야와 발제자">
            <BookFieldHostTable isEditable isMonth />
          </Section>
        )}
      </main>
    </>
  );
}
