import styled from "styled-components";

export const Header = styled.header`
  color: ${(props) => props.theme.text.gray};
  font-weight: 700;
  height: 40px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 500px) {
    padding: 20px 15px 10px;
  }
`;

export const Container = styled.main`
  min-height: 100vh;
  @media screen and (max-width: 500px) {
    padding: 10px 15px 80px;
  }
`;

export const Box = styled.div`
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 10px 15px;
`;

export const BigBox = styled(Box)`
  width: 290px;
  min-height: 100px;
`;

export const MediumBox = styled(Box)`
  width: 260px;
  min-height: 200px;
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

// ------------

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Desc = styled.span`
  display: block;
  font-weight: 700;
  margin: 20px 0;
`;

export const Input = styled.input`
  &[type="password"],
  &[type="email"],
  &[type="text"] {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.text.lightGray};
    padding: 10px;
    margin-bottom: 10px;
    &::placeholder {
      font-size: 14px;
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
  margin-bottom: 20px;
  cursor: pointer;
`;

export const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    height: 135px;
    width: auto;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
    margin: 10px 0;
  }
  h3 {
    font-size: 14px;
    font-weight: 600;
  }
`;
