import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import styled from "styled-components";
import { Header } from "theme/commonStyle";
import device from "theme/mediaQueries";

interface PropsType {
  title: string;
}

const BackButtonHeader = ({ title }: PropsType) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };

  return (
    <BackHeader onClick={onClick}>
      <ArrowBackIosNewIcon />
      <h3>{title}</h3>
    </BackHeader>
  );
};

const BackHeader = styled(Header)`
  width: fit-content;
  svg {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  h3 {
    margin-left: 5px;
    padding-top: 2px;
  }
  @media ${device.tablet} {
    margin-top: 30px;
    padding-left: 80px;
    svg {
      width: 22px;
      height: 22px;
      cursor: pointer;
    }
  }
  @media ${device.desktop} {
    padding-left: 160px;
  }
`;

export default BackButtonHeader;
