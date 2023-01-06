import { useEffect, useState } from 'react';
import { CheckCircle, Edit } from '@mui/icons-material';
import { thisYear, getMonthNm, BOOK_FIELD, fieldOfClub } from 'util/index';
import { usersState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';
import { doc, updateDoc } from 'firebase/firestore';
import { dbService } from 'fbase';
import { bookFieldsState, thisMonthState } from 'data/documentsAtom';
import Subtitle from '../../atoms/Subtitle';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import UsernameBox from '../UsernameBox';
import useAlertAskJoin from 'hooks/useAlertAskJoin';

const FieldScheduleBox = () => {
  const bookFields = useRecoilValue(bookFieldsState);
  const thisMonthDoc = useRecoilValue(thisMonthState);
  const userDocs = useRecoilValue(usersState);
  const [isEditing, setIsEditing] = useState(new Array(12).fill(false));
  const [fieldHost, setFieldHost] = useState([]);
  const { alertAskJoinMember, anonymous } = useAlertAskJoin('edit');

  const fbDoc = doc(dbService, BOOK_FIELD, `${thisYear}`);
  const addNoHost = [
    ...userDocs,
    { displayName: '발제자 없음', id: 'no_host' },
  ];

  useEffect(() => {
    setFieldHost(bookFields.bookField);
  }, [bookFields]);

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    idx: number
  ) => {
    event.preventDefault();
    await updateDoc(fbDoc, { bookField: fieldHost });
    onEditClick(idx);
  };

  const onChange = (
    event: React.FormEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { value, name } = event.currentTarget;
    const newArray = fieldHost.map((item) => {
      const data =
        name === 'field' ? { ...item, field: value } : { ...item, host: value };
      return item.month === index + 1 ? data : item;
    });
    setFieldHost(newArray);
  };

  const onEditClick = (idx: number) => {
    if (anonymous) return alertAskJoinMember();
    const editedArr = isEditing.map((editItem, index) =>
      index === idx ? !editItem : editItem
    );
    setIsEditing(editedArr);
  };

  return (
    <section>
      <Subtitle title={`한페이지의 독서 분야 일정`} />
      <FieldList>
        {fieldHost?.map((item, index) =>
          isEditing[index] ? (
            <Form
              key={item.month}
              onSubmit={(event) => onSubmit(event, index)}
              $highlight={+item.month === +getMonthNm(thisMonthDoc?.id)}
            >
              <Month>{`${item.month}월`}</Month>
              <Info>
                <Select
                  name='host'
                  defaultValue={item.host || 'no_host'}
                  onChange={(event) => onChange(event, index)}
                >
                  {addNoHost.map((user) => (
                    <option key={`${user.id}`} value={user.id}>
                      {user.displayName}
                    </option>
                  ))}
                </Select>
                <Select
                  name='field'
                  value={item.field}
                  onChange={(event) => onChange(event, index)}
                >
                  {fieldOfClub.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </Info>
              <SubmitBtn type='submit'>
                <CheckCircle />
              </SubmitBtn>
            </Form>
          ) : (
            <Form
              as='div'
              key={item.month}
              $highlight={+item.month === +getMonthNm(thisMonthDoc?.id)}
            >
              <Month>{`${item.month}월`}</Month>
              <Info>
                {item.host && <UsernameBox creatorId={item.host} />}
                <Field
                  $highlight={+item.month === +getMonthNm(thisMonthDoc?.id)}
                >
                  {item.field ? item.field : '이달의 분야'}
                </Field>
              </Info>
              <SubmitBtn type='button' onClick={() => onEditClick(index)}>
                <Edit />
              </SubmitBtn>
            </Form>
          )
        )}
      </FieldList>
    </section>
  );
};

const FieldList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  padding: 10px;
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;
const Form = styled.form<{ $highlight?: boolean }>`
  position: relative;
  width: 100%;
  min-height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  background-color: ${(props) =>
    props.$highlight ? props.theme.container.lightBlue : 'transparent'};
  font-size: 14px;
  color: ${(props) =>
    props.$highlight ? props.theme.text.accent : props.theme.text.gray};
  @media ${device.tablet} {
    min-height: 80px;
  }
`;
const Month = styled.span`
  width: 20%;
  font-weight: 700;
  text-align: center;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 100%;
`;
const Select = styled.select`
  width: 100%;
  height: 30px;
  border-radius: 10px;
  padding: 0 10px;
  background-color: #fff;
  font-size: 16px;
  border: none;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  &:focus {
    outline: 1px solid ${(props) => props.theme.container.yellow};
  }
`;
const Field = styled.p<{ $highlight: boolean }>`
  font-size: 15px;
  text-align: center;
  font-weight: 700;
  color: ${(props) =>
    props.$highlight ? props.theme.text.accent : props.theme.text.gray};
  @media ${device.tablet} {
    font-size: 16px;
  }
`;
const SubmitBtn = styled.button`
  border: none;
  padding: 0;
  svg {
    width: 16px;
    height: 16px;
    fill: ${(props) => props.theme.text.gray};
  }
`;

export default FieldScheduleBox;
