import styled from "styled-components";
import device from "theme/mediaQueries";
import { titleType } from "./LinkButton";

const Subtitle = ({ title }: titleType) => {
  return <Sub>{title}</Sub>;
};

const Sub = styled.h1`
  display: flex;
  align-items: center;
  width: fit-content;
  margin: 0px 15px 10px;
  font-weight: 700;
  @media ${device.tablet} {
    font-size: 24px;
    margin-top: 40px;
  }
`;

export default Subtitle;
