import { AccessTime, Place } from '@mui/icons-material';
import { IMeeting } from 'util/getFirebaseDoc';
import { meetingTimestamp } from 'util/timestamp';
import { Check, Edit } from '@mui/icons-material';
import { useRef, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { authService, dbService } from 'fbase';
import { CLUB_INFO, thisYearMonth } from 'util/constants';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import useAlertAskJoin from 'hooks/useAlertAskJoin';
import ShareButton from './ShareButton';

interface PropsType {
  docData: IMeeting;
}

const MeetingInfoBox = ({ docData }: PropsType) => {
  const [isEditing, setIsEditing] = useState(false);
  const { alertAskJoinMember } = useAlertAskJoin();
  const anonymous = authService.currentUser?.isAnonymous;
  const timeRef = useRef(null);
  const placeRef = useRef(null);

  const docRef = doc(dbService, CLUB_INFO, `${thisYearMonth}`);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!timeRef.current.value || !placeRef.current.value) return;
    await updateDoc(docRef, {
      meeting: {
        place: placeRef.current?.value,
        time: timeRef.current?.value,
      },
    });
    setIsEditing(false);
  };

  const onEditClick = () => {
    if (anonymous) return alertAskJoinMember();
    setIsEditing((prev) => !prev);
  };

  return docData && isEditing ? (
    <Form onSubmit={onSubmit}>
      <Buttons>
        <SubmitBtn type='submit'>
          <Check />
        </SubmitBtn>
      </Buttons>
      <TimePlace>
        <Info>
          모임시간 <AccessTime />
        </Info>
        <input
          type='datetime-local'
          ref={timeRef}
          defaultValue={docData?.time}
        />
      </TimePlace>
      <TimePlace>
        <Info>
          모임장소 <Place />
        </Info>
        <input
          type='text'
          placeholder='모임 장소을 적어주세요.'
          ref={placeRef}
          defaultValue={docData?.place}
        />
      </TimePlace>
    </Form>
  ) : (
    <Form as='div'>
      <TimePlace>
        <Info>
          모임시간 <AccessTime />
        </Info>
        <p>
          {docData?.time
            ? meetingTimestamp(docData?.time)
            : '아직 정해진 모임 시간이 없습니다.'}
        </p>
      </TimePlace>
      <TimePlace>
        <Info>
          모임장소 <Place />
        </Info>
        <p>
          {docData?.place
            ? docData?.place
            : '아직 정해진 모임 장소가 없습니다.'}
        </p>
      </TimePlace>
      <Buttons>
        <SubmitBtn
          as={ShareButton}
          title='✨이번달의 모임일정을 공지합니다~😆.'
          description={`이번 모임은 🏢${docData?.place}에서 🕰${new Date(
            docData?.time
          )
            .toLocaleString()
            .slice(0, -3)}에 만나요!`}
          path='bookclub'
        />
        <SubmitBtn onClick={onEditClick}>
          <Edit />
        </SubmitBtn>
      </Buttons>
    </Form>
  );
};

const Form = styled.form`
  position: relative;
  display: flex;
  gap: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-top: 20px;
  padding: 10px;
  @media ${device.tablet} {
    padding: 20px;
  }
`;

const Buttons = styled.div`
  position: absolute;
  top: -15px;
  display: flex;
  gap: 10px;
  align-self: flex-end;
`;

const SubmitBtn = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  font-size: 12px;
  background-color: ${(props) => props.theme.container.lightBlue};
  cursor: pointer;
  svg {
    width: 18px;
    height: 18px;
    fill: ${(props) => props.theme.text.lightBlue};
  }
`;

const TimePlace = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  > input {
    height: 30px;
    width: 70%;
    padding: 3px 7px;
    border: 1px solid ${(props) => props.theme.container.blue};
    border-radius: 20px;
    font-size: 12px;
  }
  > p {
    width: 70%;
    word-break: break-all;
    font-size: 14px;
    overflow: hidden;
  }
  @media ${device.tablet} {
    p {
      font-size: 15px;
    }
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  width: 80px;
  height: 30px;
  padding: 3px 0px;
  border: 1px solid ${(props) => props.theme.container.blue};
  background-color: ${(props) => props.theme.container.lightBlue};
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  margin-right: 7px;
  span {
    color: ${(props) => props.theme.text.lightBlue};
  }
  svg {
    fill: ${(props) => props.theme.text.lightBlue};
    width: 16px;
    height: 16px;
  }
  @media ${device.tablet} {
    font-size: 12px;
    width: 150px;
    padding: 4px 6px;
    svg {
      fill: ${(props) => props.theme.text.lightBlue};
      width: 16px;
      height: 16px;
    }
  }
`;

export default MeetingInfoBox;
