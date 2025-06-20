import { useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import LikeBtn from '@/components/common/button/LikeBtn';
import UserName from '@/components/common/user/UserName';
import { IDocument } from '@/data/documentsAtom';
import { currAuthUserAtom } from '@/data/userAtom';
import useHandleLike from '@/hooks/useHandleLike';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface Props {
  post: IDocument;
  collName?: string;
}

const LikeBtnWithPeopleInfo = ({ post, collName }: Props) => {
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

      <span className="text-sm">
        {post?.likeUsers?.length || 0}명이 좋아합니다
      </span>

      {!myPost && (
        <LikeBtn collName={collName} like={like} onLikeClick={onLikeClick} />
      )}

      {showLikeUsers && (
        <div className="absolute bottom-7 rounded-xl border bg-white p-3">
          <h4 className="mb-2 text-sm text-gray1">좋아한 사람</h4>
          <ul className="w-full">
            {post?.likeUsers?.map(user => (
              <UserName key={user} userId={user} className="py-0.5" />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LikeBtnWithPeopleInfo;
