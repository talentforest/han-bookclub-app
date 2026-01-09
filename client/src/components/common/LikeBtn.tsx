import { FiChevronDown, FiChevronUp, FiHeart } from 'react-icons/fi';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { developmentMode, testerUid } from '@/appConstants';

import { useHandleLike } from '@/hooks';

import { Collection, SubCollection, UserPost } from '@/types';

import UserImgName from '@/components/common/user/UserImgName';

interface LikeBtnProps {
  postLike: Pick<UserPost, 'creatorId' | 'like' | 'docId'>;
  collName?: Collection | SubCollection;
}

export default function LikeBtn({
  postLike: { docId, like: postLike, creatorId },
  collName,
}: LikeBtnProps) {
  const {
    data: { uid },
  } = useRecoilValue(currAuthUserAtom);

  const {
    isLike,
    like: { counts, userList },
    onLikeClick,
    showLikeUsers,
    toggleShowLikeUsers,
  } = useHandleLike({ docId, postLike, collName });

  const excludeTesterUserList = developmentMode
    ? userList
    : userList.filter(userId => userId !== testerUid);

  const excludeTesterCounts =
    developmentMode || !userList.includes(testerUid)
      ? counts
      : userList.includes(testerUid);

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={toggleShowLikeUsers}
        className="group p-1 disabled:text-gray2"
        disabled={!excludeTesterCounts || excludeTesterCounts === 0}
      >
        {showLikeUsers ? (
          <FiChevronUp className="group:text-gray1" />
        ) : (
          <FiChevronDown className="group:text-gray1" />
        )}
      </button>

      <span className="text-sm tracking-tighter">
        {excludeTesterCounts || 0}명이 좋아요
      </span>

      <button
        type="button"
        disabled={!collName || uid === creatorId}
        onClick={onLikeClick}
        className="group p-1"
      >
        <FiHeart
          fontSize={14}
          className={`stroke-red-500 group-disabled:stroke-gray1 ${isLike ? 'fill-red-500 group-disabled:fill-gray1' : 'bg-transparent'}`}
        />
      </button>

      {showLikeUsers && counts > 0 && (
        <div className="absolute bottom-7 right-0 rounded-xl border bg-white p-3">
          <h4 className="mb-2 min-w-20 text-sm text-gray1">좋아한 멤버</h4>
          <ul className="flex w-full flex-wrap gap-x-2 gap-y-1">
            {excludeTesterUserList?.map(user => (
              <li key={user}>
                <UserImgName userId={user} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
