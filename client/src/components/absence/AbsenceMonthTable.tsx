import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { absenceAtom } from '@/data/absenceAtom';

import { getDocument } from '@/api';

import { ABSENCE_MEMBERS, BOOKCLUB_THIS_YEAR } from '@/appConstants';

import { useHandleModal } from '@/hooks';

import { existDocObj } from '@/utils';

import { UserAbsence } from '@/types';

import AbsenceForm from '@/components/absence/AbsenceForm';
import Loading from '@/components/common/Loading';
import Modal from '@/components/common/Modal';
import Table from '@/components/common/Table';

interface AbsenceMonthTableProps {
  userId: string;
  isEditable?: boolean;
}

export default function AbsenceMonthTable({
  userId,
  isEditable = false,
}: AbsenceMonthTableProps) {
  const [absenceList, setAbsenceList] = useRecoilState(absenceAtom);

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

  const onEditClick = async (month?: number) => {
    showModal({
      element: (
        <Modal title={`${month}월 모임 불참 여부`}>
          <AbsenceForm month={month} />
        </Modal>
      ),
    });
  };

  return (
    <>
      {absenceList ? (
        <Table
          labels={['월', '일회불참', '모임정지']}
          rowDataList={absenceMonths}
          onEditClick={onEditClick}
          isEditable={isEditable}
        />
      ) : (
        <Loading className="h-[40vh]" />
      )}
    </>
  );
}
