import { Section } from './Home';
import { thisYear } from 'util/index';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import MobileHeader from 'layout/mobile/MobileHeader';
import AbsenceMonthTable from 'components/organisms/AbsenceMonthTable';
import Subtitle from 'components/atoms/Subtitle';

export default function Absence() {
  const currentUser = useRecoilValue(currentUserState);

  return (
    <>
      <MobileHeader title='나의 모임불참 설정' backBtn />

      <main>
        <Section>
          <Subtitle title={`${thisYear}년 모임 불참`} />
          <AbsenceMonthTable userId={currentUser.uid} isEditable={true} />
        </Section>
      </main>
    </>
  );
}
