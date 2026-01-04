import { useLocation } from 'react-router-dom';

import { thisYear } from '@/utils';

import { MonthlyClubInfoType } from '@/types';

import MobileHeader from '@/layout/MobileHeader';

import AbsenceMemberTable from '@/components/absence/AbsenceMemberTable';
import BookFieldHostTable from '@/components/bookClub/BookFieldHostTable';
import ChevronRightLinkBtn from '@/components/common/button/ChevronRightLinkBtn';

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
      <MobileHeader title={`${thisYear}년 ${name} 정보`} backBtn />

      <main>
        {name === '모임불참' && (
          <>
            <AbsenceMemberTable year={thisYear} isMonth />

            <ChevronRightLinkBtn
              title="나의 불참 설정하러 가기"
              to="/setting/myAbsenceMonth"
              state={{ year: thisYear }}
              className="pt-5"
            />
          </>
        )}

        {name === '월별 독서분야' && (
          <BookFieldHostTable year={thisYear} isEditable isMonth />
        )}
      </main>
    </>
  );
}
