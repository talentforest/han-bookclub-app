import { titleType } from "./LinkButton";
import styled from "styled-components";
import device from "theme/mediaQueries";

const Subtitle = ({ title }: titleType) => {
  return <Sub>{title}</Sub>;
};

const Sub = styled.h3`
  display: flex;
  align-items: center;
  width: fit-content;
  margin: 0px 15px 10px;
  font-weight: 700;
  @media ${device.tablet} {
    font-size: 18px;
  }
  @media ${device.desktop} {
    font-size: 18px;
  }
`;

export default Subtitle;
