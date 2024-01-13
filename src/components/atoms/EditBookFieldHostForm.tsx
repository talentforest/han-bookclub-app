import { allUsersState } from 'data/userAtom';
import { FiCheckCircle } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import { bookFieldsOfClub } from 'util/index';
import { FormEvent } from 'react';
import { IBookFieldHost } from 'data/bookFieldHostAtom';
import { ChangeSelectValue, SelectValue } from 'hooks/useHandleFieldHost';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import Select from 'react-select';

interface Props {
  index: number;
  bookFieldHost: IBookFieldHost;
  onSubmit: (event: FormEvent<HTMLFormElement>, index: number) => void;
  onEditClick: (index: number) => void;
  selectedValues: SelectValue;
  setSelectedValues: React.Dispatch<React.SetStateAction<SelectValue>>;
}

export default function EditBookFieldHostForm({
  bookFieldHost,
  onSubmit,
  onEditClick,
  selectedValues,
  setSelectedValues,
  index,
}: Props) {
  const usersDoc = useRecoilValue(allUsersState);

  const { field, hosts } = bookFieldHost;

  const hostNames = [
    ...usersDoc,
    { id: 'no_host', displayName: '발제자 없음' },
  ];
  const hostOptions = hostNames.map((host) => {
    return { value: host.id, label: host.displayName };
  });

  const fieldOptions = [
    ...bookFieldsOfClub,
    { value: 'no_field', label: '분야 없음' },
  ];

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
    <Form onSubmit={(event) => onSubmit(event, index)}>
      <div>
        <label htmlFor='독서분야'>독서분야</label>
        <SelectBox
          options={fieldOptions}
          isSearchable={false}
          defaultValue={currentField || fieldOptions[12]}
          onChange={(value) => onBookFieldChange(value as ChangeSelectValue)}
        />
      </div>
      <div>
        <label htmlFor='발제자'>발제자</label>
        <SelectBox
          name='host'
          placeholder='발제자를 선택해주세요'
          defaultValue={!!currentHost.length ? [...currentHost] : []}
          isMulti
          options={hostOptions}
          isClearable={false}
          isSearchable={false}
          onChange={(value) => onHostChange(value as ChangeSelectValue[])}
        />
      </div>

      <SubmitBtn type='submit'>
        <FiCheckCircle />
        <span>변경하기</span>
      </SubmitBtn>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
  > h3 {
    font-size: 18px;
  }
  > div {
    margin-bottom: 10px;
    label {
      font-size: 14px;
    }
  }
  @media ${device.tablet} {
    min-height: 80px;
  }
`;

const SelectBox = styled(Select)`
  margin-top: 5px;
  width: 100%;
`;

const SubmitBtn = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;

  padding: 8px 0;
  border-radius: 8px;
  background-color: ${(props) => props.theme.container.blue};
  svg {
    width: 14px;
    height: 14px;
    stroke: #fff;
  }
  span {
    font-size: 15px;
    color: #fff;
    padding-top: 3px;
  }
`;
