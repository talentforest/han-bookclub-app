import { fieldHostDocState } from 'data/bookFieldHostAtom';
import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { thisYear } from 'util/index';
import { BOOK_FIELD_HOST } from 'constants/index';
import useAlertAskJoin from './useAlertAskJoin';

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

const initialfFieldHost: SelectValue = { field: '', hosts: [''] };

const useHandleFieldHost = () => {
  const [editingMonthInfo, setEditingMonthInfo] = useState(initialModalState);
  const [selectedValues, setSelectedValues] = useState(initialfFieldHost);
  const [fieldHostDoc, setFieldHostDoc] = useRecoilState(fieldHostDocState);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('edit');

  const fbDoc = doc(dbService, BOOK_FIELD_HOST, thisYear);

  const onEditClick = (month?: number) => {
    if (anonymous) return alertAskJoinMember();
    if (month) {
      const doc = fieldHostDoc.info.find((item) => item.month === month);
      setSelectedValues(doc);
    }
    setEditingMonthInfo({ isEditing: !editingMonthInfo.isEditing, month });
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    month: number
  ) => {
    event.preventDefault();

    const editedList = fieldHostDoc.info.map((fieldHost) => {
      const editedObj = { ...fieldHost, ...selectedValues };
      return fieldHost.month === month ? editedObj : fieldHost;
    });

    const newList = { ...fieldHostDoc, info: editedList };

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
