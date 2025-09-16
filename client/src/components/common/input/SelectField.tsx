import Select from 'react-select';

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

  const onBookFieldChange = (value: ChangeSelectValue) => {
    const field = value.label;
    setSelectedValues(prev => ({ ...prev, field }));
  };

  return (
    <div>
      <Label text="독서분야" />
      <Select
        className="h-12 [&>div]:h-full [&>div]:rounded-xl [&>div]:border-gray1"
        menuPosition="fixed"
        options={fieldOptions}
        isSearchable={false}
        defaultValue={currentField || fieldOptions[12]}
        onChange={onBookFieldChange}
      />
      {errorMsg && <ErrorMsg msg={errorMsg} />}
    </div>
  );
}
