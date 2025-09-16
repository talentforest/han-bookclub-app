import { useEffect, useState } from 'react';

import { dbService } from '@/fbase';
import { doc, updateDoc } from 'firebase/firestore';

import { useRecoilState } from 'recoil';

import { fieldAndHostAtom } from '@/data/fieldAndHostAtom';

import { getDocument } from '@/api';

import { BOOK_FIELD_AND_HOST } from '@/appConstants';

import { useAlertAskJoin, useHandleErrorMsg, useHandleModal } from '@/hooks';

import { existDocObj, thisYear } from '@/utils';

import { MonthlyFieldAndHost } from '@/types';

export const useHandleFieldHost = () => {
  const [selectedValues, setSelectedValues] =
    useState<MonthlyFieldAndHost | null>(null);

  const [fieldHostDoc, setFieldHostDoc] = useRecoilState(fieldAndHostAtom);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('edit');

  const { bookFieldAndHostList: fieldAndHostList } = fieldHostDoc;

  const fbDoc = doc(dbService, `BookClub-${thisYear}`, BOOK_FIELD_AND_HOST);

  const { errorMsg, handleErrorMsg } = useHandleErrorMsg();

  const { hideModal } = useHandleModal();

  const errorMsgObj = {
    field: [
      {
        condition: selectedValues?.field === '',
        error: '독서분야가 선택되지 않았습니다.',
      },
    ],
    hosts: [
      {
        condition: selectedValues?.hosts.length === 0,
        error: '발제자를 한명 이상 선택해주세요.',
      },
    ],
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    month: number,
  ) => {
    event.preventDefault();

    if (anonymous) return alertAskJoinMember();

    const hasError = handleErrorMsg(errorMsgObj);
    if (hasError) return;

    const editedList = fieldAndHostList.map(fieldHost => {
      const editedObj = { ...fieldHost, ...selectedValues };
      return fieldHost.month === month ? editedObj : fieldHost;
    });

    const newList = { ...fieldHostDoc, bookFieldAndHostList: editedList };
    setFieldHostDoc(newList);
    await updateDoc(fbDoc, newList);
    hideModal();
  };

  useEffect(() => {
    if (!existDocObj(fieldAndHostList)) {
      getDocument(`BookClub-${thisYear}`, BOOK_FIELD_AND_HOST, setFieldHostDoc);
    }
  }, [fieldHostDoc]);

  return {
    fieldAndHostList,
    onSubmit,
    selectedValues,
    setSelectedValues,
    errorMsg,
  };
};
