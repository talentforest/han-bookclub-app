import { useHandleAbsence } from '@/hooks';

import SquareBtn from '@/components/common/button/SquareBtn';
import LabeledCheckBox from '@/components/common/input/LabeledCheckBox';

interface AbsenceFormProps {
  year: string;
  monthNum: number;
}

export default function AbsenceForm({ year, monthNum }: AbsenceFormProps) {
  const {
    onSubmit,
    values: { isBreakMonth, isOnceAbsenceMonth },
    checkedBoxHandler, //
  } = useHandleAbsence(year, monthNum);

  const absenceTypeList = [
    {
      type: '모임 일회 불참',
      checked: isOnceAbsenceMonth,
      detail:
        '일정상 모임에 참석하지 못하는 경우에 체크해주세요.(모임후기 작성 O)',
    },
    {
      type: '모임 정지',
      checked: isBreakMonth,
      detail:
        '모임에 신경쓰지 못하는 달이 될 경우 체크해주세요.(모임후기 작성 X)',
    },
  ] as const;

  return (
    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2.5">
      {absenceTypeList.map(({ type, checked, detail }) => (
        <LabeledCheckBox
          key={type}
          label={type}
          checked={checked}
          checkedBoxHandler={() => checkedBoxHandler(type)}
          detail={detail}
        />
      ))}

      <SquareBtn type="submit" name="변경하기" className="!ml-auto !py-0" />
    </form>
  );
}
