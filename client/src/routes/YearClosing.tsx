import { useRecoilValue } from 'recoil';

import { absenceAtom } from '@/data/absenceAtom';
import { allUsersAtom } from '@/data/userAtom';

import { thisYear } from '@/utils';

import MobileHeader from '@/layout/MobileHeader';

import Section from '@/components/common/container/Section';
import UserImgName from '@/components/common/user/UserImgName';

export default function YearClosing() {
  const usersDoc = useRecoilValue(allUsersAtom);

  const absenceList = useRecoilValue(absenceAtom);

  const absenceMemberObj = new Set(
    absenceList?.absenceMembers
      ?.map(({ breakMembers, onceAbsenceMembers }) => [
        ...breakMembers,
        ...onceAbsenceMembers,
      ])
      .flat(),
  );

  const pefectAttendanceMemberList = usersDoc.filter(
    ({ id }) => !absenceMemberObj.has(id),
  );

  return (
    <>
      <MobileHeader title={`${thisYear}년 연말결산 이벤트`} backBtn />

      <main>
        <Section title="2025 개근 멤버">
          <ul className="rounded-xl bg-white p-4 shadow-card">
            {pefectAttendanceMemberList.map(({ id }) => (
              <UserImgName key={id} userId={id} />
            ))}
          </ul>
        </Section>
      </main>
    </>
  );
}
