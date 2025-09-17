import { useEffect } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { absenceAtom } from '@/data/absenceAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { getDocument } from '@/api';

import { ABSENCE_MEMBERS, BOOKCLUB_THIS_YEAR } from '@/appConstants';

import { useHandleAbsence, useHandleModal } from '@/hooks';

import { existDocObj } from '@/utils';

import { UserAbsence } from '@/types';

import AbsenceForm from '@/components/absence/AbsenceForm';
import Loading from '@/components/common/Loading';
import Modal from '@/components/common/Modal';
import Table from '@/components/common/Table';

interface AbsenceMonthTableProps {
  userId: string;
  isFoldable?: boolean;
  isEditable?: boolean;
}

export default function AbsenceMonthTable({
  userId,
  isFoldable = false,
  isEditable = false,
}: AbsenceMonthTableProps) {
  const { uid } = useRecoilValue(currAuthUserAtom);
  const [absenceList, setAbsenceList] = useRecoilState(absenceAtom);

  const { onSubmit, selectedValues, setSelectedValues } = useHandleAbsence();

  useEffect(() => {
    if (!existDocObj(absenceList)) {
      getDocument(BOOKCLUB_THIS_YEAR, ABSENCE_MEMBERS, setAbsenceList);
    }
  }, [absenceList]);

  const absenceMonths: UserAbsence[] = absenceList?.absenceMembers?.map(
    ({ month, onceAbsenceMembers, breakMembers }) => {
      return {
        month,
        onceAbsenceMonth: onceAbsenceMembers.includes(userId),
        breakMonth: breakMembers.includes(userId),
      };
    },
  );

  const { showModal } = useHandleModal();

  const onEditClick = (month?: number) => {
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
    showModal({
      element: (
        <Modal title={`${month}월 모임 불참 여부`}>
          <AbsenceForm
            month={month}
            onSubmit={onSubmit}
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
          />
        </Modal>
      ),
    });
  };

  return (
    <>
      {absenceList ? (
        <Table
          color="blue"
          labels={['월', '일회불참', '모임정지']}
          recordsOfYear={absenceMonths}
          onEditClick={onEditClick}
          isFoldable={isFoldable}
          isEditable={isEditable}
        />
      ) : (
        <Loading className="h-[40vh]" />
      )}
    </>
  );
}
