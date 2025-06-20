import { useRecoilValue } from 'recoil';

import AbsenceMonthTable from '@/components/absence/AbsenceMonthTable';
import GuideLine from '@/components/common/GuideLine';
import Section from '@/components/common/container/Section';
import { currAuthUserAtom } from '@/data/userAtom';
import MobileHeader from '@/layout/mobile/MobileHeader';
import { thisYear } from '@/utils';

export default function Absence() {
  const { uid } = useRecoilValue(currAuthUserAtom);

  return (
    <>
      <MobileHeader title="나의 모임불참 설정" backBtn />

      <main>
        <Section title={`${thisYear}년 나의 모임 불참`}>
          <GuideLine text="모임에 일회불참하거나 모임정지하는 모든 달에 체크해주세요" />
          <AbsenceMonthTable userId={uid} isEditable />
        </Section>
      </main>
    </>
  );
}
