import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const Loading = () => {
  return (
    <Load>
      <CircularProgress thickness={4} />
    </Load>
  );
};

const Load = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
    height: 50px;
  }
`;

export default Loading;
