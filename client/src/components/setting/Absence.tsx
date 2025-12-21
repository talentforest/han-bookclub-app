import { useLocation } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { thisYear } from '@/utils';

import MobileHeader from '@/layout/MobileHeader';

import AbsenceMonthTable from '@/components/absence/AbsenceMonthTable';
import GuideLine from '@/components/common/GuideLine';

export default function Absence() {
  const { uid } = useRecoilValue(currAuthUserAtom);

  const { state } = useLocation();

  return (
    <>
      <MobileHeader title={`나의 ${thisYear}년 모임 불참 설정`} backBtn />

      <main>
        <GuideLine text="모임에 일회불참하거나 모임정지하는 모든 달에 체크해주세요" />
        <AbsenceMonthTable userId={uid} isEditable year={state?.year} />
      </main>
    </>
  );
}
