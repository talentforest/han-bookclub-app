import { useEffect } from 'react';

import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { useHandleLike } from '@/hooks';

import { Collection, SubCollection, UserPost } from '@/types';

import LikeBtn from '@/components/common/button/LikeBtn';
import UserImgName from '@/components/common/user/UserImgName';

interface LikeBtnWithPeopleInfoProps {
  post: UserPost;
  collName?: Collection | SubCollection;
}

const LikeBtnWithPeopleInfo = ({
  post,
  collName,
}: LikeBtnWithPeopleInfoProps) => {
  const { uid } = useRecoilValue(currAuthUserAtom);

  const myPost = uid === post.creatorId;

  const { like, setLike, onLikeClick, showLikeUsers, toggleShowLikeUsers } =
    useHandleLike({
      likes: post.likes || 0,
      likeUsers: post.likeUsers || [],
      docId: post.id,
      collName,
    });

  const currentUserLike = post.likeUsers?.some(likeUid => likeUid === uid);

  useEffect(() => {
    if (currentUserLike) {
      setLike(true);
    }
  }, []);

  return (
    <div className="relative flex">
      <button type="button" onClick={toggleShowLikeUsers} className="px-1">
        {showLikeUsers ? (
          <FiChevronUp className="text-gray1" />
        ) : (
          <FiChevronDown className="text-gray1" />
        )}
      </button>

      <span className="text-sm">{post?.likeUsers?.length || 0} Likes</span>

      {!myPost && (
        <LikeBtn collName={collName} like={like} onLikeClick={onLikeClick} />
      )}

      {showLikeUsers && (
        <div className="absolute bottom-7 right-0 rounded-xl border bg-white p-3">
          <h4 className="mb-2 min-w-20 text-sm text-gray1">좋아한 멤버</h4>
          <ul className="flex w-full flex-wrap gap-x-2 gap-y-1">
            {post?.likeUsers?.map(user => (
              <UserImgName key={user} userId={user} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LikeBtnWithPeopleInfo;
