import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import styled from "styled-components";
import { Header } from "theme/commonStyle";

interface PropsType {
  title: string;
}

const BackButtonHeader = ({ title }: PropsType) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };

  return (
    <BackHeader>
      <ArrowBackIosNewIcon onClick={onClick} />
      <h3>{title}</h3>
    </BackHeader>
  );
};

const BackHeader = styled(Header)`
  svg {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  h3 {
    margin-left: 5px;
    padding-top: 2px;
  }
`;

export default BackButtonHeader;
