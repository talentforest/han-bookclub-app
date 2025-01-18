import { useState } from 'react';

import { absenceListState } from 'data/absenceAtom';
import { currentUserState } from 'data/userAtom';
import { useRecoilState, useRecoilValue } from 'recoil';

import useAlertAskJoin from './useAlertAskJoin';
import { ABSENCE_MEMBERS, BOOKCLUB_THIS_YEAR } from 'appConstants';
import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';

export interface AbsenceSelectValue {
  month: number;
  breakMonth: boolean;
  onceAbsenceMonth: boolean;
}

const initialModalState = {
  isEditing: false,
  month: 1,
};

const initialAbsence: AbsenceSelectValue = {
  month: 1,
  breakMonth: false,
  onceAbsenceMonth: false,
};

const useHandleAbsence = () => {
  const currentUser = useRecoilValue(currentUserState);
  const [editingMonthInfo, setEditingMonthInfo] = useState(initialModalState);
  const [absenceList, setAbsenceList] = useRecoilState(absenceListState);
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
        member => member === currentUser.uid,
      );
      const isOnceAbsenceMonth = monthInfo?.onceAbsenceMembers?.find(member => {
        return member === currentUser.uid;
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
      return member.includes(currentUser.uid)
        ? member
        : [...member, currentUser.uid];
    }
    return member.filter(member => member !== currentUser.uid);
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

export default useHandleAbsence;
