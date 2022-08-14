import { AddCircleOutline, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useWindowSize from "hooks/useWindowSize";
import device, { deviceSizes } from "theme/mediaQueries";
import styled from "styled-components";

interface PropsType {
  title: string;
  button?: boolean;
  onButtonClick?: () => void;
}

const MobileHeader = ({ title, button, onButtonClick }: PropsType) => {
  const { windowSize } = useWindowSize();

  return (
    <>
      {windowSize.width < +deviceSizes.tablet && (
        <>
          {button && (
            <ButtonHeader>
              {title}
              <Link to="/setting">
                <Settings />
              </Link>
            </ButtonHeader>
          )}
          {onButtonClick && (
            <ButtonHeader>
              {title}
              <button onClick={onButtonClick}>
                <AddCircleOutline />
                투표 등록하기
              </button>
            </ButtonHeader>
          )}
          {!button && !onButtonClick && <Header>{title}</Header>}
        </>
      )}
    </>
  );
};

export const Header = styled.header`
  color: ${(props) => props.theme.text.gray};
  display: flex;
  align-items: center;
  height: 50px;
  padding: 15px;
  font-size: 16px;
  font-weight: 700;
  @media ${device.tablet} {
    font-size: 22px;
  }
`;

export const ButtonHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  button,
  a {
    display: flex;
    align-items: center;
    width: fit-content;
    font-size: 12px;
    color: ${(props) => props.theme.text.lightBlue};
    border: none;
    background-color: transparent;
    font-weight: 700;
    cursor: pointer;
    margin: 0;
    svg {
      fill: ${(props) => props.theme.text.lightBlue};
      width: 16px;
      height: 16px;
      margin-right: 3px;
    }
  }
  a {
    svg {
      fill: ${(props) => props.theme.text.default};
      width: 18px;
      height: 18px;
      margin-right: 0px;
    }
  }
  @media ${device.tablet} {
    margin: 0;
    button {
      font-size: 18px;
      svg {
        fill: ${(props) => props.theme.text.lightBlue};
        width: 18px;
        height: 18px;
        margin-right: 3px;
      }
    }
  }
`;

export default MobileHeader;
