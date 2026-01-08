import { useEffect, useMemo, useState } from 'react';

import { arrayRemove, arrayUnion, increment } from 'firebase/firestore';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { useEditDoc } from '@/hooks/handleFbDoc/useEditDoc';

import { Collection, SubCollection } from '@/types';

type Like = { counts: number; userList?: string[] };

interface IHandleLikeProps {
  postLike: Like;
  docId: string;
  collName: Collection | SubCollection;
}

const initialLike: Like = { counts: 0, userList: [] };

export const useHandleLike = ({
  postLike,
  docId,
  collName,
}: IHandleLikeProps) => {
  const {
    data: { uid },
  } = useRecoilValue(currAuthUserAtom);

  const { onEditSubmitClick } = useEditDoc({ collName, docId });

  const [like, setLike] = useState<Like>(postLike ?? initialLike);

  const isLike = useMemo(() => {
    return (like.userList ?? []).includes(uid);
  }, [like.userList, uid]);

  const [showLikeUsers, setShowLikeUsers] = useState(false);

  useEffect(() => {
    setLike(postLike ?? initialLike);
  }, [postLike?.counts, postLike?.userList, docId]);

  const onLikeClick = async () => {
    if (!collName || !uid) return;

    const nextIsLike = !isLike;
    const inc = nextIsLike ? 1 : -1;

    setLike(prev => {
      const prevList = prev.userList ?? [];
      const nextList = nextIsLike
        ? prevList.includes(uid)
          ? prevList
          : [...prevList, uid]
        : prevList.filter(id => id !== uid);

      return {
        counts: Math.max(0, (prev.counts ?? 0) + inc),
        userList: nextList,
      };
    });

    try {
      await onEditSubmitClick({
        'like.counts': increment(inc),
        'like.userList': nextIsLike ? arrayUnion(uid) : arrayRemove(uid),
      });
    } catch (e) {
      setLike(postLike ?? initialLike);
      throw e;
    }
  };

  const toggleShowLikeUsers = () => setShowLikeUsers(prev => !prev);

  return {
    isLike,
    like,
    onLikeClick,
    showLikeUsers,
    toggleShowLikeUsers,
  };
};
