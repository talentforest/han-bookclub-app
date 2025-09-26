import GuideLine from '@/components/common/GuideLine';
import Label from '@/components/common/input/Label';

interface LabeledCheckBoxProps {
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
}: LabeledCheckBoxProps) {
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
        <Label text={label} className="py-0 !text-base" />
        {detail && <GuideLine color="gray" text={detail} />}
      </div>
    </div>
  );
}
