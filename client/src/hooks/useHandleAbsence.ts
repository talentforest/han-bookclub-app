import { useState } from 'react';

import { dbService } from '@/fbase';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

import { useRecoilValue } from 'recoil';

import { absenceAtom } from '@/data/absenceAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { ABSENCE_MEMBERS } from '@/appConstants';

import { useHandleModal } from '@/hooks';

export const useHandleAbsence = (year: string, monthNum: number) => {
  const {
    data: { uid },
  } = useRecoilValue(currAuthUserAtom);

  const { data: absenceMonthListObj } = useRecoilValue(absenceAtom(year));

  const monthKey = `${monthNum}월`;
  const { breakMembers, onceAbsenceMembers } = absenceMonthListObj[monthKey];

  const isBreakMonth = !!breakMembers.find(id => id === uid);
  const isOnceAbsenceMonth = !!onceAbsenceMembers.find(id => id === uid);

  const [values, setValues] = useState({ isBreakMonth, isOnceAbsenceMonth });

  const { hideModal } = useHandleModal();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const fbDoc = doc(dbService, `BookClub-${year}`, ABSENCE_MEMBERS);

      const {
        isBreakMonth: currIsBreakMonth,
        isOnceAbsenceMonth: currIsOnceAbsenceMonth,
      } = values;

      if (currIsBreakMonth && isBreakMonth) return;
      if (currIsOnceAbsenceMonth && isOnceAbsenceMonth) return;

      await updateDoc(fbDoc, {
        [`${monthKey}.breakMembers`]: currIsBreakMonth
          ? arrayUnion(uid)
          : arrayRemove(uid),
        [`${monthKey}.onceAbsenceMembers`]: currIsOnceAbsenceMonth
          ? arrayUnion(uid)
          : arrayRemove(uid),
      });
    } catch (error) {
      console.log(error);
    } finally {
      hideModal();
    }
  };

  const checkedBoxHandler = (type: '모임 일회 불참' | '모임 정지') => {
    const key = type === '모임 정지' ? 'isBreakMonth' : 'isOnceAbsenceMonth';
    const anotherKey =
      type === '모임 정지' ? 'isOnceAbsenceMonth' : 'isBreakMonth';

    setValues(prev => ({
      ...prev,
      [key]:
        type === '모임 정지' ? !prev.isBreakMonth : !prev.isOnceAbsenceMonth,
      [anotherKey]: false,
    }));
  };

  return {
    onSubmit,
    values,
    setValues,
    checkedBoxHandler,
  };
};
