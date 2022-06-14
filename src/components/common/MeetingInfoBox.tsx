import { AccessTime, Place } from "@mui/icons-material";
import { BookMeetingInfo } from "routes/BookMeeting";
import { meetingTimestamp } from "util/timestamp";
import styled from "styled-components";
import device from "theme/mediaQueries";

interface PropsType {
  docData: BookMeetingInfo;
  isEditing?: boolean;
  timeText?: string;
  placeText?: string;
  setTimeText?: (timeText: string) => void;
  setPlaceText?: (placeText: string) => void;
}

const MeetingInfoBox = ({
  docData,
  isEditing,
  timeText,
  placeText,
  setTimeText,
  setPlaceText,
}: PropsType) => {
  const onTimeChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTimeText(event.currentTarget.value);
  };

  const onPlaceChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPlaceText(event.currentTarget.value);
  };

  return (
    <MeetingInfo>
      <div>
        <span>
          모임시간
          <AccessTime />
        </span>
        {isEditing ? (
          <Input
            type="datetime-local"
            value={timeText}
            placeholder="모임시간을 지정해주세요"
            onChange={onTimeChange}
          />
        ) : (
          <p>
            {docData?.meeting.time !== ""
              ? meetingTimestamp(docData?.meeting.time)
              : "정해진 모임 시간이 없습니다."}
          </p>
        )}
      </div>
      <div>
        <span>
          모임장소
          <Place />
        </span>
        {isEditing ? (
          <Input type="text" value={placeText} onChange={onPlaceChange} />
        ) : (
          <p>
            {docData?.meeting.place !== ""
              ? docData?.meeting.place
              : "정해진 모임 장소가 없습니다."}
          </p>
        )}
      </div>
    </MeetingInfo>
  );
};

const Input = styled.input`
  border: 1px solid ${(props) => props.theme.container.blue};
  width: 70%;
  border-radius: 5px;
  height: 26px;
  background-color: ${(props) => props.theme.container.lightBlue};
  padding: 0 5px;
  &:focus {
    outline: none;
  }
`;

const MeetingInfo = styled.div`
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  font-size: 14px;
  padding: 15px 10px;
  > div {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 12px;
    }
    > span {
      border: 1px solid ${(props) => props.theme.container.blue};
      background-color: ${(props) => props.theme.container.lightBlue};
      color: ${(props) => props.theme.text.lightBlue};
      padding: 3px 5px;
      border-radius: 20px;
      font-size: 10px;
      font-weight: 700;
      text-align: center;
      display: block;
      margin-right: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 68px;
      svg {
        fill: ${(props) => props.theme.text.lightBlue};
        width: 14px;
        height: 14px;
        margin-left: 3px;
      }
    }
  }
  > div:last-child {
    margin-bottom: 0;
  }

  @media ${device.tablet} {
    width: 310px;
    min-height: 200px;
    font-size: 20px;
  }
`;

export default MeetingInfoBox;
