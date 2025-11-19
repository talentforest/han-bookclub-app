import { useState } from 'react';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { useEditDoc } from '@/hooks/handleFbDoc/useEditDoc';

import { Collection, SubCollection } from '@/types';

interface IHandleLikeProps {
  likes: number;
  likeUsers: string[];
  docId: string;
  collName: Collection | SubCollection;
}

export const useHandleLike = ({
  likes,
  likeUsers,
  docId,
  collName,
}: IHandleLikeProps) => {
  const [like, setLike] = useState(false);

  const [showLikeUsers, setShowLikeUsers] = useState(false);

  const { uid } = useRecoilValue(currAuthUserAtom);

  const { onEditClick } = useEditDoc({ collName, docId });

  const onLikeClick = async () => {
    if (!collName) return;

    if (like) {
      setShowLikeUsers(false);

      await onEditClick({
        likes: likes - 1,
        likeUsers: likeUsers.filter(likeId => likeId !== uid),
      });
    } else {
      await onEditClick({
        likes: likes + 1,
        likeUsers: [...likeUsers, uid],
      });
    }

    setLike(prev => !prev);
  };

  const toggleShowLikeUsers = () => setShowLikeUsers(prev => !prev);

  return {
    like,
    setLike,
    onLikeClick,
    showLikeUsers,
    toggleShowLikeUsers,
  };
};
