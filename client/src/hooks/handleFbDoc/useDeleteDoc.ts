import { useEffect } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { getDocument } from '@/api/firebase/getFbDoc';
import { USER } from '@/appConstants';
import { currAuthUserAtom, userDocAtomFamily } from '@/data/userAtom';
import { dbService } from '@/fbase';
import { existDocObj } from '@/utils';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

interface PropsType {
  docId: string;
  collName: string;
}

const useDeleteDoc = ({ docId, collName }: PropsType) => {
  const { uid } = useRecoilValue(currAuthUserAtom);
  const [userExtraData, setUserExtraData] = useRecoilState(
    userDocAtomFamily(uid),
  );

  const docRef = doc(dbService, collName, docId);
  const userDataRef = doc(dbService, USER, uid);

  useEffect(() => {
    if (uid && !existDocObj(userExtraData)) {
      getDocument(USER, uid, setUserExtraData);
    }
  }, [uid]);

  const onDeleteClick = async () => {
    const confirm = window.confirm('정말로 삭제하시겠어요?');
    if (!confirm) return;
    await deleteDoc(docRef);
    updateUserData();
  };

  const updateUserData = async () => {
    const { reviews, subjects, recommendedBooks, hostReviews, sentences } =
      userExtraData.userRecords;

    if (collName.includes('Reviews')) {
      const filteredArr = reviews.filter(item => item.docId !== docRef.id);
      await updateDoc(userDataRef, {
        'userRecords.reviews': filteredArr,
      });
    }
    if (collName.includes('Subjects')) {
      const filteredArr = subjects.filter(item => item.docId !== docRef.id);
      await updateDoc(userDataRef, {
        'userRecords.subjects': filteredArr,
      });
    }
    if (collName.includes('Recommended')) {
      const filteredArr = recommendedBooks.filter(
        item => item.docId !== docRef.id,
      );
      await updateDoc(userDataRef, {
        'userRecords.recommendedBooks': filteredArr,
      });
    }
    if (collName.includes('HostReview')) {
      const filteredArr = hostReviews.filter(item => item.docId !== docRef.id);
      await updateDoc(userDataRef, {
        'userRecords.hostReviews': filteredArr,
      });
    }

    if (collName.includes('Sentence-2024')) {
      const filteredArr = sentences.filter(item => item.docId !== docRef.id);
      await updateDoc(userDataRef, {
        'userRecords.sentences': filteredArr,
      });
    }
  };

  return {
    onDeleteClick,
  };
};

export default useDeleteDoc;
