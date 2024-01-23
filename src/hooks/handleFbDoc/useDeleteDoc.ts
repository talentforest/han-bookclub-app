import { getDocument } from 'api/getFbDoc';
import { currentUserState, userExtraInfoState } from 'data/userAtom';
import { dbService } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { existDocObj } from 'util/index';
import { USER_DATA } from 'constants/index';

interface PropsType {
  docId: string;
  collName: string;
}

const useDeleteDoc = ({ docId, collName }: PropsType) => {
  const [userExtraData, setUserExtraData] = useRecoilState(userExtraInfoState);
  const userData = useRecoilValue(currentUserState);

  const docRef = doc(dbService, collName, `${docId}`);
  const userDataRef = doc(dbService, USER_DATA, `${userData.uid}`);

  useEffect(() => {
    if (userData.uid && !existDocObj(userExtraData)) {
      getDocument(USER_DATA, userData.uid, setUserExtraData);
    }
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

    if (collName.includes('Reviews')) {
      const filteredArr = reviews.filter((item) => item.docId !== docRef.id);
      await updateDoc(userDataRef, {
        'userRecords.reviews': filteredArr,
      });
    }
    if (collName.includes('Subjects')) {
      const filteredArr = subjects.filter((item) => item.docId !== docRef.id);
      await updateDoc(userDataRef, {
        'userRecords.subjects': filteredArr,
      });
    }
    if (collName.includes('Recommended')) {
      const filteredArr = recommendedBooks.filter(
        (item) => item.docId !== docRef.id
      );
      await updateDoc(userDataRef, {
        'userRecords.recommendedBooks': filteredArr,
      });
    }
    if (collName.includes('HostReview')) {
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
