import { BigBox } from "theme/globalStyle";
import { ReactComponent as Clock } from "assets/calendar_month.svg";
import { ReactComponent as Place } from "assets/place.svg";
// import { ReactComponent as Edit } from "assets/edit.svg";
import styled from "styled-components";

const MeetingInfoBox = () => {
  return (
    <MeetingInfo>
      <div>수정하기</div>
      <span>모임시간</span>
      <div>
        <Clock width="20" height="20" />
        <span>6월 19일 일요일 오후 14:00</span>
      </div>
      <span>모임장소</span>
      <div>
        <Place width="20" height="20" />
        <span>카페꼼마 삼일빌딩점</span>
      </div>
    </MeetingInfo>
  );
};

const MeetingInfo = styled(BigBox)`
  position: relative;
  font-size: 14px;
  > div:first-child {
    position: absolute;
    right: 15px;
    font-size: 12px;
    color: ${(props) => props.theme.text.gray};
  }
  > span {
    width: fit-content;
    padding: 3px 8px;
    margin: 5px 0 10px;
    display: flex;
    align-items: center;
    border-radius: 20px;
    background-color: ${(props) => props.theme.container.yellow};
    font-size: 13px;
    color: ${(props) => props.theme.text.gray};
  }
  > div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    svg {
      margin-right: 3px;
    }
  }
`;

export default MeetingInfoBox;
