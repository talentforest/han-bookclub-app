import { useRecoilValue } from 'recoil';

import { fieldAndHostAtom } from '@/data/fieldAndHostAtom';

import { setDocument } from '@/api';

import {
  BOOK_FIELD_AND_HOST,
  initialBookFieldAndHostData,
} from '@/appConstants';

import { useHandleModal } from '@/hooks';

import { thisYear } from '@/utils';

import FieldHostEditModal from '@/components/bookClub/FieldHostEditModal';
import Table from '@/components/common/Table';
import { Label } from '@/components/common/TableDataItem';
import EmptyCard from '@/components/common/container/EmptyCard';

interface BookFieldHostTableProps {
  isMonth?: boolean;
  isFoldable?: boolean;
  isEditable?: boolean;
}

const BookFieldHostTable = ({
  isMonth = false,
  isEditable = false,
  isFoldable = false,
}: BookFieldHostTableProps) => {
  const { bookFieldAndHostList } = useRecoilValue(fieldAndHostAtom);

  const { showModal } = useHandleModal();

  const onEditClick = (month?: number) => {
    showModal({ element: <FieldHostEditModal month={month} /> });
  };

  const setInitialBookFieldHostInFb = async () => {
    setDocument(
      `BookClub-${thisYear}`,
      BOOK_FIELD_AND_HOST,
      initialBookFieldAndHostData,
    );
  };

  const labels: Label[] = isMonth
    ? ['월', '독서분야', '발제자']
    : ['독서분야', '발제자'];

  return (
    <>
      {!!bookFieldAndHostList ? (
        <Table
          labels={labels}
          recordsOfYear={bookFieldAndHostList}
          onEditClick={onEditClick}
          isFoldable={isFoldable}
          isEditable={isEditable}
        />
      ) : (
        <EmptyCard
          text="아직 월별 독서분야와 발제자 정보가 없습니다."
          createBtnTitle={`${thisYear} 새로운 월별 독서분야와 발제자 정보 생성하기`}
          onCreateClick={setInitialBookFieldHostInFb}
        />
      )}
    </>
  );
};

export default BookFieldHostTable;
