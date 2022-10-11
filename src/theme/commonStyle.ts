import styled from "styled-components";
import device from "./mediaQueries";

export const Container = styled.main`
  padding: 10px 20px 100px;
  position: relative;
  @media ${device.tablet} {
    padding: 0 80px 100px;
  }
  @media ${device.desktop} {
    padding: 0 160px 100px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    width: 100%;
    height: 50px;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.container.blue};
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
      height: 60px;
      margin-bottom: 20px;
      font-size: 18px;
    }
  }
`;

export const Button = styled.input`
  text-align: center;
  width: 100%;
  height: 44px;
  border-radius: 10px;
  border: none;
  box-shadow: 1px 2px 5px ${(props) => props.theme.boxShadow};
  background-color: ${(props) => props.theme.container.blue};
  color: ${(props) => props.theme.text.white};
  font-weight: 700;
  font-size: 16px;
  margin: 10px 0;
  cursor: pointer;
  @media ${device.tablet} {
    height: 54px;
    font-size: 20px;
  }
`;
