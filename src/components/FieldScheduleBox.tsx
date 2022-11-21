import React, { useEffect, useState } from 'react';
import { Check, Edit } from '@mui/icons-material';
import { IBookMeeting, IMonthField } from 'util/getFirebaseDoc';
import { getMonthNumber } from 'util/getMonthNumber';
import { usersState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';
import { doc, updateDoc } from 'firebase/firestore';
import { dbService } from 'fbase';
import { BOOK_FIELD, fieldOfClub, thisYear } from 'util/constants';
import Subtitle from './common/Subtitle';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import UserInfoBox from './common/UserInfoBox';

interface FieldScheduleBoxProps {
  bookFields: IMonthField[];
  thisMonthDoc: IBookMeeting;
}

const FieldScheduleBox = ({
  bookFields,
  thisMonthDoc,
}: FieldScheduleBoxProps) => {
  const userDocs = useRecoilValue(usersState);
  const [isEditing, setIsEditing] = useState(new Array(12).fill(false));
  const [newFieldHost, setNewFieldHost] = useState([]);

  const addNoHost = [
    ...userDocs,
    { displayName: '발제자 없음', id: 'no_host' },
  ];

  useEffect(() => {
    setNewFieldHost(bookFields);
  }, [bookFields]);

  const docRef = doc(dbService, BOOK_FIELD, `${thisYear}`);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateDoc(docRef, { bookField: newFieldHost });
  };

  const onChange = (
    event: React.FormEvent<HTMLSelectElement | HTMLInputElement>,
    index: number
  ) => {
    const { value, name } = event.currentTarget;
    setNewFieldHost(
      newFieldHost.map((bookField) =>
        bookField.month === index + 1
          ? name === 'field'
            ? { ...bookField, field: value }
            : { ...bookField, host: value }
          : bookField
      )
    );
  };

  const handleEditing = (idx: number) => {
    setIsEditing(
      isEditing.map((editItem, index) => (index === idx ? !editItem : editItem))
    );
  };

  return (
    <section>
      <Subtitle title={`한페이지의 독서 분야 일정`} />
      <FieldList>
        {newFieldHost?.map((item: IMonthField, index) => (
          <Form
            onSubmit={onSubmit}
            key={item.month}
            $highlight={+item.month === +getMonthNumber(thisMonthDoc?.id)}
          >
            <div>{`${item.month}월`}</div>
            <EditElement
              $highlight={item.month === +getMonthNumber(thisMonthDoc?.id)}
            >
              {isEditing[index] ? (
                <>
                  <select
                    name='host'
                    onChange={(event) => onChange(event, index)}
                    defaultValue={item.host}
                  >
                    {addNoHost.map((user) => (
                      <option key={`${user.id}`} value={user.id}>
                        {user.displayName}
                      </option>
                    ))}
                  </select>
                  <select
                    name='field'
                    value={item.field}
                    onChange={(event) => onChange(event, index)}
                  >
                    {fieldOfClub.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  {item.host && <UserInfoBox creatorId={item.host} />}
                  <p>{item.field}</p>
                </>
              )}
            </EditElement>
            <SubmitBtn
              type='submit'
              name={`${index}`}
              onClick={() => handleEditing(index)}
            >
              {isEditing[index] ? <Check /> : <Edit />}
            </SubmitBtn>
          </Form>
        ))}
      </FieldList>
    </section>
  );
};

const FieldList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  padding: 10px;
  gap: 5px;
  @media ${device.tablet} {
    padding: 20px;
    gap: 10px;
  }
`;

const Form = styled.form<{ $highlight: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  background-color: ${(props) =>
    props.$highlight ? props.theme.container.lightBlue : 'transparent'};
  font-size: 14px;
  > div:first-child {
    text-align: center;
    padding: 5px 0;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
  }
`;

const EditElement = styled.div<{ $highlight: boolean }>`
  width: 100%;
  height: 80px;
  padding: 5px 4px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > div,
  > span {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;
    > span {
      font-size: 12px;
    }
  }
  > p {
    margin-top: 5px;
    height: 100%;
    font-weight: 700;
    text-align: center;
    color: ${(props) =>
      props.$highlight ? props.theme.text.accent : props.theme.text.default};
  }
  > input,
  > select {
    margin-top: 5px;
    width: 100%;
    border: 1px solid ${(props) => props.theme.text.lightGray};
    height: 28px;
    border-radius: 20px;
    padding: 0 8px;
    font-weight: 700;
    font-size: 12px;
    &::placeholder {
      font-size: 11px;
    }
    &:focus {
      outline: 1px solid ${(props) => props.theme.container.blue};
    }
  }
  > select {
    padding: 0 4px;
  }
`;

const SubmitBtn = styled.button`
  align-self: flex-end;
  font-weight: 700;
  background-color: ${(props) => props.theme.container.default};
  border: 1px solid ${(props) => props.theme.text.lightGray};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  margin: 0 2px 2px 0;
  border-radius: 50%;
  svg {
    width: 16px;
    height: 16px;
    fill: ${(props) => props.theme.text.gray};
  }
`;

export default FieldScheduleBox;
