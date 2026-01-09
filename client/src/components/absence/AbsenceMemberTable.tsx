import { dbService } from '@/fbase';
import { doc, updateDoc } from 'firebase/firestore';

import { useRecoilValue } from 'recoil';

import { absenceAtom } from '@/data/absenceAtom';

import { ABSENCE_MEMBERS, getInitialDataObjByMonth } from '@/appConstants';

import { MonthlyAbsenceMembers } from '@/types';

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
  const { status, data } = useRecoilValue(absenceAtom(year));

  const collName = `BookClub-${year}`;

  const defaultLabels: Label[] = ['일회불참멤버', '정지멤버'];

  const labels: Label[] = isMonth ? ['월', ...defaultLabels] : defaultLabels;

  const setInitialAbsenceDataInFb = async () => {
    const initialObj = getInitialDataObjByMonth<MonthlyAbsenceMembers>({
      breakMembers: [],
      onceAbsenceMembers: [],
    });

    await updateDoc(doc(dbService, collName, ABSENCE_MEMBERS), initialObj);
  };

  const rowDataList = Object.entries(data || {})
    .map(([key, value]: [string, MonthlyAbsenceMembers]) => ({
      ...value,
      month: +key.slice(0, -1),
    }))
    .sort((a, b) => a.month - b.month);

  console.log(data);
  return (
    <>
      {status === 'loaded' &&
        (data ? (
          <Table
            labels={labels}
            rowDataList={rowDataList}
            isEditable={isEditable}
            color="yellow"
          />
        ) : (
          <EmptyCard
            text="아직 월별 불참 정보가 없습니다."
            createBtnTitle={`${year} 새로운 불참 정보 생성하기`}
            onCreateClick={setInitialAbsenceDataInFb}
          />
        ))}
    </>
  );
}
