import { getDocument } from 'api/getFbDoc';
import { IDocument } from 'data/documentsAtom';
import {
  currentUserState,
  IUserRecord,
  userExtraInfoState,
} from 'data/userAtom';
import { authService, dbService } from 'fbase';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { thisYearMonthIso, USER_DATA } from 'util/index';
import useAlertAskJoin from '../useAlertAskJoin';

interface PropsType {
  setText: (text: string) => void;
  collectionName: string;
  docData: IDocument;
}

const useAddDoc = ({ setText, collectionName, docData }: PropsType) => {
  const { alertAskJoinMember } = useAlertAskJoin('write');
  const [userExtraData, setUserExtraData] = useRecoilState(userExtraInfoState);
  const docRef = doc(collection(dbService, collectionName));
  const userData = useRecoilValue(currentUserState);

  const userDataRef = doc(dbService, USER_DATA, `${userData.uid}`);
  const existUserExtraData = Object.keys(userExtraData).length;

  useEffect(() => {
    if (userData.uid && !existUserExtraData) {
      getDocument(USER_DATA, userData.uid, setUserExtraData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.uid]);

  const onAddDocSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (docData.text.length === 0) return;
      await setDoc(docRef, docData);
      const newUserDocId = {
        monthId: thisYearMonthIso,
        docId: docRef.id,
      };
      updateUserData(newUserDocId);
    } catch (error) {
      console.error('Error adding document:', error);
    }
    setText('');
  };

  const updateUserData = async (newUserDocId: IUserRecord) => {
    const { reviews, subjects, recommendedBooks, hostReviews } =
      userExtraData.userRecords;

    if (collectionName.includes('Reviews')) {
      await updateDoc(userDataRef, {
        'userRecords.reviews': [...(reviews ?? []), newUserDocId],
      });
    }
    if (collectionName.includes('Subjects')) {
      await updateDoc(userDataRef, {
        'userRecords.subjects': [...(subjects ?? []), newUserDocId],
      });
    }
    if (collectionName.includes('RecommendedBooks')) {
      await updateDoc(userDataRef, {
        'userRecords.recommendedBooks': [
          ...(recommendedBooks ?? []),
          { monthId: thisYearMonthIso, docId: docRef.id },
        ],
      });
    }
    if (collectionName.includes('HostReview')) {
      await updateDoc(userDataRef, {
        'userRecords.hostReviews': [...(hostReviews ?? []), newUserDocId],
      });
    }
  };

  function onChange(event: React.FormEvent<HTMLTextAreaElement>) {
    if (authService.currentUser.isAnonymous) return alertAskJoinMember();
    setText(event.currentTarget.value);
  }

  return { onAddDocSubmit, onChange };
};

export default useAddDoc;
