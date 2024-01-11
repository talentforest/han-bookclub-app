import {
  getMonthNm,
  fieldOfClub,
  thisYear,
  BOOK_FIELD_HOST,
  existDocObj,
} from 'util/index';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getDocument } from 'api/getFbDoc';
import { useEffect } from 'react';
import { fieldHostDocState } from 'data/bookFieldHostAtom';
import { thisMonthClubState } from 'data/documentsAtom';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import UsernameBox from '../UsernameBox';
import useHandleFieldHost from 'hooks/useHandleFieldHost';
import Loading from 'components/atoms/loadings/Loading';
import Overlay from 'components/atoms/Overlay';

const FieldScheduleBox = () => {
  const { id } = useRecoilValue(thisMonthClubState);
  const [fieldHostDoc, setFieldHostDoc] = useRecoilState(fieldHostDocState);

  const {
    isEditing,
    allMembers,
    onSubmit,
    onChange,
    onEditClick,
    detailItems,
    onDetailClick,
  } = useHandleFieldHost();

  useEffect(() => {
    if (!existDocObj(fieldHostDoc)) {
      getDocument(BOOK_FIELD_HOST, `${thisYear}`, setFieldHostDoc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldHostDoc]);

  return (
    <>
      {fieldHostDoc.info ? (
        <FieldList>
          {fieldHostDoc.info?.map((item, index) =>
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
                <SubmitBtn type='submit'></SubmitBtn>
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
                    {detailItems[index] && (
                      <>
                        <Overlay onModalClick={() => onDetailClick(index)} />
                        <Detail onClick={() => onDetailClick(index)}>
                          <h4>{`${item.month}월`} 추가사항</h4>
                          <p>{item.detail}</p>
                        </Detail>
                      </>
                    )}
                    {item.detail !== '' && (
                      <></>
                      // <PostAdd onClick={() => onDetailClick(index)} />
                    )}
                  </Field>
                </Info>
                <SubmitBtn
                  type='button'
                  onClick={() => onEditClick(index)}
                ></SubmitBtn>
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
  box-shadow: ${(props) => props.theme.boxShadow};
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
  box-shadow: ${(props) => props.theme.boxShadow};
  &:focus {
    outline: none;
  }
`;
const Field = styled.div<{ $highlight: boolean }>`
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.$highlight ? props.theme.text.accent : props.theme.text.gray};
  > svg {
    cursor: pointer;
    fill: ${(props) => props.theme.text.lightBlue};
    margin-left: 3px;
  }
  @media ${device.tablet} {
    font-size: 16px;
  }
`;
const Detail = styled.div`
  position: fixed;
  height: min-content;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 80vw;
  z-index: 1;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  p {
    margin-top: 5px;
    font-weight: 500;
  }
  @media ${device.tablet} {
    width: 50vw;
    padding: 25px;
  }
  @media ${device.desktop} {
    width: 40vw;
    padding: 25px;
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
