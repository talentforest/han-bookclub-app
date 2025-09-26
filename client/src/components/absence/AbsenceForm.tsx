import { useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import { absenceAtom } from '@/data/absenceAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { useHandleAbsence } from '@/hooks';

import SquareBtn from '@/components/common/button/SquareBtn';
import LabeledCheckBox from '@/components/common/input/LabeledCheckBox';

interface AbsenceFormProps {
  month: number;
}

export default function AbsenceForm({ month }: AbsenceFormProps) {
  const absenceList = useRecoilValue(absenceAtom);

  const { uid } = useRecoilValue(currAuthUserAtom);

  const { onSubmit, selectedValues, setSelectedValues } = useHandleAbsence();

  useEffect(() => {
    const { absenceMembers } = absenceList;
    const absenceByMonth = absenceMembers?.find(item => item.month === month);

    if (!absenceByMonth) return;

    const { breakMembers, onceAbsenceMembers } = absenceByMonth;

    const isBreakMonth = breakMembers?.find(userId => userId === uid);
    const isOnceAbsenceMonth = onceAbsenceMembers?.find(
      userId => userId === uid,
    );

    setSelectedValues({
      month,
      breakMonth: !!isBreakMonth,
      onceAbsenceMonth: !!isOnceAbsenceMonth,
    });
  }, [month]);

  const checkedBoxHandler = (label: string, checked: boolean) => {
    const otherBoxChecked =
      (label === '모임 일회 불참' && checked && selectedValues.breakMonth) ||
      (label === '모임 정지' && checked && selectedValues.onceAbsenceMonth);

    if (otherBoxChecked) {
      const reverseChangedValue =
        label === '모임 정지'
          ? { month, onceAbsenceMonth: !checked, breakMonth: checked }
          : { month, breakMonth: !checked, onceAbsenceMonth: checked };

      setSelectedValues({ ...reverseChangedValue });
    } else {
      const changedValue =
        label === '모임 정지'
          ? { breakMonth: checked }
          : { onceAbsenceMonth: checked };

      setSelectedValues({ ...selectedValues, ...changedValue });
    }
  };

  return (
    <form
      onSubmit={event => onSubmit(event, month)}
      className="mt-4 flex flex-col gap-2.5"
    >
      {['모임 일회 불참', '모임 정지'].map(absence => (
        <LabeledCheckBox
          key={absence}
          label={absence}
          checked={
            absence === '모임 정지'
              ? selectedValues.breakMonth
              : selectedValues.onceAbsenceMonth
          }
          checkedBoxHandler={checkedBoxHandler}
          detail={
            absence === '모임 정지'
              ? '모임에 신경쓰지 못하는 달이 될 경우 체크해주세요.(모임후기 작성 X)'
              : '일정상 모임에 참석하지 못하는 경우에 체크해주세요.(모임후기 작성 O)'
          }
        />
      ))}

      <SquareBtn type="submit" name="변경하기" className="!ml-auto !py-0" />
    </form>
  );
}
