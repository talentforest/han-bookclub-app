import { absenceListState } from 'data/absenceAtom';
import { useEffect } from 'react';
import { existDocObj, thisYear } from 'util/index';
import { ABSENCE_MEMBERS, THIS_YEAR_BOOKCLUB } from 'constants/index';
import { useRecoilState } from 'recoil';
import { getDocument } from 'api/getFbDoc';
import { Label } from 'components/molecules/TableDataItem';
import Table from '../molecules/Table';
import { doc, setDoc } from 'firebase/firestore';
import { dbService } from 'fbase';
import { initialAbsenseMembersData } from 'constants/initialData';
import EmptyContainer from 'components/atoms/container/EmptyContainer';

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

  const defaultLabels: Label[] = ['일회불참멤버', '모임정지멤버'];

  const labels: Label[] = isMonth ? ['월', ...defaultLabels] : defaultLabels;

  const setInitialAbsenceDataInFb = async () => {
    await setDoc(
      doc(dbService, THIS_YEAR_BOOKCLUB, ABSENCE_MEMBERS),
      initialAbsenseMembersData
    );
  };

  return (
    <>
      {!!absenceList.absenceMembers ? (
        <Table
          color='blue'
          labels={labels}
          records={absenceList.absenceMembers}
          isFoldable={isFoldable}
          isEditable={isEditable}
        />
      ) : (
        <EmptyContainer
          createBtnTitle={`${thisYear} 새로운 불참 정보 생성하기`}
          onCreateClick={setInitialAbsenceDataInFb}
        >
          <span>아직 월별 불참 정보가 없습니다.</span>
        </EmptyContainer>
      )}
    </>
  );
}
