import { Link } from "react-router-dom";
import styled from "styled-components";
import device from "theme/mediaQueries";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export interface titleType {
  link?: string;
  title: string;
}

const LinkButton = ({ link, title }: titleType) => {
  return (
    <ButtonBox>
      <Link to={link}>
        <span>{title}</span>
        <ArrowForwardIosIcon />
      </Link>
    </ButtonBox>
  );
};

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  a {
    margin-top: 10px;
    display: flex;
    align-items: center;
    width: fit-content;
    cursor: pointer;
    span {
      padding: 0px 0;
      border: none;
      background-color: transparent;
      font-size: 11px;
      color: ${(props) => props.theme.text.lightBlue};
    }
    svg {
      width: 12px;
      height: 10px;
      fill: ${(props) => props.theme.text.lightBlue};
    }
  }

  @media ${device.tablet} {
    button {
      font-size: 20px;
    }
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

export default LinkButton;
