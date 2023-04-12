import { currentUserState } from 'data/userAtom';
import { authService, dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import useAlertAskJoin from './useAlertAskJoin';

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
  const currentUser = useRecoilValue(currentUserState);
  const anonymous = authService.currentUser?.isAnonymous;

  const onLikeClick = async () => {
    if (!collName) return;
    if (anonymous)
      return window.alert('익명의 방문자는 좋아요를 누를 수 없습니다.');
    const docRef = doc(dbService, collName, `${docId}`);
    if (like) {
      setShowLikeUsers(false);
      await updateDoc(docRef, {
        likes: likes - 1,
        likeUsers: likeUsers.filter((uid) => uid !== currentUser.uid),
      });
    }
    if (!like) {
      await updateDoc(docRef, {
        likes: likes + 1,
        likeUsers: [...likeUsers, currentUser.uid],
      });
    }
    setLike((prev) => !prev);
  };

  const toggleShowLikeUsers = () => setShowLikeUsers((prev) => !prev);

  return {
    like,
    setLike,
    onLikeClick,
    showLikeUsers,
    toggleShowLikeUsers,
  };
};

export default useHandleLike;
