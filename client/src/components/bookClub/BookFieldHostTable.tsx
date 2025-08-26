import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { getDocument } from '@/api/firebase/getFbDoc';
import { setDocument } from '@/api/firebase/setFbDoc';
import {
  BOOK_FIELD_AND_HOST,
  initialBookFieldAndHostData,
} from '@/appConstants';
import FieldHostEditForm from '@/components/bookClub/FieldHostEditForm';
import Modal from '@/components/common/Modal';
import Table from '@/components/common/Table';
import { Label } from '@/components/common/TableDataItem';
import EmptyCard from '@/components/common/container/EmptyCard';
import { fieldAndHostAtom } from '@/data/fieldAndHostAtom';
import useHandleFieldHost from '@/hooks/useHandleFieldHost';
import { existDocObj, thisYear } from '@/utils';

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
  const [bookFieldHostDoc, setBookFieldHostDoc] =
    useRecoilState(fieldAndHostAtom);

  const {
    editingMonthInfo,
    onEditClick,
    onSubmit,
    selectedValues,
    setSelectedValues,
  } = useHandleFieldHost();

  useEffect(() => {
    if (!existDocObj(bookFieldHostDoc)) {
      getDocument(
        `BookClub-${thisYear}`,
        BOOK_FIELD_AND_HOST,
        setBookFieldHostDoc,
      );
    }
  }, [bookFieldHostDoc]);

  const labels: Label[] = isMonth
    ? ['월', '독서분야', '발제자']
    : ['독서분야', '발제자'];

  const setInitialBookFieldHostInFb = async () => {
    setDocument(
      `BookClub-${thisYear}`,
      BOOK_FIELD_AND_HOST,
      initialBookFieldAndHostData,
    );
  };

  const { bookFieldAndHostList } = bookFieldHostDoc;

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

      {editingMonthInfo.isEditing && (
        <Modal
          title={`${editingMonthInfo.month}월 수정하기`}
          onToggleClick={onEditClick}
        >
          <FieldHostEditForm
            bookFieldHost={bookFieldAndHostList[editingMonthInfo.month - 1]}
            onSubmit={onSubmit}
            month={editingMonthInfo.month}
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
          />
        </Modal>
      )}
    </>
  );
};

export default BookFieldHostTable;
