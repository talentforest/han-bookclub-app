import { MediumBox } from "theme/commonStyle";
import styled from "styled-components";

const VoteBox = () => {
  return (
    <Vote>
      <span>모임날짜</span>
    </Vote>
  );
};

const Vote = styled(MediumBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

export default VoteBox;
