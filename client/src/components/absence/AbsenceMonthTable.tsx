import { useEffect } from 'react';

import useHandleAbsence from 'hooks/useHandleAbsence';

import { getDocument } from 'api/firebase/getFbDoc';

import { absenceListState } from 'data/absenceAtom';
import { useRecoilState } from 'recoil';

import AbsenceForm from './AbsenceForm';
import { ABSENCE_MEMBERS, BOOKCLUB_THIS_YEAR } from 'appConstants';
import { existDocObj } from 'utils';

import Loading from 'components/common/Loading';
import Modal from 'components/common/Modal';
import Table from 'components/common/Table';

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
  const [absenceList, setAbsenceList] = useRecoilState(absenceListState);

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
      {absenceMonths?.length ? (
        <Table
          color="blue"
          labels={['월', '일회불참', '모임정지']}
          records={absenceMonths}
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
