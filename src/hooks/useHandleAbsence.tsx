import { absenceListState } from 'data/absenceAtom';
import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ABSENCE_MEMBERS, THIS_YEAR_BOOKCLUB } from 'constants/index';
import { currentUserState } from 'data/userAtom';
import useAlertAskJoin from './useAlertAskJoin';

export interface AbsenceSelectValue {
  month: number;
  breakMonth: boolean;
  onceAbsenceMonth: boolean;
}

// export interface Absence {
//   month: number;
//   breakMembers: string[];
//   onceAbsenceMembers: string[];
// }

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

  const fbDoc = doc(dbService, THIS_YEAR_BOOKCLUB, ABSENCE_MEMBERS);

  const onEditClick = async (month?: number) => {
    if (anonymous) return alertAskJoinMember();

    if (month) {
      const monthInfo = absenceList.absenceMembers?.find(
        (item) => item.month === month
      );
      const isBreakMonth = monthInfo?.breakMembers?.find(
        (member) => member === currentUser.uid
      );
      const isOnceAbsenceMonth = monthInfo?.onceAbsenceMembers?.find(
        (member) => {
          return member === currentUser.uid;
        }
      );
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
      return [...member, currentUser.uid];
    } else {
      return member.filter((member) => member !== currentUser.uid);
    }
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    month: number
  ) => {
    event.preventDefault();

    const { onceAbsenceMonth, breakMonth } = selectedValues;

    const editedList = absenceList.absenceMembers.map((absence) => {
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
