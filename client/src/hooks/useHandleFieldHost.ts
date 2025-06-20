import { useState } from 'react';

import { useRecoilState } from 'recoil';

import useAlertAskJoin from './useAlertAskJoin';
import { BOOK_FIELD_AND_HOST } from '@/appConstants';
import { fieldAndHostAtom } from '@/data/fieldAndHostAtom';
import { dbService } from '@/fbase';
import { thisYear } from '@/utils';
import { doc, updateDoc } from 'firebase/firestore';

export interface ChangeSelectValue {
  label: string;
  value: string;
}

export interface SelectValue {
  field: string;
  hosts: string[];
}

const initialModalState = {
  isEditing: false,
  month: 1,
};

const initialFieldHost: SelectValue = { field: '', hosts: [''] };

const useHandleFieldHost = () => {
  const [editingMonthInfo, setEditingMonthInfo] = useState(initialModalState);

  const [selectedValues, setSelectedValues] = useState(initialFieldHost);

  const [fieldHostDoc, setFieldHostDoc] = useRecoilState(fieldAndHostAtom);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('edit');

  const fbDoc = doc(dbService, `BookClub-${thisYear}`, BOOK_FIELD_AND_HOST);

  const onEditClick = (month?: number) => {
    if (anonymous) return alertAskJoinMember();
    if (month) {
      const doc = fieldHostDoc.bookFieldAndHostList.find(
        item => item.month === month,
      );
      setSelectedValues(doc);
    }
    setEditingMonthInfo({ isEditing: !editingMonthInfo.isEditing, month });
  };

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
    editingMonthInfo,
    onSubmit,
    onEditClick,
    selectedValues,
    setSelectedValues,
  };
};

export default useHandleFieldHost;
