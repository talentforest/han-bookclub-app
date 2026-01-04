import { useRecoilValue } from 'recoil';

import { fieldAndHostAtomFamily } from '@/data/fieldAndHostAtom';

import { setDocument } from '@/api';

import { BOOK_FIELD_AND_HOST, getInitialDataObjByMonth } from '@/appConstants';

import { useHandleModal } from '@/hooks';

import { MonthlyFieldAndHost } from '@/types';

import FieldHostEditModal from '@/components/bookClub/FieldHostEditModal';
import Table from '@/components/common/Table';
import { Label } from '@/components/common/TableDataItem';
import EmptyCard from '@/components/common/container/EmptyCard';

interface BookFieldHostTableProps {
  year?: string;
  isMonth?: boolean;
  isEditable?: boolean;
  color?: 'lightBlue' | 'yellow' | 'dark';
}

const BookFieldHostTable = ({
  isMonth = false,
  isEditable = false,
  color = 'lightBlue',
  year,
}: BookFieldHostTableProps) => {
  const { status, data } = useRecoilValue(fieldAndHostAtomFamily(year));

  const { showModal } = useHandleModal();

  const setInitialBookFieldHostInFb = async () => {
    const initialData: MonthlyFieldAndHost = {
      field: '',
      hosts: [],
      detail: '',
    };
    const initialObj =
      getInitialDataObjByMonth<MonthlyFieldAndHost>(initialData);

    setDocument(`BookClub-${year}`, BOOK_FIELD_AND_HOST, initialObj);
  };

  const labels: Label[] = isMonth
    ? ['월', '독서분야', '발제자']
    : ['독서분야', '발제자'];

  const onEditClick = (monthNum?: number) => {
    showModal({
      element: <FieldHostEditModal year={year} monthNum={monthNum} />,
    });
  };

  const rowDataList = Object.entries(data)
    .map(([key, value]: [string, MonthlyFieldAndHost]) => ({
      ...value,
      month: +key.slice(0, -1),
    }))
    .sort((a, b) => a.month - b.month);

  return (
    <>
      {status === 'loaded' &&
        (rowDataList.length !== 0 ? (
          <Table
            color={color}
            labels={labels}
            rowDataList={rowDataList}
            onEditClick={onEditClick}
            isEditable={isEditable}
          />
        ) : (
          <EmptyCard
            text="아직 월별 독서분야와 발제자 정보가 없습니다."
            createBtnTitle={`${year} 독서분야와 발제자 정보 생성`}
            onCreateClick={setInitialBookFieldHostInFb}
          />
        ))}
    </>
  );
};

export default BookFieldHostTable;
