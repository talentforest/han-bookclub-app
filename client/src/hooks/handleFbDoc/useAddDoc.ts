import { useEffect, useState } from 'react';

import { authService, dbService } from '@/fbase';
import { collection, doc, setDoc } from 'firebase/firestore';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { recommendedBookAtom } from '@/data/bookAtom';
import { currAuthUserAtom, userAtomFamily } from '@/data/userAtom';

import { getDocument } from '@/api';

import { USER } from '@/appConstants';

import { useAlertAskJoin } from '@/hooks';

import { existDocObj, formatDate } from '@/utils';

import { Collection, SubCollection } from '@/types';

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

  const [userExtraData, setUserExtraData] = useRecoilState(userAtomFamily(uid));
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

  const onDataChange = async (newData: T) => {
    if (authService.currentUser.isAnonymous) return alertAskJoinMember();
    setNewDocData({ ...newDocData, ...newData });
  };

  return { onAddDocSubmit, onDataChange, newDocData };
};
