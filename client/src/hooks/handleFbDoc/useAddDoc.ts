import { useEffect } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import useAlertAskJoin from '../useAlertAskJoin';
import { getDocument } from '@/api/firebase/getFbDoc';
import { USER } from '@/appConstants';
import { recommendedBookAtom } from '@/data/bookAtom';
import { currAuthUserAtom, userDocAtomFamily } from '@/data/userAtom';
import { authService, dbService } from '@/fbase';
import { UserPost, UserPostDocId } from '@/types';
import { existDocObj, thisYearMonthId } from '@/utils';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';

interface UseAddDocProps {
  setText: (text: string) => void;
  collName: string;
  docData: UserPost;
}

const useAddDoc = ({ setText, collName, docData }: UseAddDocProps) => {
  const { uid } = useRecoilValue(currAuthUserAtom);
  const [userExtraData, setUserExtraData] = useRecoilState(
    userDocAtomFamily(uid),
  );
  const setMyRecommendBook = useSetRecoilState(recommendedBookAtom);

  const docRef = doc(collection(dbService, collName));
  const userDataRef = doc(dbService, USER, `${uid}`);

  const { alertAskJoinMember } = useAlertAskJoin('write');

  useEffect(() => {
    if (uid && !existDocObj(userExtraData)) {
      getDocument(USER, uid, setUserExtraData);
    }
  }, [uid]);

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

  const updateUserData = async (newUserDocId: UserPostDocId) => {
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
