import { thisYear, existDocObj, thisMonth } from 'util/index';
import { useRecoilState } from 'recoil';
import { getDocument } from 'api/getFbDoc';
import { useEffect, useState } from 'react';
import { fieldHostDocState } from 'data/bookFieldHostAtom';
import { BOOK_FIELD_HOST } from 'constants/index';
import { Label } from 'components/molecules/TableDataItem';
import useHandleFieldHost from 'hooks/useHandleFieldHost';
import Loading from 'components/atoms/Loading';
import BookFieldHostEditForm from 'components/organisms/BookFieldHostEditForm';
import Modal from 'components/atoms/Modal';
import Table from '../molecules/Table';
import TableFolderBtn from 'components/atoms/button/TableFolderBtn';

interface Props {
  isMonth?: boolean;
  isFoldable?: boolean;
  isEditable?: boolean;
}

const BookFieldHostTable = ({
  isMonth = false,
  isEditable = false,
  isFoldable = false,
}: Props) => {
  const [bookFieldHostDoc, setBookFieldHostDoc] =
    useRecoilState(fieldHostDocState);
  const [openTable, setOpenTable] = useState(false);

  const toggleTable = () => setOpenTable((prev) => !prev);

  const {
    editingMonthInfo,
    onEditClick,
    onSubmit,
    selectedValues,
    setSelectedValues,
  } = useHandleFieldHost();

  useEffect(() => {
    if (!existDocObj(bookFieldHostDoc)) {
      getDocument(BOOK_FIELD_HOST, thisYear, setBookFieldHostDoc);
    }
  }, [bookFieldHostDoc]);

  const thisMonthBookFieldAndHost = bookFieldHostDoc.info?.find(
    (doc) => doc.month === +thisMonth
  );

  const labels: Label[] = isMonth
    ? ['월', '독서분야', '발제자']
    : ['독서분야', '발제자'];

  return (
    <>
      {bookFieldHostDoc.info ? (
        <>
          <Table
            labels={labels}
            records={
              openTable ? bookFieldHostDoc.info : [thisMonthBookFieldAndHost]
            }
            onEditClick={onEditClick}
            isFoldable={isFoldable}
            isEditable={isEditable}
          />

          {isFoldable && (
            <TableFolderBtn openTable={openTable} toggleTable={toggleTable} />
          )}
        </>
      ) : (
        <Loading height='70vh' />
      )}

      {editingMonthInfo.isEditing && (
        <Modal
          title={`${editingMonthInfo.month}월 수정하기`}
          onToggleClick={onEditClick}
        >
          <BookFieldHostEditForm
            bookFieldHost={bookFieldHostDoc.info[editingMonthInfo.month - 1]}
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
