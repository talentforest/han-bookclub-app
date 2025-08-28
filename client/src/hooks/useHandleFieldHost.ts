import { useState } from 'react';

import { dbService } from '@/fbase';
import { doc, updateDoc } from 'firebase/firestore';

import { useRecoilState } from 'recoil';

import { fieldAndHostAtom } from '@/data/fieldAndHostAtom';

import { BOOK_FIELD_AND_HOST } from '@/appConstants';

import { useAlertAskJoin } from '@/hooks';

import { thisYear } from '@/utils';

import { MonthlyFieldAndHost } from '@/types';

const initialFieldHost: Pick<MonthlyFieldAndHost, 'field' | 'hosts'> = {
  field: '',
  hosts: [''],
};

export const useHandleFieldHost = () => {
  const [selectedValues, setSelectedValues] = useState(initialFieldHost);

  const [fieldHostDoc, setFieldHostDoc] = useRecoilState(fieldAndHostAtom);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('edit');

  const onEditClick = (month?: number) => {
    if (anonymous) return alertAskJoinMember();
    if (month) {
      const doc = fieldHostDoc.bookFieldAndHostList.find(
        item => item.month === month,
      );
      setSelectedValues(doc);
    }
    // showModal({ isEditing: !editingMonthInfo.isEditing, month });
    // showModal({ element: <span>hi</span> });
  };

  const fbDoc = doc(dbService, `BookClub-${thisYear}`, BOOK_FIELD_AND_HOST);

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    month: number,
  ) => {
    event.preventDefault();

    const editedList = fieldHostDoc.bookFieldAndHostList.map(fieldHost => {
      const editedObj = { ...fieldHost, ...selectedValues };
      return fieldHost.month === month ? editedObj : fieldHost;
    });

    const newList = { ...fieldHostDoc, bookFieldAndHostList: editedList };
    setFieldHostDoc(newList);
    await updateDoc(fbDoc, newList);
    onEditClick(month);
  };

  return {
    onSubmit,
    selectedValues,
    setSelectedValues,
  };
};
