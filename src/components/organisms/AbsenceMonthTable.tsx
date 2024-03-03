import { useEffect } from 'react';
import { existDocObj } from 'util/index';
import { getDocument } from 'api/getFbDoc';
import { THIS_YEAR_BOOKCLUB, ABSENCE_MEMBERS } from 'constants/index';
import { absenceListState } from 'data/absenceAtom';
import { useRecoilState } from 'recoil';
import AbsenceForm from './AbsenceForm';
import Modal from 'components/atoms/Modal';
import Table from 'components/molecules/Table';
import useHandleAbsence from 'hooks/useHandleAbsence';
import Loading from 'components/atoms/Loading';

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

  return (
    <>
      {!!absenceMonths?.length ? (
        <Table
          labels={['월', '일회불참', '모임정지']}
          records={absenceMonths}
          onEditClick={onEditClick}
          isFoldable={isFoldable}
          isEditable={isEditable}
        />
      ) : (
        <Loading height='40vh' />
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
