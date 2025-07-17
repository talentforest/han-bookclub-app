import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { getDocument } from '@/api/firebase/getFbDoc';
import {
  ABSENCE_MEMBERS,
  BOOKCLUB_THIS_YEAR,
  initialAbsenseMembersData,
} from '@/appConstants';
import Table from '@/components/common/Table';
import { Label } from '@/components/common/TableDataItem';
import EmptyCard from '@/components/common/container/EmptyCard';
import { absenceAtom } from '@/data/absenceAtom';
import { dbService } from '@/fbase';
import { existDocObj, thisYear } from '@/utils';
import { doc, setDoc } from 'firebase/firestore';

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
  const [absenceList, setAbsenceList] = useRecoilState(absenceAtom);

  useEffect(() => {
    if (!existDocObj(absenceList)) {
      getDocument(BOOKCLUB_THIS_YEAR, ABSENCE_MEMBERS, setAbsenceList);
    }
  }, [absenceList]);

  const defaultLabels: Label[] = ['일회불참멤버', '모임정지멤버'];

  const labels: Label[] = isMonth ? ['월', ...defaultLabels] : defaultLabels;

  const setInitialAbsenceDataInFb = async () => {
    await setDoc(
      doc(dbService, BOOKCLUB_THIS_YEAR, ABSENCE_MEMBERS),
      initialAbsenseMembersData,
    );
  };

  return (
    <>
      {!!absenceList?.absenceMembers ? (
        <Table
          color="blue"
          labels={labels}
          recordsOfYear={absenceList?.absenceMembers}
          isFoldable={isFoldable}
          isEditable={isEditable}
        />
      ) : (
        <EmptyCard
          text="아직 월별 불참 정보가 없습니다."
          createBtnTitle={`${thisYear} 새로운 불참 정보 생성하기`}
          onCreateClick={setInitialAbsenceDataInFb}
        />
      )}
    </>
  );
}
