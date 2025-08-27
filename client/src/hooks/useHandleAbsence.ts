import { useState } from 'react';

import { dbService } from '@/fbase';
import { doc, updateDoc } from 'firebase/firestore';

import { useRecoilState, useRecoilValue } from 'recoil';

import { absenceAtom } from '@/data/absenceAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { ABSENCE_MEMBERS, BOOKCLUB_THIS_YEAR } from '@/appConstants';

import { useAlertAskJoin } from '@/hooks';

import { UserAbsence } from '@/types';

const initialModalState = {
  isEditing: false,
  month: 1,
};

const initialAbsence: UserAbsence = {
  month: 1,
  breakMonth: false,
  onceAbsenceMonth: false,
};

export const useHandleAbsence = () => {
  const { uid } = useRecoilValue(currAuthUserAtom);
  const [editingMonthInfo, setEditingMonthInfo] = useState(initialModalState);
  const [absenceList, setAbsenceList] = useRecoilState(absenceAtom);
  const [selectedValues, setSelectedValues] = useState(initialAbsence);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('edit');

  const fbDoc = doc(dbService, BOOKCLUB_THIS_YEAR, ABSENCE_MEMBERS);

  const onEditClick = async (month?: number) => {
    if (anonymous) return alertAskJoinMember();

    if (month) {
      const monthInfo = absenceList.absenceMembers?.find(
        item => item.month === month,
      );
      const isBreakMonth = monthInfo?.breakMembers?.find(
        member => member === uid,
      );
      const isOnceAbsenceMonth = monthInfo?.onceAbsenceMembers?.find(member => {
        return member === uid;
      });
      setSelectedValues({
        month,
        breakMonth: !!isBreakMonth,
        onceAbsenceMonth: !!isOnceAbsenceMonth,
      });
    }
    setEditingMonthInfo({ isEditing: !editingMonthInfo.isEditing, month });
  };

  const handleMember = (member: string[], checked: boolean) => {
    if (checked) {
      return member.includes(uid) ? member : [...member, uid];
    }
    return member.filter(member => member !== uid);
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    month: number,
  ) => {
    event.preventDefault();

    const { onceAbsenceMonth, breakMonth } = selectedValues;

    const editedList = absenceList.absenceMembers.map(absence => {
      const { breakMembers, onceAbsenceMembers } = absence;

      const editedObj = {
        ...absence,
        breakMembers: handleMember(breakMembers, breakMonth),
        onceAbsenceMembers: handleMember(onceAbsenceMembers, onceAbsenceMonth),
      };

      return absence.month === month ? editedObj : absence;
    });

    const newList = { ...absenceList, absenceMembers: editedList };
    setAbsenceList(newList);

    await updateDoc(fbDoc, { absenceMembers: editedList });
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
