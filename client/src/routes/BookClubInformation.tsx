import { thisYear } from 'util/index';
import MobileHeader from 'layout/mobile/MobileHeader';
import BookFieldHostTable from 'components/organisms/BookFieldHostTable';
import AbsenceMemberTable from 'components/organisms/AbsenceMemberTable';
import LinkChevronRightBtn from 'components/atoms/button/LinkChevronRightBtn';
import Section from 'components/atoms/container/Section';

export default function BookClubInformation() {
  return (
    <>
      <MobileHeader title={`${thisYear}년 독서모임 한페이지 정보`} backBtn />

      <main>
        <Section title='월별 불참 멤버'>
          <AbsenceMemberTable isFoldable isMonth />
          <LinkChevronRightBtn
            title='나의 불참 설정하러 가기'
            to='/setting/absence'
            userState
          />
        </Section>

        <Section title='월별 독서분야와 발제자'>
          <BookFieldHostTable isEditable isFoldable isMonth />
        </Section>
      </main>
    </>
  );
}
