import { useEffect, useState } from 'react';

import { authService, dbService } from '@/fbase';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { recommendedBookAtom } from '@/data/bookAtom';
import { currAuthUserAtom, userDocAtomFamily } from '@/data/userAtom';

import { getDocument } from '@/api';

import { USER } from '@/appConstants';

import { useAlertAskJoin } from '@/hooks';

import { existDocObj, formatDate, thisYearMonthId } from '@/utils';

import { Collection, SubCollection, UserRecordId } from '@/types';

interface UseAddDocProps<T> {
  collName: Collection | SubCollection;
  initialDocData: T;
}

export const useAddDoc = <T extends { [key in string]: any }>({
  collName,
  initialDocData,
}: UseAddDocProps<T>) => {
  const [newDocData, setNewDocData] = useState<T>(initialDocData);

  const { uid } = useRecoilValue(currAuthUserAtom);

  const [userExtraData, setUserExtraData] = useRecoilState(
    userDocAtomFamily(uid),
  );
  const setMyRecommendBook = useSetRecoilState(recommendedBookAtom);

  const { alertAskJoinMember } = useAlertAskJoin('write');

  useEffect(() => {
    if (uid && !existDocObj(userExtraData)) {
      getDocument(USER, uid, setUserExtraData);
    }
  }, [uid]);

  const docRef = doc(collection(dbService, collName));

  const onAddDocSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (newDocData.text.length === 0) return;

      await setDoc(docRef, {
        ...newDocData,
        createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      });

      const newUserDocId = {
        monthId: thisYearMonthId,
        docId: docRef.id,
      };

      updateUserData(newUserDocId);

      if (newDocData?.recommendedBook) {
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
  };

  const updateUserData = async (newUserDocId: UserRecordId) => {
    const userDataRef = doc(dbService, USER, uid);

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

  const onDataChange = async (newData: T) => {
    if (authService.currentUser.isAnonymous) return alertAskJoinMember();
    setNewDocData({ ...newDocData, ...newData });
  };

  return { onAddDocSubmit, onDataChange, newDocData };
};
