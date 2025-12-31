import { Link, useLocation } from 'react-router-dom';

import { authService } from '@/fbase';
import { RiSettings2Line } from 'react-icons/ri';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom, userDocAtomFamily } from '@/data/userAtom';

import { CHALLENGE, postNameObj } from '@/appConstants';

import { SubPostTypeKey } from '@/types';

import MobileHeader from '@/layout/MobileHeader';

import ChallengeDisplayList from '@/components/bookshelf/ChallengeDisplayList';
import MyClubDisplayList from '@/components/bookshelf/MyClubDisplayList';
import UserPostDisplayList from '@/components/bookshelf/UserPostDisplayList';
import LoopLoading from '@/components/common/LoopLoading';
import Tag from '@/components/common/Tag';
import ChevronRightLinkBtn from '@/components/common/button/ChevronRightLinkBtn';
import Section from '@/components/common/container/Section';
import UserImg from '@/components/common/user/UserImg';

const Bookshelf = () => {
  const { state } = useLocation() as { state: { userId: string } };

  const { uid } = useRecoilValue(currAuthUserAtom);

  const userData = useRecoilValue(userDocAtomFamily(state?.userId || uid));

  const {
    id: userId,
    favoriteBookField,
    displayName: username,
    photoURL,
    hostYearMonthIdList,
  } = userData || {};

  const isAnonymous = authService.currentUser.isAnonymous;

  const isCurrentUser = uid === userId;
  const displayName = isCurrentUser ? '나' : username;

  return (
    Object.keys(userData).length > 0 && (
      <>
        <MobileHeader title={`${displayName}의 책장`} backBtn={!isCurrentUser}>
          {isCurrentUser && (
            <Link
              to={!isAnonymous ? '/setting' : ''}
              onClick={() => {
                if (isAnonymous) return alert('익명의 방문자입니다!');
              }}
            >
              <RiSettings2Line fontSize={20} />
            </Link>
          )}
        </MobileHeader>

        <main>
          {/* 내 정보 */}
          <Section className="mb-0">
            <UserImg
              isEditing={false}
              imgUrl={photoURL?.original || (photoURL as unknown as string)}
            />
            <span className="mx-auto text-lg font-medium">{username}</span>
          </Section>

          {/* 독서분야취향 */}
          <Section className="!pb-4" title={`${displayName}의 독서 분야 취향`}>
            <ul className="flex min-h-14 flex-wrap gap-2">
              {favoriteBookField && favoriteBookField?.length !== 0 ? (
                favoriteBookField.map(({ id, name }) => (
                  <Tag
                    text={name}
                    key={id}
                    color="lightBlue"
                    shape="rounded"
                    className="shadow-card"
                  />
                ))
              ) : (
                <LoopLoading size={100} className="h-[30vh] w-full" />
              )}
            </ul>
          </Section>

          {/* 여기 디스플레이 섹션 */}
          {Object.entries({
            myClub: '내가 진행한 모임',
            [CHALLENGE]: '챌린지',
            ...postNameObj.subCollection,
          })?.map(([collName, name]) => (
            <Section
              key={collName}
              className="!pb-8"
              title={collName === 'myClub' ? name : `${displayName}의 ${name}`}
              titleBtn={
                <ChevronRightLinkBtn
                  to={`/bookshelf/detail${isCurrentUser ? '' : `/${username}`}?type=${collName === 'myClub' ? name : `${displayName}의 ${name}`}`}
                  className="py-1 pl-6"
                  state={{ displayName, postTypeKey: collName, userId }}
                />
              }
            >
              {name === '내가 진행한 모임' ? (
                <MyClubDisplayList
                  hostYearMonthIdList={hostYearMonthIdList?.slice(0, 1)}
                />
              ) : collName === CHALLENGE ? (
                <ChallengeDisplayList userId={userId} limitNum={1} />
              ) : (
                <UserPostDisplayList
                  userId={userId}
                  postTypeKey={collName as SubPostTypeKey}
                  limitNum={1}
                />
              )}
            </Section>
          ))}
        </main>
      </>
    )
  );
};

export default Bookshelf;
