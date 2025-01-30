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
    <div className="flex items-start gap-1">
      <input
        type="checkbox"
        id={label}
        checked={checked}
        onChange={checkHandler}
        className="mt-1 size-[15px]"
      />
      <div className="flex-1">
        <label
          className="mb-2 inline-block cursor-pointer text-text"
          htmlFor={label}
        >
          {label}
        </label>

        {detail && <GuideLine color="gray" text={detail} />}
      </div>
    </div>
  );
}
