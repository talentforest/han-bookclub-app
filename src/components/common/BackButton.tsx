import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import styled from "styled-components";

const BackButton = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };
  return (
    <Back>
      <ArrowBackIosNewIcon onClick={onClick} />
    </Back>
  );
};

const Back = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 18px;
    height: 18px;
    fill: ${(props) => props.theme.text.gray};
    cursor: pointer;
  }
`;

export default BackButton;
