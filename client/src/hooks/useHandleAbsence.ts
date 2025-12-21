import { useState } from 'react';

import { dbService } from '@/fbase';
import { doc, updateDoc } from 'firebase/firestore';

import { useRecoilState, useRecoilValue } from 'recoil';

import { absenceAtom } from '@/data/absenceAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { ABSENCE_MEMBERS, BOOKCLUB_THIS_YEAR } from '@/appConstants';

import { useHandleModal } from '@/hooks';

import { UserAbsence } from '@/types';

const initialAbsence: UserAbsence = {
  month: 1,
  breakMonth: false,
  onceAbsenceMonth: false,
};

export const useHandleAbsence = (year: string) => {
  const { uid } = useRecoilValue(currAuthUserAtom);

  const [absenceList, setAbsenceList] = useRecoilState(absenceAtom(year));

  const [selectedValues, setSelectedValues] = useState(initialAbsence);

  const fbDoc = doc(dbService, BOOKCLUB_THIS_YEAR, ABSENCE_MEMBERS);

  const handleMember = (member: string[], checked: boolean) => {
    if (checked) {
      return member.includes(uid) ? member : [...member, uid];
    }
    return member.filter(member => member !== uid);
  };

  const { hideModal } = useHandleModal();

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
    hideModal();
  };

  return {
    onSubmit,
    selectedValues,
    setSelectedValues,
  };
};
