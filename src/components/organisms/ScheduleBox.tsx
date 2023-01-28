import { getLocalDateTime } from 'util/index';
import { ISchedule } from 'data/documentsAtom';
import { Check, Edit } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import ShareBtn from '../atoms/buttons/ShareBtn';
import InfoTag from '../atoms/InfoTag';
import useHandleSchedule from 'hooks/useHandleSchedule';

interface PropsType {
  schedule: ISchedule;
}

const ScheduleBox = ({ schedule }: PropsType) => {
  const { pathname } = useLocation();
  const {
    isEditing,
    onSubmit,
    onEditClick,
    timeRef,
    placeRef, //
  } = useHandleSchedule();

  const { time, place } = schedule || {};

  return (
    schedule &&
    (isEditing ? (
      <Form onSubmit={onSubmit}>
        <Item>
          <InfoTag tagName='모임 시간' />
          <Input type='datetime-local' ref={timeRef} defaultValue={time} />
        </Item>
        <Item>
          <InfoTag tagName='모임 장소' />
          <Input
            type='text'
            placeholder='모임 장소을 적어주세요.'
            ref={placeRef}
            defaultValue={place}
          />
        </Item>
        <SubmitBtn type='submit'>
          <Check />
        </SubmitBtn>
      </Form>
    ) : (
      <Form as='div'>
        <Item>
          <InfoTag tagName='모임 시간' />
          <Info $gray={!!time}>
            {time ? getLocalDateTime(time) : '아직 정해진 모임 시간이 없어요.'}
          </Info>
        </Item>
        <Item>
          <InfoTag tagName='모임 장소' />
          <Info $gray={!!place}>
            {place ? place : '아직 정해진 모임 장소가 없어요.'}
          </Info>
        </Item>
        {!pathname.includes('history') && (
          <BtnBox>
            <ShareBtn
              place={place}
              schedule={getLocalDateTime(time)}
              title='✨이번달의 모임일정을 공지합니다~'
              description={`이번 모임은 🏢${place}에서 🕰${getLocalDateTime(
                time
              )}에 만나요!`}
              path='bookclub'
            />
            <EditBtn onClick={onEditClick}>
              <Edit />
            </EditBtn>
          </BtnBox>
        )}
      </Form>
    ))
  );
};

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;
  width: 100%;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px 15px;
  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-evenly;
    gap: 15px;
    padding: 30px 20px;
  }
`;
const Item = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  @media ${device.tablet} {
    align-items: center;
  }
`;
const Info = styled.p<{ $gray: boolean }>`
  color: ${(props) =>
    props.$gray ? props.theme.text.default : props.theme.text.gray};
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  padding: 2px 10px;
  border-radius: 40px;
  font-size: 16px;
  &[type='datetime-local'] {
    width: 100%;
    background-color: ${(props) => props.theme.container.default};
    min-width: inherit;
  }
  @media ${device.tablet} {
    max-width: 30vw;
  }
`;
const BtnBox = styled.div`
  position: absolute;
  top: -15px;
  right: 10px;
  display: flex;
  gap: 10px;
  @media ${device.tablet} {
    top: -40px;
  }
`;
const EditBtn = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background-color: ${(props) => props.theme.container.lightBlue};
  cursor: pointer;
  svg {
    width: 18px;
    height: 18px;
    fill: ${(props) => props.theme.text.lightBlue};
  }
`;
const SubmitBtn = styled(EditBtn)`
  position: absolute;
  top: -15px;
  right: 10px;
  @media ${device.tablet} {
    top: -40px;
  }
`;

export default ScheduleBox;
