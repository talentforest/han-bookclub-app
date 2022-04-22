import { MediumBox } from "theme/globalStyle";
import styled from "styled-components";

const VoteInfoBox = () => {
  return (
    <InfoBox>
      <span>모임날짜</span>
    </InfoBox>
  );
};

const InfoBox = styled(MediumBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

export default VoteInfoBox;
