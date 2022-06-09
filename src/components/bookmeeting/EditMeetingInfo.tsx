import { BookMeetingInfo } from "routes/BookMeeting";
import { useState } from "react";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import styled from "styled-components";
import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "fbase";
import { thisYearMonth } from "util/constants";

interface PropsType {
  data: BookMeetingInfo;
}

const EditMeetingInfo = ({ data }: PropsType) => {
  const [isEditing, setIsEditing] = useState(false);
  const [timeText, setTimeText] = useState("");
  const [placeText, setPlaceText] = useState("");

  const onEditToggleClick = () => {
    setIsEditing((prev) => !prev);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const MeetingInfoRef = doc(
      dbService,
      "BookMeeting Info",
      `${thisYearMonth}`
    );
    await updateDoc(MeetingInfoRef, {
      meeting: { place: placeText, time: timeText },
    });

    setTimeText("");
    setPlaceText("");
  };

  return (
    <>
      {isEditing ? (
        <Container onSubmit={onSubmit}>
          <EditInput
            value="수정완료"
            type="submit"
            onClick={onEditToggleClick}
          />
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
          <EditInput
            value="모임정보 수정하기"
            type="button"
            onClick={onEditToggleClick}
          />
          <MeetingInfoBox data={data} />
        </Container>
      )}
    </>
  );
};

const Container = styled.form`
  position: relative;
  width: 80%;
  margin-top: 30px;
`;

const EditInput = styled.input`
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
