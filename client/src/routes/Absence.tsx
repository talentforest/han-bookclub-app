import { thisYear } from 'util/index';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import MobileHeader from 'layout/mobile/MobileHeader';
import AbsenceMonthTable from 'components/organisms/AbsenceMonthTable';
import GuideLine from 'components/atoms/GuideLine';
import Section from 'components/atoms/container/Section';

export default function Absence() {
  const currentUser = useRecoilValue(currentUserState);

  return (
    <>
      <MobileHeader title='나의 모임불참 설정' backBtn />

      <main>
        <Section title={`${thisYear}년 나의 모임 불참`}>
          <GuideLine text='모임에 일회불참하거나 모임정지하는 모든 달을 체크해주세요' />
          <AbsenceMonthTable userId={currentUser.uid} isEditable={true} />
        </Section>
      </main>
    </>
  );
}
