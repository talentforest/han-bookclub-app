import { useLocation, useSearchParams } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { userAtomFamily } from '@/data/userAtom';

import { CHALLENGE } from '@/appConstants';

import { PostTypeKey, SectionTitle } from '@/types';

import MobileHeader from '@/layout/MobileHeader';

import ChallengeDisplayList from '@/components/bookshelf/ChallengeDisplayList';
import MyClubDisplayList from '@/components/bookshelf/MyClubDisplayList';
import UserPostDisplayList from '@/components/bookshelf/UserPostDisplayList';

type StateProps = {
  displayName: string;
  userId: string;
  postTypeKey?: PostTypeKey;
};

export default function BookshelfDetail() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') as SectionTitle;

  const {
    state: { displayName, userId, postTypeKey },
  } = useLocation() as { state: StateProps };

  const userData = useRecoilValue(userAtomFamily(userId));

  const { hostYearMonthIdList } = userData || {};

  return (
    <>
      <MobileHeader
        title={type}
        backBtn
        backTo={`/bookshelf${displayName !== '나' ? `/${displayName}` : ''}`}
        state={{ userId }}
      />
      <main>
        {type === '내가 진행한 모임' ? (
          // 내가 진행한 모임
          <MyClubDisplayList hostYearMonthIdList={hostYearMonthIdList} />
        ) : postTypeKey === CHALLENGE ? (
          // 나의 챌린지
          <ChallengeDisplayList userId={userId} />
        ) : postTypeKey === 'Sentence-2024' ? (
          <></>
        ) : (
          <UserPostDisplayList userId={userId} postTypeKey={postTypeKey} />
        )}
      </main>
    </>
  );
}
