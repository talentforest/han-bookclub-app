import styled from "styled-components";
import device from "./mediaQueries";

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

export const Container = styled.main`
  padding: 10px 20px 100px;

  @media ${device.tablet} {
    padding: 20px 80px 100px;
  }
  @media ${device.desktop} {
    padding: 20px 160px 100px;
  }
`;

export const SubmitBtn = styled.input`
  border: none;
  background-color: ${(props) => props.theme.container.blue};
  color: ${(props) => props.theme.text.white};
  font-size: 16px;
  padding: 8px 10px;
  border-radius: 5px;
  cursor: pointer;
  @media ${device.tablet} {
    font-size: 18px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  > a {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 10px;
    background-color: ${(props) => props.theme.text.lightBlue};
    color: ${(props) => props.theme.container.yellow};
    font-weight: 700;
    font-size: 16px;
  }
  @media ${device.tablet} {
    a {
      height: 64px;
      font-size: 22px;
    }
  }
`;

export const Desc = styled.h4`
  display: block;
  font-weight: 700;
  font-size: 14px;
  margin: 10px 0;
  color: ${(props) => props.theme.text.gray};
  @media ${device.tablet} {
    font-size: 18px;
  }
`;

export const Input = styled.input`
  &[type="password"],
  &[type="email"],
  &[type="text"],
  &[type="submit"] {
    border: none;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.container.lightBlue};
    padding: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    &:focus {
      outline: 2px solid ${(props) => props.theme.container.yellow};
      border: none;
    }
  }
  @media ${device.tablet} {
    &[type="password"],
    &[type="email"],
    &[type="text"],
    &[type="submit"] {
      height: 70px;
      margin-bottom: 20px;
      font-size: 20px;
    }
  }
`;

export const Button = styled.input`
  text-align: center;
  width: 100%;
  height: 44px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.theme.container.yellow};
  color: ${(props) => props.theme.text.lightBlue};
  font-weight: 700;
  font-size: 16px;
  margin: 5px 0;
  cursor: pointer;
  @media ${device.tablet} {
    height: 64px;
    font-size: 22px;
  }
`;
