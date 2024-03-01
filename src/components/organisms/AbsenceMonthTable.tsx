import { useEffect, useState } from 'react';
import { existDocObj, thisMonth } from 'util/index';
import { getDocument } from 'api/getFbDoc';
import { THIS_YEAR_BOOKCLUB, ABSENCE_MEMBERS } from 'constants/index';
import { absenceListState } from 'data/absenceAtom';
import { useRecoilState } from 'recoil';
import AbsenceForm from './AbsenceForm';
import Modal from 'components/atoms/Modal';
import TableFolderBtn from 'components/atoms/button/TableFolderBtn';
import Table from 'components/molecules/Table';
import useHandleAbsence from 'hooks/useHandleAbsence';

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
  const [openTable, setOpenTable] = useState(false);

  const {
    editingMonthInfo,
    onEditClick,
    onSubmit,
    selectedValues,
    setSelectedValues,
  } = useHandleAbsence();

  const toggleTable = () => setOpenTable((prev) => !prev);

  useEffect(() => {
    if (!existDocObj(absenceList)) {
      getDocument(THIS_YEAR_BOOKCLUB, ABSENCE_MEMBERS, setAbsenceList);
    }
    if (isEditable) {
      setOpenTable(true);
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
      }
    );

  const absenceThisMonth = absenceMonths?.find(
    (doc) => doc.month === +thisMonth
  );

  return (
    <>
      {absenceMonths && (
        <Table
          labels={
            isEditable
              ? ['월', '일회불참', '모임정지', '수정']
              : ['월', '일회불참', '모임정지']
          }
          records={openTable ? absenceMonths : [absenceThisMonth]}
          onEditClick={onEditClick}
          isFoldable={isFoldable}
        />
      )}

      {isFoldable && (
        <TableFolderBtn openTable={openTable} toggleTable={toggleTable} />
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
