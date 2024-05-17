import { FormEvent } from 'react';
import { AbsenceSelectValue } from 'hooks/useHandleAbsence';
import SquareBtn from 'components/atoms/button/SquareBtn';
import LabeledCheckBox from 'components/atoms/input/LabeledCheckBox';
import styled from 'styled-components';

interface Props {
  month: number;
  onSubmit: (event: FormEvent<HTMLFormElement>, index: number) => void;
  selectedValues: AbsenceSelectValue;
  setSelectedValues: React.Dispatch<React.SetStateAction<AbsenceSelectValue>>;
}

export default function AbsenceForm({
  month,
  onSubmit,
  selectedValues,
  setSelectedValues,
}: Props) {
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
    <Form onSubmit={(event) => onSubmit(event, month)}>
      {['모임 일회 불참', '모임 정지'].map((absence) => (
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

      <SquareBtn type='submit' name='변경하기' />
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;
