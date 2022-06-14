import { BookMeetingInfo } from "routes/BookMeeting";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "fbase";
import { thisYearMonth } from "util/constants";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import styled from "styled-components";

interface PropsType {
  data: BookMeetingInfo;
}

const EditMeetingInfo = ({ data }: PropsType) => {
  const [isEditing, setIsEditing] = useState(false);
  const [timeText, setTimeText] = useState(
    JSON.parse(window.localStorage.getItem("bookMeetingSchedule"))?.time
  );
  const [placeText, setPlaceText] = useState(
    JSON.parse(window.localStorage.getItem("bookMeetingSchedule"))?.place
  );

  const meetingSchedule = { time: timeText, place: placeText };
  const saveLocalData = () => {
    window.localStorage.setItem(
      "bookMeetingSchedule",
      JSON.stringify(meetingSchedule)
    );
  };

  const onUpdateInfoClick = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const MeetingInfoRef = doc(
      dbService,
      "BookMeeting Info",
      `${thisYearMonth}`
    );
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
            data={data}
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
          <MeetingInfoBox data={data} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: relative;
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
