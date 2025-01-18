import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { thisYear } from 'utils';

import MobileHeader from 'layout/mobile/MobileHeader';

import AbsenceMemberTable from 'components/absence/AbsenceMemberTable';
import BookFieldHostTable from 'components/bookClub/BookFieldHostTable';
import ChevronRightLinkBtn from 'components/common/button/ChevronRightLinkBtn';
import Section from 'components/common/container/Section';

export default function BookClubInformation() {
  const currUser = useRecoilValue(currentUserState);

  return (
    <>
      <MobileHeader title={`${thisYear}년 독서모임 한페이지 정보`} backBtn />

      <main>
        <Section title="월별 불참 멤버">
          <AbsenceMemberTable isFoldable isMonth />
          <ChevronRightLinkBtn
            title="나의 불참 설정하러 가기"
            to="/setting/absence"
            state={{ userId: currUser.uid }}
          />
        </Section>

        <Section title="월별 독서분야와 발제자">
          <BookFieldHostTable isEditable isFoldable isMonth />
        </Section>
      </main>
    </>
  );
}
