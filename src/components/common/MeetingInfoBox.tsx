import { SmallBox } from "theme/globalStyle";
import styled from "styled-components";

const MeetingInfoBox = () => {
  return (
    <MeetingInfo>
      <div>Hello</div>
    </MeetingInfo>
  );
};

const MeetingInfo = styled(SmallBox)`
  margin-right: 15px;
  overflow: auto;
`;

export default MeetingInfoBox;
