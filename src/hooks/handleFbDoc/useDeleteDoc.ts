import { getDocument } from 'api/getFbDoc';
import { currentUserState, userExtraInfoState } from 'data/userAtom';
import { dbService } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { USER_DATA, existDocObj } from 'util/index';

interface PropsType {
  docId: string;
  collectionName: string;
}

const useDeleteDoc = ({ docId, collectionName }: PropsType) => {
  const [userExtraData, setUserExtraData] = useRecoilState(userExtraInfoState);
  const userData = useRecoilValue(currentUserState);

  const docRef = doc(dbService, collectionName, `${docId}`);
  const userDataRef = doc(dbService, USER_DATA, `${userData.uid}`);

  useEffect(() => {
    if (userData.uid && !existDocObj(userExtraData)) {
      getDocument(USER_DATA, userData.uid, setUserExtraData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.uid]);

  const onDeleteClick = async () => {
    const confirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!confirm) return;
    await deleteDoc(docRef);
    updateUserData();
  };

  const updateUserData = async () => {
    const { reviews, subjects, recommendedBooks, hostReviews } =
      userExtraData.userRecords;

    if (collectionName.includes('Reviews')) {
      const filteredArr = reviews.filter((item) => item.docId !== docRef.id);
      await updateDoc(userDataRef, {
        'userRecords.reviews': filteredArr,
      });
    }
    if (collectionName.includes('Subjects')) {
      const filteredArr = subjects.filter((item) => item.docId !== docRef.id);
      await updateDoc(userDataRef, {
        'userRecords.subjects': filteredArr,
      });
    }
    if (collectionName.includes('Recommended')) {
      const filteredArr = recommendedBooks.filter(
        (item) => item.docId !== docRef.id
      );
      await updateDoc(userDataRef, {
        'userRecords.recommendedBooks': filteredArr,
      });
    }
    if (collectionName.includes('HostReview')) {
      const filteredArr = hostReviews.filter(
        (item) => item.docId !== docRef.id
      );
      await updateDoc(userDataRef, {
        'userRecords.hostReviews': filteredArr,
      });
    }
  };

  return {
    onDeleteClick,
  };
};

export default useDeleteDoc;
