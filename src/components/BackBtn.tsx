import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BackBtn = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };
  return <Back onClick={onClick}>뒤로가기</Back>;
};

const Back = styled.button`
  border: none;
  height: 30px;
  background-color: transparent;
  margin: 20px 0 0 15px;
  font-size: 12px;
`;

export default BackBtn;
