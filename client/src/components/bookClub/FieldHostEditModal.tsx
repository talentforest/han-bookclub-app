import { useEffect } from 'react';

import { useHandleFieldHost } from '@/hooks';

import Modal from '@/components/common/Modal';
import SquareBtn from '@/components/common/button/SquareBtn';
import SelectField from '@/components/common/input/SelectField';
import SelectHosts from '@/components/common/input/SelectHosts';

interface FieldHostEditModalProps {
  month: number;
}

export default function FieldHostEditModal({ month }: FieldHostEditModalProps) {
  const {
    errorMsg,
    fieldAndHostList,
    onSubmit,
    setSelectedValues, //
  } = useHandleFieldHost();

  const fieldAndHost = fieldAndHostList.find(item => item.month === month);

  const { field, hosts } = fieldAndHost;

  useEffect(() => {
    setSelectedValues(fieldAndHost);
  }, []);

  return (
    <Modal title={`${month}월 독서분야와 발제자 수정하기`}>
      <form
        onSubmit={event => onSubmit(event, month)}
        className="flex flex-col gap-y-4"
      >
        <SelectField
          field={field}
          setSelectedValues={setSelectedValues}
          errorMsg={errorMsg?.field}
        />
        <SelectHosts
          label="발제자"
          selectedHosts={hosts}
          onChange={value => {
            const hosts = value.map(({ value }) => value);
            setSelectedValues(prev => ({ ...prev, hosts }));
          }}
          errorMsg={errorMsg?.hosts}
        />
        <SquareBtn type="submit" name="변경하기" className="self-end" />
      </form>
    </Modal>
  );
}
