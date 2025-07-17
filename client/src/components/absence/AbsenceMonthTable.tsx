import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { getDocument } from '@/api/firebase/getFbDoc';
import { ABSENCE_MEMBERS, BOOKCLUB_THIS_YEAR } from '@/appConstants';
import AbsenceForm from '@/components/absence/AbsenceForm';
import Loading from '@/components/common/Loading';
import Modal from '@/components/common/Modal';
import Table from '@/components/common/Table';
import { absenceAtom } from '@/data/absenceAtom';
import useHandleAbsence from '@/hooks/useHandleAbsence';
import { existDocObj } from '@/utils';

export type AbsenceMonthByPersonal = {
  month: number;
  onceAbsenceMonth: boolean;
  breakMonth: boolean;
};

interface Props {
  userId: string;
  isFoldable?: boolean;
  isEditable?: boolean;
}

export default function AbsenceMonthTable({
  userId,
  isFoldable = false,
  isEditable = false,
}: Props) {
  const [absenceList, setAbsenceList] = useRecoilState(absenceAtom);

  const {
    editingMonthInfo,
    onEditClick,
    onSubmit,
    selectedValues,
    setSelectedValues,
  } = useHandleAbsence();

  useEffect(() => {
    if (!existDocObj(absenceList)) {
      getDocument(BOOKCLUB_THIS_YEAR, ABSENCE_MEMBERS, setAbsenceList);
    }
  }, [absenceList]);

  const absenceMonths: AbsenceMonthByPersonal[] =
    absenceList.absenceMembers?.map(
      ({ month, onceAbsenceMembers, breakMembers }) => {
        return {
          month,
          onceAbsenceMonth: onceAbsenceMembers.includes(userId),
          breakMonth: breakMembers.includes(userId),
        };
      },
    );

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

      {editingMonthInfo.isEditing && (
        <Modal
          title={`${editingMonthInfo.month}월 모임 불참 여부`}
          onToggleClick={onEditClick}
        >
          <AbsenceForm
            month={editingMonthInfo.month}
            onSubmit={onSubmit}
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
          />
        </Modal>
      )}
    </>
  );
}
