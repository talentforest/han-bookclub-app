import { getDocument } from 'api/getFbDoc';
import { currentUserState, userExtraInfoState } from 'data/userAtom';
import { dbService } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { USER_DATA } from 'util/index';

interface PropsType {
  docId: string;
  collectionName: string;
}

const useDeleteDoc = ({ docId, collectionName }: PropsType) => {
  const [userExtraData, setUserExtraData] = useRecoilState(userExtraInfoState);
  const userData = useRecoilValue(currentUserState);

  const docRef = doc(dbService, collectionName, `${docId}`);
  const userDataRef = doc(dbService, USER_DATA, `${userData.uid}`);
  const existUserExtraData = Object.keys(userExtraData).length;

  useEffect(() => {
    if (userData.uid && !existUserExtraData) {
      getDocument(USER_DATA, userData.uid, setUserExtraData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.uid]);

  const onDeleteClick = async () => {
    await deleteDoc(docRef);
    updateUserData();
  };

  const updateUserData = async () => {
    const { reviews, subjects, recommendedBooks, hostReviews } =
      userExtraData.userRecords;

    if (collectionName.includes('reviews')) {
      const filteredArr = reviews.filter((item) => item.docId !== docRef.id);
      await updateDoc(userDataRef, {
        'userRecords.reviews': filteredArr,
      });
    }
    if (collectionName.includes('subjects')) {
      const filteredArr = subjects.filter((item) => item.docId !== docRef.id);
      await updateDoc(userDataRef, {
        'userRecords.subjects': filteredArr,
      });
    }
    if (collectionName.includes('recommended')) {
      const filteredArr = recommendedBooks.filter(
        (item) => item.docId !== docRef.id
      );
      await updateDoc(userDataRef, {
        'userRecords.recommendedBooks': filteredArr,
      });
    }
    if (collectionName.includes('host')) {
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
