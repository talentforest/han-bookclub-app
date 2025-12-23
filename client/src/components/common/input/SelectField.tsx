import CreatableSelect from 'react-select/creatable';

import { clubBookFieldList } from '@/appConstants';

import { MonthlyFieldAndHost } from '@/types';

import ErrorMsg from '@/components/common/ErrorMsg';
import Label from '@/components/common/input/Label';

interface SelectFieldProps {
  field: string;
  setSelectedValues: React.Dispatch<React.SetStateAction<MonthlyFieldAndHost>>;
  errorMsg: string;
}

type ChangeSelectValue = {
  label: string;
  value: string;
};

export default function SelectField({
  field,
  setSelectedValues,
  errorMsg,
}: SelectFieldProps) {
  const fieldOptions = clubBookFieldList.map(field => {
    return { value: `${field.id}`, label: field.name };
  });

  const currentField = fieldOptions.find(({ label }) => label === field);

  const onBookFieldChange = (option: ChangeSelectValue) => {
    setSelectedValues(prev => ({ ...prev, field: option ? option.label : '' }));
  };

  return (
    <div>
      <Label text="독서분야" />
      <CreatableSelect
        isClearable
        className="h-12 [&>div]:h-full [&>div]:rounded-xl [&>div]:border-gray1"
        menuPosition="fixed"
        options={fieldOptions}
        value={currentField || fieldOptions[12]}
        onChange={onBookFieldChange}
        placeholder="독서분야를 선택해주세요"
        formatCreateLabel={inputValue => `"${inputValue}" 옵션 추가`}
      />
      {errorMsg && <ErrorMsg msg={errorMsg} />}
    </div>
  );
}
