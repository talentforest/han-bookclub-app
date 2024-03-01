import { thisYear } from 'util/index';
import { Section } from './Home';
import MobileHeader from 'layout/mobile/MobileHeader';
import Subtitle from 'components/atoms/Subtitle';
import BookFieldHostTable from 'components/organisms/BookFieldHostTable';
import AbsenceMemberTable from 'components/organisms/AbsenceMemberTable';

export default function BookClubInformation() {
  return (
    <>
      <MobileHeader title={`${thisYear}년 한페이지 독서모임 정보`} backBtn />

      <main>
        <Section>
          <Subtitle title='월별 불참 멤버' />
          <AbsenceMemberTable isFoldable isMonth />
        </Section>

        <Section>
          <Subtitle title='월별 독서분야와 발제자' />
          <BookFieldHostTable isEditable isFoldable isMonth />
        </Section>
      </main>
    </>
  );
}
