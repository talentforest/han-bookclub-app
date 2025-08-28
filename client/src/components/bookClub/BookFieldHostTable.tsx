import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { fieldAndHostAtom } from '@/data/fieldAndHostAtom';

import { getDocument, setDocument } from '@/api';

import {
  BOOK_FIELD_AND_HOST,
  initialBookFieldAndHostData,
} from '@/appConstants';

import { useHandleFieldHost, useHandleModal } from '@/hooks';

import { existDocObj, thisYear } from '@/utils';

import FieldHostEditForm from '@/components/bookClub/FieldHostEditForm';
import Modal from '@/components/common/Modal';
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
  const [bookFieldHostDoc, setBookFieldHostDoc] =
    useRecoilState(fieldAndHostAtom);

  const {
    onSubmit,
    selectedValues,
    setSelectedValues, //
  } = useHandleFieldHost();

  const { showModal } = useHandleModal();

  const onEditClick = (month?: number) => {
    if (month) {
      const doc = bookFieldHostDoc.bookFieldAndHostList.find(
        item => item.month === month,
      );
      setSelectedValues(doc);
    }
    showModal({
      element: (
        <Modal title={`${month}월 수정하기`}>
          <FieldHostEditForm
            bookFieldHost={bookFieldAndHostList[month - 1]}
            onSubmit={onSubmit}
            month={month}
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
          />
        </Modal>
      ),
    });
  };

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
    </>
  );
};

export default BookFieldHostTable;
