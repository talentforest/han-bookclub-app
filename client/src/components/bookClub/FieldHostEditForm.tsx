import { FormEvent } from 'react';

import { useRecoilValue } from 'recoil';

import { bookFields } from '@/appConstants';
import SquareBtn from '@/components/common/button/SquareBtn';
import { IFieldAndHost } from '@/data/fieldAndHostAtom';
import { allUsersAtom } from '@/data/userAtom';
import { ChangeSelectValue, SelectValue } from '@/hooks/useHandleFieldHost';
import Select from 'react-select';

interface Props {
  month: number;
  bookFieldHost: IFieldAndHost;
  onSubmit: (event: FormEvent<HTMLFormElement>, month: number) => void;
  selectedValues: SelectValue;
  setSelectedValues: React.Dispatch<React.SetStateAction<SelectValue>>;
}

export default function FieldHostEditForm({
  bookFieldHost,
  onSubmit,
  selectedValues,
  setSelectedValues,
  month,
}: Props) {
  const usersDoc = useRecoilValue(allUsersAtom);

  const { field, hosts } = bookFieldHost;

  const hostNames = [
    ...usersDoc,
    { id: 'no_host', displayName: '발제자 없음' },
  ].filter(user => user.displayName !== '한 페이지 멤버');

  const hostOptions = hostNames.map(host => {
    return { value: host.id, label: host.displayName };
  });

  const fieldList = [...bookFields, { id: 'no_field', name: '분야 없음' }];

  const fieldOptions = fieldList.map(field => {
    return { value: field.id, label: field.name };
  });

  const currentField = fieldOptions.find(({ label }) => label === field);
  const currentHost = hostOptions.filter(({ value }) => hosts?.includes(value));

  const onBookFieldChange = (value: ChangeSelectValue) => {
    const field = value.label;
    setSelectedValues({ ...selectedValues, field });
  };

  const onHostChange = (value: ChangeSelectValue[]) => {
    const hosts = value.map(({ value }) => value);
    setSelectedValues({ ...selectedValues, hosts });
  };

  return (
    <form onSubmit={event => onSubmit(event, month)} className="flex flex-col">
      <label htmlFor="독서분야" className="text-sm">
        독서분야
      </label>
      <Select
        className="mb-4"
        menuPosition="fixed"
        options={fieldOptions}
        isSearchable={false}
        defaultValue={currentField || fieldOptions[12]}
        onChange={value => {
          onBookFieldChange(value as ChangeSelectValue);
        }}
      />

      <label htmlFor="발제자" className="text-sm">
        발제자
      </label>
      <Select
        className="mb-4"
        menuPosition="fixed"
        name="host"
        placeholder="발제자를 선택해주세요"
        defaultValue={!!currentHost.length ? [...currentHost] : []}
        isMulti
        options={hostOptions}
        isClearable={false}
        isSearchable={false}
        onChange={value => onHostChange(value as ChangeSelectValue[])}
      />

      <SquareBtn type="submit" name="변경하기" className="self-end" />
    </form>
  );
}
