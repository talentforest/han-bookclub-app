import { absenceListState } from 'data/absenceAtom';
import { useEffect, useState } from 'react';
import { existDocObj, thisMonth } from 'util/index';
import { ABSENCE_MEMBERS, THIS_YEAR_BOOKCLUB } from 'constants/index';
import { useRecoilState } from 'recoil';
import { getDocument } from 'api/getFbDoc';
import Table from '../molecules/Table';
import TableFolderBtn from 'components/atoms/button/TableFolderBtn';

interface Props {
  isMonth?: boolean;
  isFoldable?: boolean;
  isEditable?: boolean;
}

export default function AbsenceMemberTable({
  isFoldable,
  isMonth,
  isEditable,
}: Props) {
  const [absenceList, setAbsenceList] = useRecoilState(absenceListState);
  const [openTable, setOpenTable] = useState(false);

  const toggleTable = () => setOpenTable((prev) => !prev);

  useEffect(() => {
    if (!existDocObj(absenceList)) {
      getDocument(THIS_YEAR_BOOKCLUB, ABSENCE_MEMBERS, setAbsenceList);
    }
  }, [absenceList]);

  const thisMonthAbsence = absenceList?.absenceMembers?.find(
    (doc) => doc.month === +thisMonth
  );

  return (
    <>
      {thisMonthAbsence && (
        <>
          <Table
            labels={
              isMonth
                ? ['월', '일회불참멤버', '모임정지멤버']
                : ['일회불참멤버', '모임정지멤버']
            }
            records={
              openTable ? absenceList.absenceMembers : [thisMonthAbsence]
            }
            isFoldable={isFoldable}
            isEditable={isEditable}
          />

          {isFoldable && (
            <TableFolderBtn openTable={openTable} toggleTable={toggleTable} />
          )}
        </>
      )}
    </>
  );
}
