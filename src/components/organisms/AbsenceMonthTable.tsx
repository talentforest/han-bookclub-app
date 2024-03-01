import { useEffect, useState } from 'react';
import { existDocObj, thisMonth } from 'util/index';
import { getDocument } from 'api/getFbDoc';
import { THIS_YEAR_BOOKCLUB, ABSENCE_MEMBERS } from 'constants/index';
import { absenceListState } from 'data/absenceAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import AbsenceForm from './AbsenceForm';
import Modal from 'components/atoms/Modal';
import TableFolderBtn from 'components/atoms/button/TableFolderBtn';
import Table from 'components/molecules/Table';
import useHandleAbsence from 'hooks/useHandleAbsence';
import { currentUserState } from 'data/userAtom';

export type AbsenceMonthByPersonal = {
  month: number;
  onceAbsenceMonth: boolean;
  breakMonth: boolean;
};

interface Props {
  userId: string;
  isFoldable?: boolean;
}

export default function AbsenceMonthTable({
  userId,
  isFoldable = false,
}: Props) {
  const currentUser = useRecoilValue(currentUserState);
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
      <Table
        labels={
          currentUser.uid === userId
            ? ['월', '일회불참달', '모임정지달', '수정']
            : ['월', '일회불참달', '모임정지달']
        }
        records={openTable ? absenceMonths : [absenceThisMonth]}
        onEditClick={onEditClick}
        isFoldable={isFoldable}
      />
      <TableFolderBtn openTable={openTable} toggleTable={toggleTable} />

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
