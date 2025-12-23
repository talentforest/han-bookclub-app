import { useLocation } from 'react-router-dom';

import { thisYear } from '@/utils';

import { MonthlyClubInfoType } from '@/types';

import MobileHeader from '@/layout/MobileHeader';

import AbsenceMemberTable from '@/components/absence/AbsenceMemberTable';
import BookFieldHostTable from '@/components/bookClub/BookFieldHostTable';
import ChevronRightLinkBtn from '@/components/common/button/ChevronRightLinkBtn';
import Section from '@/components/common/container/Section';

export default function MonthlyClubInfo() {
  const { state } = useLocation() as {
    state: 'fieldAndHost' | 'absence';
  };

  const infoPerType: Pick<MonthlyClubInfoType, 'fieldAndHost' | 'absence'> = {
    fieldAndHost: '월별 독서분야',
    absence: '모임불참',
  };

  const name = infoPerType[state];

  return (
    <>
      <MobileHeader title={`${name} 정보`} backBtn />

      <main>
        {name === '모임불참' && (
          <>
            <Section title={`2025년 모임불참`}>
              <AbsenceMemberTable year="2025" isMonth />

              <ChevronRightLinkBtn
                title="나의 불참 설정하러 가기"
                to="/setting/absence"
                state={{ year: '2025' }}
                className="pt-3"
              />
            </Section>

            <Section title={`2026년 모임불참`}>
              <AbsenceMemberTable year="2026" isMonth />
            </Section>
          </>
        )}

        {name === '월별 독서분야' && (
          <Section title={`${thisYear}년 월별 독서분야와 발제자`}>
            <BookFieldHostTable year={thisYear} isEditable isMonth />
          </Section>
        )}
      </main>
    </>
  );
}
