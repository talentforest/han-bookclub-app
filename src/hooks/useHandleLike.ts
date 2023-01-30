import { currentUserState } from 'data/userAtom';
import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

interface IHandleLikeProps {
  likes: number;
  likeUsers: string[];
  docId: string;
  collectionName: string;
}

const useHandleLike = ({
  likes,
  likeUsers,
  docId,
  collectionName,
}: IHandleLikeProps) => {
  const [like, setLike] = useState(false);
  const [showLikeUsers, setShowLikeUsers] = useState(false);
  const currentUser = useRecoilValue(currentUserState);

  const onLikeClick = async () => {
    if (!collectionName) return;
    const docRef = doc(dbService, collectionName, `${docId}`);
    if (like) {
      setShowLikeUsers(false);
      await updateDoc(docRef, {
        likes: likes - 1,
        likeUsers: likeUsers.filter((uid) => uid !== currentUser.uid),
      });
    } else if (!like) {
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
