import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const Loading = () => {
  return (
    <Load>
      <CircularProgress thickness={4} size={50} />
    </Load>
  );
};

const Load = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loading;
