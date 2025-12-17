import { useHandleFieldHost } from '@/hooks';

import Modal from '@/components/common/Modal';
import Textarea from '@/components/common/Textarea';
import SquareBtn from '@/components/common/button/SquareBtn';
import SelectField from '@/components/common/input/SelectField';
import SelectHosts from '@/components/common/input/SelectHosts';

interface FieldHostEditModalProps {
  month: number;
  year: string;
}

export default function FieldHostEditModal({
  year,
  month,
}: FieldHostEditModalProps) {
  const {
    errorMsg,
    onSubmit,
    selectedValues,
    setSelectedValues, //
  } = useHandleFieldHost({ year, monthKey: `${month}월` });

  const { hosts, field, detail } = selectedValues;

  return (
    <Modal title={`${month}월 독서분야와 발제자 수정하기`}>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
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

        <Textarea
          label="상세내용"
          placeholder="상세내용을 작성해주세요"
          value={detail}
          onChange={e => {
            setSelectedValues(prev => ({ ...prev, detail: e.target.value }));
          }}
        />

        <SquareBtn type="submit" name="변경하기" className="self-end" />
      </form>
    </Modal>
  );
}
