import { getDocument } from 'api/getFbDoc';
import { recommendBookState } from 'data/bookAtom';
import { IDocument } from 'data/documentsAtom';
import {
  currentUserState,
  IUserPostDocId,
  userExtraInfoState,
} from 'data/userAtom';
import { authService, dbService } from 'fbase';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { thisYearMonthId, existDocObj } from 'util/index';
import { USER_DATA } from 'constants/index';
import useAlertAskJoin from '../useAlertAskJoin';

interface PropsType {
  setText: (text: string) => void;
  collName: string;
  docData: IDocument;
}

const useAddDoc = ({ setText, collName, docData }: PropsType) => {
  const [userExtraData, setUserExtraData] = useRecoilState(userExtraInfoState);
  const setMyRecommendBook = useSetRecoilState(recommendBookState);
  const userData = useRecoilValue(currentUserState);

  const docRef = doc(collection(dbService, collName));
  const userDataRef = doc(dbService, USER_DATA, `${userData.uid}`);

  const { alertAskJoinMember } = useAlertAskJoin('write');

  useEffect(() => {
    if (userData.uid && !existDocObj(userExtraData)) {
      getDocument(USER_DATA, userData.uid, setUserExtraData);
    }
  }, [userData.uid]);

  const onAddDocSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (docData.text.length === 0) return;

      await setDoc(docRef, docData);

      const newUserDocId = {
        monthId: thisYearMonthId,
        docId: docRef.id,
      };

      updateUserData(newUserDocId);

      if (docData?.recommendedBook?.title) {
        setMyRecommendBook({
          thumbnail: '',
          title: '',
          authors: [],
          url: '',
          publisher: '',
        });
      }
    } catch (error) {
      console.error('Error adding document:', error);
    }
    setText('');
  };

  const updateUserData = async (newUserDocId: IUserPostDocId) => {
    if (collName.includes('Sentence')) {
      await updateDoc(userDataRef, {
        'userRecords.sentences': [
          ...(userExtraData?.userRecords?.sentences ?? []),
          newUserDocId,
        ],
      });
    }

    if (collName.includes('Reviews')) {
      await updateDoc(userDataRef, {
        'userRecords.reviews': [
          ...(userExtraData?.userRecords?.reviews ?? []),
          newUserDocId,
        ],
      });
    }
    if (collName.includes('Subjects')) {
      await updateDoc(userDataRef, {
        'userRecords.subjects': [
          ...(userExtraData?.userRecords?.subjects ?? []),
          newUserDocId,
        ],
      });
    }
    if (collName.includes('RecommendedBooks')) {
      await updateDoc(userDataRef, {
        'userRecords.recommendedBooks': [
          ...(userExtraData?.userRecords?.recommendedBooks ?? []),
          { monthId: thisYearMonthId, docId: docRef.id },
        ],
      });
    }
    if (collName.includes('HostReview')) {
      await updateDoc(userDataRef, {
        'userRecords.hostReviews': [
          ...(userExtraData?.userRecords?.hostReviews ?? []),
          newUserDocId,
        ],
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
