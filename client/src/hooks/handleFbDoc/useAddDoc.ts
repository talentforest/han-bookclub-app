import { useState } from 'react';

import { authService, dbService } from '@/fbase';
import { collection, doc, setDoc } from 'firebase/firestore';

import { useSetRecoilState } from 'recoil';

import { initialRecommendedBook, recommendedBookAtom } from '@/data/bookAtom';

import { RECOMMENDED_BOOKS } from '@/appConstants';

import { useAlertAskJoin } from '@/hooks';

import { formatDate } from '@/utils';

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

  const setMyRecommendBook = useSetRecoilState(recommendedBookAtom);

  const { alertAskJoinMember } = useAlertAskJoin('write');

  const docRef = doc(collection(dbService, collName));

  const onAddDocSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (newDocData.text.length === 0) return;

      await setDoc(docRef, {
        ...newDocData,
        createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      });

      if (collName.includes(RECOMMENDED_BOOKS)) {
        setMyRecommendBook(initialRecommendedBook);
      }

      setNewDocData(initialDocData);
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
