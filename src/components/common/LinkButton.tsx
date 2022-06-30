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
      padding: 0;
      border: none;
      background-color: transparent;
      font-size: 14px;
      color: ${(props) => props.theme.text.lightBlue};
    }
    svg {
      width: 14px;
      height: 14px;
      padding-top: 2px;
      fill: ${(props) => props.theme.text.lightBlue};
    }
  }

  @media ${device.tablet} {
    a {
      span {
        font-size: 16px;
      }
      svg {
        width: 16px;
        height: 14px;
        margin-left: 3px;
      }
    }
  }
`;

export default LinkButton;
