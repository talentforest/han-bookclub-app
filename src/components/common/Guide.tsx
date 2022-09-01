import { Info } from "@mui/icons-material";
import styled from "styled-components";
import device from "theme/mediaQueries";

interface PropsType {
  margin?: boolean;
  text: string;
}

const Guide = ({ margin, text }: PropsType) => {
  return (
    <Container $margin={margin}>
      <Info />
      <p>{text}</p>
    </Container>
  );
};

const Container = styled.div<{ $margin: boolean }>`
  font-size: 14px;
  margin: ${(props) => (props.$margin ? "0 15px 15px" : "0")};
  p {
    color: ${(props) => props.theme.text.gray};
  }
  svg {
    float: left;
    width: 14px;
    height: 14px;
    margin: 3px 5px 0 0;
    fill: ${(props) => props.theme.text.lightBlue};
  }
  @media ${device.tablet} {
    font-size: 16px;
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export default Guide;
