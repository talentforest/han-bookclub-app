import styled from "styled-components";
import { titleType } from "./LinkButton";

const Subtitle = ({ title }: titleType) => {
  return <Sub>{title}</Sub>;
};

const Sub = styled.h1`
  display: flex;
  align-items: center;
  width: fit-content;
  margin: 30px 15px 5px;
  font-weight: 700;
  cursor: pointer;
`;

export default Subtitle;
