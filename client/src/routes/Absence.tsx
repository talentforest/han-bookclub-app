import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { thisYear } from 'utils';

import MobileHeader from 'layout/mobile/MobileHeader';

import AbsenceMonthTable from 'components/absence/AbsenceMonthTable';
import GuideLine from 'components/common/GuideLine';
import Section from 'components/common/container/Section';

export default function Absence() {
  const currentUser = useRecoilValue(currentUserState);

  return (
    <>
      <MobileHeader title="나의 모임불참 설정" backBtn />

      <main>
        <Section title={`${thisYear}년 나의 모임 불참`}>
          <GuideLine text="모임에 일회불참하거나 모임정지하는 모든 달을 체크해주세요" />
          <AbsenceMonthTable userId={currentUser.uid} isEditable />
        </Section>
      </main>
    </>
  );
}
