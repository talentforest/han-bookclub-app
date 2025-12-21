import { useEffect } from 'react';

import { dbService } from '@/fbase';
import { doc, setDoc } from 'firebase/firestore';

import { useRecoilState } from 'recoil';

import { absenceAtom } from '@/data/absenceAtom';

import { getDocument } from '@/api';

import { ABSENCE_MEMBERS, initialAbsenseMembersData } from '@/appConstants';

import Table from '@/components/common/Table';
import { Label } from '@/components/common/TableDataItem';
import EmptyCard from '@/components/common/container/EmptyCard';

interface AbsenceMemberTableProps {
  isMonth?: boolean;
  isEditable?: boolean;
  year: string;
}

export default function AbsenceMemberTable({
  isMonth,
  isEditable,
  year,
}: AbsenceMemberTableProps) {
  const [absenceList, setAbsenceList] = useRecoilState(absenceAtom(year));

  const collName = `BookClub-${year}`;

  useEffect(() => {
    getDocument(`BookClub-${year}`, ABSENCE_MEMBERS, setAbsenceList);
  }, []);

  const defaultLabels: Label[] = ['일회불참멤버', '모임정지멤버'];

  const labels: Label[] = isMonth ? ['월', ...defaultLabels] : defaultLabels;

  const setInitialAbsenceDataInFb = async () => {
    await setDoc(
      doc(dbService, collName, ABSENCE_MEMBERS),
      initialAbsenseMembersData,
    );
  };

  return (
    <>
      {!!absenceList?.absenceMembers ? (
        <Table
          labels={labels}
          rowDataList={absenceList?.absenceMembers}
          isEditable={isEditable}
        />
      ) : (
        <EmptyCard
          text="아직 월별 불참 정보가 없습니다."
          createBtnTitle={`${year} 새로운 불참 정보 생성하기`}
          onCreateClick={setInitialAbsenceDataInFb}
        />
      )}
    </>
  );
}
