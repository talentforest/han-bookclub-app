import { useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { getDocument } from 'api/firebase/getFbDoc';

import { attendanceSelector } from 'data/absenceAtom';
import { challengeState } from 'data/bookAtom';
import { allUsersAtom, currAuthUserAtom } from 'data/userAtom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { CHALLENGE } from 'appConstants';
import { FiSettings } from 'react-icons/fi';
import { thisMonth } from 'utils';

import MobileHeader from 'layout/mobile/MobileHeader';

import BookshelfPostList from 'components/bookshelf/BookshelfPostList';
import ChallengeBookCard from 'components/challenge/ChallengeBookCard';
import GuideLine from 'components/common/GuideLine';
import Loading from 'components/common/Loading';
import Subtitle from 'components/common/Subtitle';
import Tag from 'components/common/Tag';
import Section from 'components/common/container/Section';
import UserImgName from 'components/common/user/UserImgName';
import { PostType } from 'components/post/PostHandleBtns';

const Bookshelf = () => {
  const [challenge, setChallenge] = useRecoilState(challengeState);

  const { state } = useLocation() as {
    state: { userId: string };
  };

  const { absenteeList } = useRecoilValue(attendanceSelector(+thisMonth));

  const { uid } = useRecoilValue(currAuthUserAtom);

  const allUserDocs = useRecoilValue(allUsersAtom);

  const userData = allUserDocs.find(user => user.id === state.userId);

  const {
    id,
    photoURL,
    favoriteBookField,
    userRecords,
    displayName: username,
  } = userData || {};

  const isCurrentUser = uid === id;

  const displayName = isCurrentUser ? '나' : username;

  const isAbsentee = absenteeList.includes(state.userId);

  useEffect(() => {
    if (challenge?.creatorId !== id && id) {
      getDocument(CHALLENGE, `2024-${id}`, setChallenge);
    }
  }, [id]);

  return (
    <>
      <MobileHeader title={`${displayName}의 책장`} backBtn={!isCurrentUser}>
        {isCurrentUser && (
          <Link to="/setting">
            <FiSettings fontSize={18} />
          </Link>
        )}
      </MobileHeader>

      {userData && (
        <main>
          <Section>
            <UserImgName photoURL={photoURL} displayName={displayName} />
            <div className="mt-2.5 flex flex-col items-center gap-1">
              {isAbsentee ? (
                <Tag text="🔴 이번달 불참" color="red" shape="square" />
              ) : (
                <Tag text="✅ 이번달 출석" color="green" shape="square" />
              )}
            </div>
          </Section>

          <Section title={`${displayName}의 독서 분야 취향`}>
            <ul className="flex min-h-14 flex-wrap gap-2">
              {favoriteBookField && favoriteBookField?.length !== 0 ? (
                favoriteBookField.map(({ id, name }) => (
                  <Tag text={name} key={id} color="lightBlue" shape="rounded" />
                ))
              ) : (
                <Loading className="h-[12vh]" />
              )}
            </ul>
          </Section>

          {challenge?.books && (
            <Section>
              <Subtitle title={`${displayName}의 2024 챌린지 히스토리`} />
              <ul className="grid grid-cols-2 gap-4 max-sm:flex max-sm:flex-col">
                {challenge?.books?.map(challengeBook => (
                  <ChallengeBookCard
                    key={challengeBook.title}
                    challengeBook={challengeBook}
                    creatorId={challenge.creatorId}
                    docId={`2024-${challenge.creatorId}`}
                  />
                ))}
              </ul>
            </Section>
          )}

          {(['발제문', '정리 기록', '모임 후기'] as PostType[])?.map(
            postType => (
              <Section key={postType}>
                <Subtitle title={`${displayName}의 ${postType}`} />
                <GuideLine text="2022년 6월 이후의 기록이 제공됩니다." />
                <BookshelfPostList
                  userRecords={userRecords}
                  postType={postType}
                />
              </Section>
            ),
          )}
        </main>
      )}
    </>
  );
};

export default Bookshelf;
