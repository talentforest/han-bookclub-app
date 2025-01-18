import { useEffect } from 'react';

import { getDocument } from 'api/firebase/getFbDoc';

import { absenceListState } from 'data/absenceAtom';
import { useRecoilState } from 'recoil';

import Table from '../common/Table';
import {
  ABSENCE_MEMBERS,
  BOOKCLUB_THIS_YEAR,
  initialAbsenseMembersData,
} from 'appConstants';
import { dbService } from 'fbase';
import { doc, setDoc } from 'firebase/firestore';
import { existDocObj, thisMonth, thisYear } from 'utils';

import MemberListCard from 'components/absence/MemberListCard';
import { Label } from 'components/common/TableDataItem';
import EmptyCard from 'components/common/container/EmptyCard';

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

  const thisMonthAbsentee = absenceList?.absenceMembers?.find(
    ({ month }) => month === +thisMonth,
  );

  return (
    <>
      <div className="flex gap-4">
        <div className="h-40 w-full rounded-xl border p-4 shadow-card">
          <h4>참석멤버</h4>
          {}
        </div>
        <div className="h-40 w-full rounded-xl border p-4 shadow-card">
          <h4>불참멤버</h4>
          {thisMonthAbsentee && (
            <MemberListCard
              title="불참 멤버"
              memberList={[
                ...thisMonthAbsentee?.onceAbsenceMembers,
                ...thisMonthAbsentee?.breakMembers,
              ]}
            />
          )}
        </div>
      </div>

      {!!absenceList?.absenceMembers ? (
        <Table
          color="blue"
          labels={labels}
          records={absenceList?.absenceMembers}
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
