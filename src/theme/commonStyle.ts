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

export const Container = styled.main`
  min-height: 100vh;
  padding: 0 15px;
  margin-bottom: 50px;
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

export const Box = styled.div`
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

export const MediumBox = styled(Box)`
  /* min-height: 100px; */
  @media ${device.tablet} {
    /* min-height: 200px; */
  }
`;

export const BigBox = styled(Box)`
  width: 250px;
  min-height: 150px;
  @media ${device.tablet} {
    min-height: 200px;
  }
`;

export const ScrollContainer = styled.div`
  width: 100%;
  overflow: auto;
  margin-left: -5px;
  > div {
    width: fit-content;
    padding: 5px;
    display: flex;
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

export const TopButton = styled.button`
  width: fit-content;
  font-size: 12px;
  color: ${(props) => props.theme.text.lightBlue};
  border: none;
  background-color: transparent;
  font-weight: 700;
  cursor: pointer;
`;

export const BookCoverTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin: 0 auto;
  div {
    width: 70px;
    height: 100px;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
    margin-bottom: 10px;
    background-color: ${(props) => props.theme.container.default};
  }
  img {
    height: 100px;
    width: auto;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
    margin-bottom: 10px;
  }
  h3 {
    width: 150px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
  }
  @media ${device.tablet} {
    padding: 20px 0;
    border-radius: 10px;
    background-color: ${(props) => props.theme.container.default};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    img {
      height: 135px;
      width: auto;
      box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
    }
  }
`;
