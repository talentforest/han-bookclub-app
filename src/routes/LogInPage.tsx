import { ReactComponent as GoogleIcon } from "assets/google-brands.svg";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "fbase";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, Form, Input, Button } from "theme/commonStyle";

const LogInPage = () => {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  const onSocialAccountClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const {
      currentTarget: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
      await signInWithPopup(authService, provider);
    }
  };

  return (
    <Container>
      <H1>한 페이지</H1>
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
      </Form>
      <SocialLogIn name="google" onClick={onSocialAccountClick}>
        <GoogleIcon />
        <span>Google로 계속</span>
      </SocialLogIn>
      <FindCreateAccount>
        <Link to="/find_id">아이디 찾기</Link>
        <Link to="/find_pw">비밀번호 찾기</Link>
        <Link to="/create_account">회원가입</Link>
      </FindCreateAccount>
      <Footer>&copy; {new Date().getFullYear()} Book Club: Han Page </Footer>
    </Container>
  );
};

const H1 = styled.h1`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  padding: 20px 0 10px;
  color: ${(props) => props.theme.text.lightBlue};
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 100px;
    height: 100px;
    margin: 10px 0 30px;
    border-radius: 50px;
    background-color: ${(props) => props.theme.container.lightBlue};
  }
`;

const SocialLogIn = styled.button`
  text-align: center;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.theme.container.blue};
  margin-bottom: 30px;
  cursor: pointer;
  span {
    color: ${(props) => props.theme.text.white};
    margin-left: 10px;
  }
  svg {
    width: 10px;
    height: 10px;
    fill: #fff;
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  padding-bottom: 10px;
`;

const FindCreateAccount = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 40px;
  a {
    border: none;
    background-color: transparent;
    font-size: 10px;
    text-decoration: underline;
    color: ${(props) => props.theme.text.gray};
    cursor: pointer;
  }
`;
const Footer = styled.footer`
  text-align: center;
  font-size: 10px;
`;

export default LogInPage;
