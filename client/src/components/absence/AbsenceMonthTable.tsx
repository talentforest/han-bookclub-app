import { useRecoilValue } from 'recoil';

import { absenceAtom } from '@/data/absenceAtom';

import { useHandleModal } from '@/hooks';

import AbsenceForm from '@/components/absence/AbsenceForm';
import LoopLoading from '@/components/common/LoopLoading';
import Modal from '@/components/common/Modal';
import Table from '@/components/common/Table';

interface AbsenceMonthTableProps {
  year: string;
}

export default function AbsenceMonthTable({ year }: AbsenceMonthTableProps) {
  const { status, data } = useRecoilValue(absenceAtom(year));

  const rowDataList = Object.entries(data || {})
    .map(([key, value]: [string, any]) => ({
      ...value,
      month: +key.slice(0, -1),
    }))
    .sort((a, b) => a.month - b.month);

  const { showModal } = useHandleModal();

  const onEditClick = async (monthNum?: number) => {
    showModal({
      element: (
        <Modal title={`${monthNum}월 모임 불참 여부`}>
          <AbsenceForm year={year} monthNum={monthNum} />
        </Modal>
      ),
    });
  };

  return (
    <>
      {status === 'loaded' &&
        (data ? (
          <Table
            labels={['월', '일회불참', '정지']}
            rowDataList={rowDataList}
            onEditClick={onEditClick}
            isEditable={true}
          />
        ) : (
          <LoopLoading size={150} className="h-[60vh]" />
        ))}
    </>
  );
}
