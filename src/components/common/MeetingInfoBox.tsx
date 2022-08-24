import { AccessTime, Place } from "@mui/icons-material";
import { IMeeting } from "util/getFirebaseDoc";
import { meetingTimestamp } from "util/timestamp";
import styled from "styled-components";
import device from "theme/mediaQueries";

interface PropsType {
  docData: IMeeting;
}

const MeetingInfoBox = ({ docData }: PropsType) => {
  return (
    <>
      {docData && (
        <MeetingInfo>
          <TimePlace>
            <div>
              <span>모임시간</span>
              <AccessTime />
            </div>
            <p>{meetingTimestamp(docData.time)}</p>
          </TimePlace>
          <TimePlace>
            <div>
              <span>모임장소</span>
              <Place />
            </div>
            <p>{docData?.place}</p>
          </TimePlace>
        </MeetingInfo>
      )}
    </>
  );
};

const MeetingInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-top: 20px;
  padding: 15px 10px;
  @media ${device.tablet} {
    padding: 20px;
  }
`;

const TimePlace = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  > p {
    font-size: 14px;
  }
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    width: 80px;
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
  }
  &:last-child {
    margin-bottom: 0;
  }
  @media ${device.tablet} {
    p {
      font-size: 15px;
    }
    > div {
      font-size: 12px;
      width: fit-content;
      padding: 4px 6px;
      svg {
        fill: ${(props) => props.theme.text.lightBlue};
        width: 16px;
        height: 16px;
      }
    }
  }
`;

export default MeetingInfoBox;
