import Select from 'react-select';

import { useRecoilValue } from 'recoil';

import { allUsersAtom } from '@/data/userAtom';

import ErrorMsg from '@/components/common/ErrorMsg';
import Label from '@/components/common/input/Label';

type ChangeSelectValue = {
  label: string;
  value: string;
};

interface SelectHostsProps {
  label: '이벤트 진행자' | '발제자';
  selectedHosts: string[];
  onChange: (value: ChangeSelectValue[]) => void;
  errorMsg: string;
}

const noHost = { id: 'no_host', displayName: '발제자 없음' };

export default function SelectHosts({
  label,
  selectedHosts,
  onChange,
  errorMsg,
}: SelectHostsProps) {
  const usersDoc = useRecoilValue(allUsersAtom);

  const hostOptions = [...usersDoc, noHost].map(host => {
    return { value: host.id, label: host.displayName };
  });

  const currentHost = hostOptions.filter(({ value }) =>
    selectedHosts?.includes(value),
  );

  return (
    <div className="flex flex-col">
      <Label text={label} />
      <Select
        className="h-12 shadow-none shadow-pointPurple focus-within:border-pointCoral [&>div:nth-child(3)]:h-full [&>div:nth-child(3)]:rounded-xl [&>div:nth-child(3)]:border-gray1"
        menuPosition="fixed"
        name="host"
        placeholder={`${label}를 선택해주세요`}
        defaultValue={!!currentHost.length ? [...currentHost] : []}
        isMulti
        options={hostOptions}
        isClearable={false}
        isSearchable={false}
        onChange={value => onChange(value as any)}
      />
      {errorMsg && <ErrorMsg msg={errorMsg} />}
    </div>
  );
}
