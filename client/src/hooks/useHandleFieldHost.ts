import { useState } from 'react';

import { dbService } from '@/fbase';
import { doc, updateDoc } from 'firebase/firestore';

import { useRecoilValue } from 'recoil';

import { fieldAndHostAtomFamily } from '@/data/fieldAndHostAtom';

import { BOOK_FIELD_AND_HOST } from '@/appConstants';

import { useAlertAskJoin, useHandleErrorMsg, useHandleModal } from '@/hooks';

import { MonthlyFieldAndHost } from '@/types';

interface UseHandleFieldHostProps {
  year: string;
  monthKey: string;
}
export const useHandleFieldHost = ({
  year,
  monthKey,
}: UseHandleFieldHostProps) => {
  const { id, ...fieldAndHostObj } = useRecoilValue(
    fieldAndHostAtomFamily(year),
  );

  const fieldAndHost = fieldAndHostObj[monthKey];

  const [selectedValues, setSelectedValues] =
    useState<MonthlyFieldAndHost | null>(fieldAndHost);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('edit');

  const { hideModal } = useHandleModal();

  const { errorMsg, handleErrorMsg } = useHandleErrorMsg();

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

  const fbDoc = doc(dbService, `BookClub-${year}`, BOOK_FIELD_AND_HOST);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (anonymous) return alertAskJoinMember();

    const hasError = handleErrorMsg(errorMsgObj);
    if (hasError) return;

    const newMonthData = { [monthKey]: selectedValues };

    await updateDoc(fbDoc, newMonthData);

    hideModal();
  };

  return {
    fieldAndHostObj,
    fieldAndHost,
    onSubmit,
    selectedValues,
    setSelectedValues,
    errorMsg,
  };
};
