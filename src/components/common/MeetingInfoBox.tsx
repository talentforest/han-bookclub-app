import { AccessTime, Place } from "@mui/icons-material";
import { meetingType } from "routes/BookMeeting";
import { meetingTimestamp } from "util/timestamp";
import styled from "styled-components";
import device from "theme/mediaQueries";

interface PropsType {
  docData: meetingType;
}

const MeetingInfoBox = ({ docData }: PropsType) => {
  return (
    <MeetingInfo>
      <div>
        <span>
          모임시간
          <AccessTime />
        </span>
        <p>
          {docData?.time
            ? meetingTimestamp(docData?.time)
            : "정해진 모임 시간이 없습니다."}
        </p>
      </div>
      <div>
        <span>
          모임장소
          <Place />
        </span>
        <p>
          {docData?.place ? docData?.place : "정해진 모임 장소가 없습니다."}
        </p>
      </div>
    </MeetingInfo>
  );
};

const MeetingInfo = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  font-size: 14px;
  margin-top: 20px;
  padding: 15px 10px;
  > div {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 14px;
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
    padding: 10px;
    margin: 20px 0;
    > div {
      p {
        font-size: 15px;
      }
      > span {
        font-size: 12px;
        width: fit-content;
        padding: 4px 6px;
        svg {
          fill: ${(props) => props.theme.text.lightBlue};
          width: 12px;
          height: 12px;
          margin-left: 3px;
        }
      }
    }
  }
`;

export default MeetingInfoBox;
