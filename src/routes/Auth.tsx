import { ReactComponent as Google } from "assets/google-brands.svg";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "fbase";
import { Link } from "react-router-dom";
import AccountForm from "components/AccountForm";
import styled from "styled-components";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await signInWithEmailAndPassword(
        authService,
        email,
        password
      );
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const onSocialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
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
    <Main>
      <H1>한겨레 독서모임</H1>
      <Logo />
      <AccountForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
        value="로그인"
        error={error}
      />
      <SocialLogIn name="google" onClick={onSocialClick}>
        <Google width="10" height="10" fill="#fff" />
        <span>Google로 계속</span>
      </SocialLogIn>
      <Info>
        <Link to="/find_id">아이디 찾기</Link>
        <Link to="/find_pw">비밀번호 찾기</Link>
        <Link to="/create_account">회원가입</Link>
      </Info>
      <Footer>&copy; {new Date().getFullYear()} Han Book Club </Footer>
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const H1 = styled.h1`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  padding: 24px 0;
  color: ${(props) => props.theme.text.lightBlue};
`;
const Logo = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px 0 30px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.container.lightBlue};
`;
const SocialLogIn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 35px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.theme.container.blue};
  margin-bottom: 50px;
  cursor: pointer;
  span {
    color: ${(props) => props.theme.text.white};
    margin-left: 10px;
  }
`;
const Info = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 70%;
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

export default Auth;
