import { fieldHostDocState } from 'data/bookFieldHostAtom';
import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { thisYear } from 'util/index';
import { BOOK_FIELD_HOST } from 'util/index';
import useAlertAskJoin from './useAlertAskJoin';

export interface ChangeSelectValue {
  label: string;
  value: string;
}

export interface SelectValue {
  field: string;
  hosts: string[];
}

const initialValue: SelectValue = { field: '', hosts: [''] };

const useHandleFieldHost = () => {
  const [isEditing, setIsEditing] = useState(new Array(12).fill(false));
  const [fieldHostsDoc, setFieldHostsDoc] = useRecoilState(fieldHostDocState);
  const [selectedValues, setSelectedValues] = useState(initialValue);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('edit');

  const fbDoc = doc(dbService, BOOK_FIELD_HOST, `${thisYear}`);

  const onEditClick = (idx: number) => {
    if (anonymous) return alertAskJoinMember();

    const editedArr = isEditing.map((editItem, index) =>
      index === idx ? !editItem : editItem
    );
    setIsEditing(editedArr);
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    index: number
  ) => {
    event.preventDefault();

    const editedList = fieldHostsDoc.info.map((fieldHost) => {
      const editedObj = { ...fieldHost, ...selectedValues };
      return fieldHost.month === index + 1 ? editedObj : fieldHost;
    });

    const newList = { ...fieldHostsDoc, info: editedList };

    setFieldHostsDoc(newList);
    await updateDoc(fbDoc, newList);
    onEditClick(index);
  };

  return {
    isEditing,
    onSubmit,
    onEditClick,
    selectedValues,
    setSelectedValues,
  };
};

export default useHandleFieldHost;
