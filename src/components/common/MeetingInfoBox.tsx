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
import InfoTag from './InfoTag';

interface PropsType {
  docData: IMeeting;
}

const MeetingInfoBox = ({ docData }: PropsType) => {
  const [isEditing, setIsEditing] = useState(false);
  const { alertAskJoinMember } = useAlertAskJoin();
  const anonymous = authService.currentUser?.isAnonymous;
  const timeRef = useRef<HTMLInputElement>(null);
  const placeRef = useRef<HTMLInputElement>(null);
  const document = doc(dbService, CLUB_INFO, `${thisYearMonth}`);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!timeRef.current.value || !placeRef.current.value) return;
    await updateDoc(document, {
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
      <Item>
        <InfoTag tagName='모임 시간' />
        <Input
          type='datetime-local'
          ref={timeRef}
          defaultValue={docData?.time}
        />
      </Item>
      <Item>
        <InfoTag tagName='모임 장소' />
        <Input
          type='text'
          placeholder='모임 장소을 적어주세요.'
          ref={placeRef}
          defaultValue={docData?.place}
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
        <Info $color={!!docData?.time}>
          {docData?.time
            ? meetingTimestamp(docData?.time)
            : '아직 정해진 모임 시간이 없어요.'}
        </Info>
      </Item>
      <Item>
        <InfoTag tagName='모임 장소' />
        <Info $color={!!docData?.place}>
          {docData?.place ? docData?.place : '아직 정해진 모임 장소가 없어요.'}
        </Info>
      </Item>
      <BtnBox>
        <ShareButton
          title='✨이번달의 모임일정을 공지합니다~😆.'
          description={`이번 모임은 🏢${docData?.place}에서 🕰${new Date(
            docData?.time
          )
            .toLocaleString()
            .slice(0, -3)}에 만나요!`}
          path='bookclub'
        />
        <EditBtn onClick={onEditClick}>
          <Edit />
        </EditBtn>
      </BtnBox>
    </Form>
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
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
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
const Info = styled.p<{ $color: boolean }>`
  color: ${(props) =>
    props.$color ? props.theme.text.default : props.theme.text.gray};
`;
const Input = styled.input`
  width: inherit;
  height: 40px;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  padding: 2px 10px;
  border-radius: 40px;
  border: 1px solid red;
  font-size: 16px;
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

export default MeetingInfoBox;
