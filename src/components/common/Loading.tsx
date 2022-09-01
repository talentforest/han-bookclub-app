import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import device from "theme/mediaQueries";

const Loading = () => {
  return (
    <Load>
      <CircularProgress size={40} />
    </Load>
  );
};

const Load = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${device.tablet} {
  }
`;

export default Loading;
