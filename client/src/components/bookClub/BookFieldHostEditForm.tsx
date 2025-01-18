import { FormEvent } from 'react';

import { ChangeSelectValue, SelectValue } from 'hooks/useHandleFieldHost';

import { IBookFieldHost } from 'data/bookFieldHostAtom';
import { allUsersState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { bookFields } from 'appConstants';
import Select from 'react-select';

import SquareBtn from 'components/common/button/SquareBtn';

interface Props {
  month: number;
  bookFieldHost: IBookFieldHost;
  onSubmit: (event: FormEvent<HTMLFormElement>, month: number) => void;
  selectedValues: SelectValue;
  setSelectedValues: React.Dispatch<React.SetStateAction<SelectValue>>;
}

export default function BookFieldHostEditForm({
  bookFieldHost,
  onSubmit,
  selectedValues,
  setSelectedValues,
  month,
}: Props) {
  const usersDoc = useRecoilValue(allUsersState);

  const { field, hosts } = bookFieldHost;

  const hostNames = [
    ...usersDoc,
    { id: 'no_host', displayName: '발제자 없음' },
  ].filter(user => user.displayName !== '한 페이지 멤버');

  const hostOptions = hostNames.map(host => {
    return { id: host.id, name: host.displayName };
  });

  const fieldOptions = [...bookFields, { id: 'no_field', name: '분야 없음' }];

  const currentField = fieldOptions.find(({ name }) => name === field);
  const currentHost = hostOptions.filter(({ name }) => hosts?.includes(name));

  const onBookFieldChange = (value: ChangeSelectValue) => {
    const field = value.label;
    setSelectedValues({ ...selectedValues, field });
  };

  const onHostChange = (value: ChangeSelectValue[]) => {
    const hosts = value.map(({ value }) => value);
    setSelectedValues({ ...selectedValues, hosts });
  };

  return (
    <form onSubmit={event => onSubmit(event, month)} className="mt-4">
      <label htmlFor="독서분야" className="text-sm">
        독서분야
      </label>
      <Select
        className="mb-4"
        menuPosition="fixed"
        options={fieldOptions}
        isSearchable={false}
        defaultValue={currentField || fieldOptions[12]}
        onChange={value =>
          onBookFieldChange({
            value: value.id,
            label: value.name,
          } as ChangeSelectValue)
        }
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
        onChange={value =>
          onHostChange(
            value.map(item => ({
              value: item.id,
              label: item.name,
            })) as ChangeSelectValue[],
          )
        }
      />

      <SquareBtn type="submit" name="변경하기" className="self-end" />
    </form>
  );
}
