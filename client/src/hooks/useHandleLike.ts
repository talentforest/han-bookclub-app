import { useState } from 'react';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';
import { authService, dbService } from '@/fbase';
import { doc, updateDoc } from 'firebase/firestore';

interface IHandleLikeProps {
  likes: number;
  likeUsers: string[];
  docId: string;
  collName: string;
}

const useHandleLike = ({
  likes,
  likeUsers,
  docId,
  collName,
}: IHandleLikeProps) => {
  const [like, setLike] = useState(false);
  const [showLikeUsers, setShowLikeUsers] = useState(false);
  const { uid } = useRecoilValue(currAuthUserAtom);
  const anonymous = authService.currentUser?.isAnonymous;

  const onLikeClick = async () => {
    if (!collName || anonymous) return;

    const docRef = doc(dbService, collName, `${docId}`);

    if (like) {
      setShowLikeUsers(false);
      await updateDoc(docRef, {
        likes: likes - 1,
        likeUsers: likeUsers.filter(likeId => likeId !== uid),
      });
    } else {
      await updateDoc(docRef, {
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

export default useHandleLike;
