import { absenceListState } from 'data/absenceAtom';
import { useEffect } from 'react';
import { existDocObj } from 'util/index';
import { ABSENCE_MEMBERS, THIS_YEAR_BOOKCLUB } from 'constants/index';
import { useRecoilState } from 'recoil';
import { getDocument } from 'api/getFbDoc';
import Table from '../molecules/Table';
import Loading from 'components/atoms/Loading';

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

  useEffect(() => {
    if (!existDocObj(absenceList)) {
      getDocument(THIS_YEAR_BOOKCLUB, ABSENCE_MEMBERS, setAbsenceList);
    }
  }, [absenceList]);

  return (
    <>
      {!!absenceList.absenceMembers ? (
        <Table
          labels={
            isMonth
              ? ['월', '일회불참멤버', '모임정지멤버']
              : ['일회불참멤버', '모임정지멤버']
          }
          records={absenceList.absenceMembers}
          isFoldable={isFoldable}
          isEditable={isEditable}
        />
      ) : (
        <Loading height='10vh' />
      )}
    </>
  );
}
