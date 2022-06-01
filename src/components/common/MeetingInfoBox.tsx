import { MediumBox } from "theme/commonStyle";
import styled from "styled-components";
import device from "theme/mediaQueries";
import { AccessTime, Place } from "@mui/icons-material";

const MeetingInfoBox = () => {
  return (
    <MeetingInfo>
      <div>
        <span>
          모임시간
          <AccessTime />
        </span>
        <p>6월 19일 일요일 오후 14:00</p>
      </div>
      <div>
        <span>
          모임장소
          <Place />
        </span>
        <p>카페꼼마 삼일빌딩점</p>
      </div>
    </MeetingInfo>
  );
};

const MeetingInfo = styled(MediumBox)`
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
