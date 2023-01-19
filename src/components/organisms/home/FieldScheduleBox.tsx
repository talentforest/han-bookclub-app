import { CheckCircle, Edit } from '@mui/icons-material';
import { getMonthNm, fieldOfClub, thisYear, BOOK_FIELD_HOST } from 'util/index';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getDocument } from 'api/getFbDoc';
import { useEffect } from 'react';
import { fieldHostDocState } from 'data/bookFieldHostAtom';
import { clubInfoByMonthState } from 'data/documentsAtom';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import UsernameBox from '../UsernameBox';
import useHandleFieldHost from 'hooks/useHandleFieldHost';
import Loading from 'components/atoms/Loading';

const FieldScheduleBox = () => {
  const { id } = useRecoilValue(clubInfoByMonthState);
  const setFieldHostDoc = useSetRecoilState(fieldHostDocState);
  const {
    isEditing,
    fieldHost,
    allMembers,
    onSubmit,
    onChange,
    onEditClick, //
  } = useHandleFieldHost();

  useEffect(() => {
    getDocument(BOOK_FIELD_HOST, `${thisYear}`, setFieldHostDoc);
  }, [setFieldHostDoc]);

  return (
    <>
      {fieldHost ? (
        <FieldList>
          {fieldHost?.map((item, index) =>
            isEditing[index] ? (
              <Form
                key={item.month}
                onSubmit={(event) => onSubmit(event, index)}
                $highlight={+item.month === getMonthNm(id)}
              >
                <Month>{`${item.month}월`}</Month>
                <Info>
                  <Select
                    name='host'
                    defaultValue={item.host || 'no_host'}
                    onChange={(event) => onChange(event, index)}
                  >
                    {allMembers.map((member) => (
                      <option key={`${member.id}`} value={member.id}>
                        {member.displayName}
                      </option>
                    ))}
                  </Select>
                  <Select
                    name='field'
                    defaultValue={item.field || '이벤트'}
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
                $highlight={item.month === getMonthNm(id)}
              >
                <Month>{`${item.month}월`}</Month>
                <Info>
                  {item.host !== 'no_host' ? (
                    <UsernameBox creatorId={item.host || '발제자 없음'} />
                  ) : (
                    <></>
                  )}
                  <Field $highlight={item.month === getMonthNm(id)}>
                    {item.field === '이벤트' ? '⭐️' : '📚'} {item.field}
                  </Field>
                </Info>
                <SubmitBtn type='button' onClick={() => onEditClick(index)}>
                  <Edit />
                </SubmitBtn>
              </Form>
            )
          )}
        </FieldList>
      ) : (
        <Loading height='70vh' />
      )}
    </>
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
  min-height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
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
  gap: 8px;
  width: 100%;
`;
const Select = styled.select`
  width: 100%;
  height: 34px;
  border-radius: 10px;
  text-align: center;
  background-color: #fff;
  font-size: 14px;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  &:focus {
    outline: none;
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
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 16px;
    height: 16px;
    fill: ${(props) => props.theme.text.gray};
  }
`;

export default FieldScheduleBox;
