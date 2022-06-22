import styled from "styled-components";
import device from "./mediaQueries";

export const Header = styled.header`
  color: ${(props) => props.theme.text.gray};
  font-weight: 700;
  display: flex;
  align-items: center;
  height: 40px;
  margin-top: 10px;
  padding: 0 15px;
  @media ${device.tablet} {
    padding: 60px 80px 20px;
    font-size: 24px;
  }
`;

export const ButtonHeader = styled(Header)`
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
    svg {
      fill: ${(props) => props.theme.text.lightBlue};
      width: 16px;
      height: 16px;
      margin-right: 3px;
    }
  }
`;

export const Container = styled.main`
  min-height: 100vh;
  padding: 0 15px;
  @media ${device.mobile} {
    padding: 10px 15px 80px;
  }
  @media ${device.tablet} {
    padding: 30px 100px 0px;
  }
  @media ${device.desktop} {
    padding: 70px 200px 0px;
  }
`;

export const SubmitBtn = styled.input`
  border: none;
  background-color: ${(props) => props.theme.container.blue};
  color: ${(props) => props.theme.text.white};
  font-size: 13px;
  width: 65px;
  height: 28px;
  border-radius: 5px;
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  > a {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 10px;
    background-color: ${(props) => props.theme.text.lightBlue};
    color: ${(props) => props.theme.container.yellow};
    font-weight: 700;
    font-size: 13px;
  }
`;

export const Desc = styled.h4`
  display: block;
  font-weight: 700;
  font-size: 14px;
  margin: 10px 0;
`;

export const Input = styled.input`
  &[type="password"],
  &[type="email"],
  &[type="text"] {
    border: none;
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.container.lightBlue};
    padding: 10px;
    margin-bottom: 10px;
    &::placeholder {
      font-size: 14px;
    }
    &:focus {
      outline: 2px solid ${(props) => props.theme.container.yellow};
      border: none;
    }
  }
  @media ${device.tablet} {
    &[type="password"],
    &[type="email"],
    &[type="text"] {
      height: 60px;
      margin-bottom: 15px;
      font-size: 20px;
      &::placeholder {
        font-size: 20px;
      }
    }
  }
`;

export const Button = styled.input`
  text-align: center;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.theme.container.yellow};
  color: ${(props) => props.theme.text.lightBlue};
  font-weight: 700;
  margin: 10px 0;
  cursor: pointer;
  @media ${device.tablet} {
    height: 50px;
    font-size: 20px;
  }
`;
