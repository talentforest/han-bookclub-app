import styled from 'styled-components';
import GuideLine from '../GuideLine';

export interface AbsenceType {
  type: string;
}

interface Props {
  label: string;
  checked: boolean;
  checkedBoxHandler: (label: string, checked: boolean) => void;
  detail: string;
}

export default function LabeledCheckBox({
  label,
  checked,
  checkedBoxHandler,
  detail,
}: Props) {
  const checkHandler = async (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { checked },
    } = event;
    checkedBoxHandler(label, checked);
  };

  return (
    <>
      <LabelInputBox>
        <input
          type='checkbox'
          id={label}
          checked={checked}
          onChange={checkHandler}
        />
        <div>
          <label htmlFor={label}>{label}</label>

          {detail && <GuideLine color='gray' text={detail} />}
        </div>
      </LabelInputBox>
    </>
  );
}

const LabelInputBox = styled.div`
  display: flex;
  align-items: start;
  gap: 3px;
  label {
    display: inline-block;
    padding-top: 3px;
    margin-bottom: 8px;
    font-size: 16px;
    cursor: pointer;
    color: ${({ theme }) => theme.text.default};
  }
  input {
    cursor: pointer;
  }
`;
