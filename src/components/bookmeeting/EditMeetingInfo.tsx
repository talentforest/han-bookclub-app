import { BookMeetingInfo } from "routes/BookMeeting";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "fbase";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import styled from "styled-components";

interface PropsType {
  docData: BookMeetingInfo;
}

const EditMeetingInfo = ({ docData }: PropsType) => {
  const bookMeetingSchedule = JSON.parse(
    window.sessionStorage.getItem("bookMeetingSchedule")
  );
  const [isEditing, setIsEditing] = useState(false);
  const [timeText, setTimeText] = useState(bookMeetingSchedule?.time);
  const [placeText, setPlaceText] = useState(bookMeetingSchedule?.place);

  const meetingSchedule = { time: timeText, place: placeText };
  const saveLocalData = () => {
    window.sessionStorage.setItem(
      "bookMeetingSchedule",
      JSON.stringify(meetingSchedule)
    );
  };

  const onUpdateInfoClick = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const MeetingInfoRef = doc(dbService, "BookMeeting Info", `${docData.id}`);
    await updateDoc(MeetingInfoRef, {
      meeting: { place: placeText, time: timeText },
    });
    saveLocalData();
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <Container>
          <EditInput onClick={onUpdateInfoClick}>수정완료</EditInput>
          <MeetingInfoBox
            docData={docData}
            isEditing={isEditing}
            timeText={timeText}
            placeText={placeText}
            setTimeText={setTimeText}
            setPlaceText={setPlaceText}
          />
        </Container>
      ) : (
        <Container>
          <EditInput onClick={() => setIsEditing(true)}>
            모임정보 수정하기
          </EditInput>
          <MeetingInfoBox docData={docData} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  margin-top: 30px;
`;

const EditInput = styled.button`
  font-size: 11px;
  color: ${(props) => props.theme.text.accent};
  background-color: transparent;
  width: fit-content;
  position: absolute;
  right: 10px;
  top: -20px;
  background-color: ${(props) => props.theme.container.yellow};
  padding: 2px 7px;
  border: none;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  cursor: pointer;
`;

export default EditMeetingInfo;
