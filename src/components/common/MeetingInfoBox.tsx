import { BigBox } from "theme/globalStyle";
import styled from "styled-components";

const MeetingInfoBox = () => {
  return (
    <MeetingInfo>
      <span>모임시간</span>
      <span>6월 19일 일요일 오후 14:00</span>
      <span>모임장소</span>
      <span>카페꼼마 삼일빌딩점</span>
    </MeetingInfo>
  );
};

const MeetingInfo = styled(BigBox)`
  font-size: 14px;
  > span:nth-child(1),
  > span:nth-child(3) {
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
  > span:nth-child(3) {
    margin-top: 20px;
  }
`;

export default MeetingInfoBox;
