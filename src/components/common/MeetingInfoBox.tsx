import { MediumBox } from "theme/commonStyle";
import { ReactComponent as ClockIcon } from "assets/calendar_month.svg";
import { ReactComponent as PlaceIcon } from "assets/place.svg";
import styled from "styled-components";
import device from "theme/mediaQueries";

const MeetingInfoBox = () => {
  return (
    <MeetingInfo>
      <div>
        <span>모임시간</span>
        <div>
          <span>6월 19일 일요일 오후 14:00</span>
          <ClockIcon />
        </div>
      </div>
      <div>
        <span>모임장소</span>
        <div>
          <span>카페꼼마 삼일빌딩점</span>
          <PlaceIcon />
        </div>
      </div>
    </MeetingInfo>
  );
};

const MeetingInfo = styled(MediumBox)`
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 14px;
  padding: 15px 10px;
  width: 100%;
  svg {
    width: 20px;
    height: 20px;
  }
  > div {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    > span {
      background-color: ${(props) => props.theme.container.lightBlue};
      padding: 3px 8px;
      border-radius: 20px;
      font-size: 10px;
      font-weight: 700;
      display: block;
      width: 62px;
      margin-right: 7px;
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
  }
  > div:last-child {
    margin-bottom: 0;
  }

  @media ${device.tablet} {
    width: 310px;
    min-height: 200px;
    font-size: 20px;
    svg {
      width: 26px;
      height: 26px;
    }
    > span {
      font-size: 16px;
      margin: 10px 0px;
    }
  }
`;

export default MeetingInfoBox;
