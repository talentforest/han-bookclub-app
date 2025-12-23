import { useRecoilValue } from 'recoil';

import { fieldAndHostAtomFamily } from '@/data/fieldAndHostAtom';

import { setDocument } from '@/api';

import { BOOK_FIELD_AND_HOST } from '@/appConstants';

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
  color?: 'lightBlue' | 'yellow';
}

const BookFieldHostTable = ({
  isMonth = false,
  isEditable = false,
  color = 'lightBlue',
  year,
}: BookFieldHostTableProps) => {
  const { id, ...thisYearFieldAndHostObj } = useRecoilValue(
    fieldAndHostAtomFamily(year),
  );

  const { showModal } = useHandleModal();

  const setInitialBookFieldHostInFb = async () => {
    const monthlyObj = Object.fromEntries(
      Array.from({ length: 12 }, (_, i) => [
        `${i + 1}월`,
        { detail: '', hosts: [], field: '' } as MonthlyFieldAndHost,
      ]),
    );

    setDocument(`BookClub-${year}`, BOOK_FIELD_AND_HOST, monthlyObj);
  };

  const labels: Label[] = isMonth
    ? ['월', '독서분야', '발제자']
    : ['독서분야', '발제자'];

  const onEditClick = (month?: number) => {
    showModal({ element: <FieldHostEditModal year={year} month={month} /> });
  };

  const rowDataList = Object.entries(thisYearFieldAndHostObj)
    .map(([key, value]: [string, MonthlyFieldAndHost]) => ({
      ...value,
      month: +key.slice(0, -1),
    }))
    .sort((a, b) => a.month - b.month);

  return (
    <>
      {rowDataList.length !== 0 ? (
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
      )}
    </>
  );
};

export default BookFieldHostTable;
