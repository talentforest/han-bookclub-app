import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "fbase";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Input, Button } from "theme/commonStyle";
import device from "theme/mediaQueries";
import styled from "styled-components";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigator = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(authService, email, password);
      navigator("/");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <NewContainer>
      <Title>한 페이지</Title>
      <Logo>
        <div />
      </Logo>
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="이메일 계정을 입력해주세요."
          value={email}
          onChange={onChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={onChange}
          autoComplete="on"
          required
        />
        <ErrorMessage>{error}</ErrorMessage>
        <Button type="submit" value="로그인" />
        <Link to="/create_account">회원가입</Link>
      </Form>
      <div>
        <Link to="/find_pw">비밀번호 찾기</Link>
      </div>
      <Footer>&copy; 2022 Book Club: Han Page </Footer>
    </NewContainer>
  );
};

const NewContainer = styled(Container)`
  margin-bottom: 20px;
  width: 100%;
  > div {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    > a {
      font-size: 12px;
      margin: 10px 0;
      text-decoration: underline;
    }
  }
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  padding-top: 20px;
  color: ${(props) => props.theme.text.lightBlue};
  @media ${device.tablet} {
    margin-top: 50px;
    font-size: 40px;
  }
`;

const Logo = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 160px;
    height: 160px;
    margin: 10px 0 20px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.container.lightBlue};
  }
  @media ${device.tablet} {
    div {
      width: 200px;
      height: 200px;
    }
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  padding-bottom: 10px;
`;

const Footer = styled.footer`
  text-align: center;
  font-size: 10px;
  @media ${device.tablet} {
    font-size: 18px;
  }
`;

export default LogInPage;
