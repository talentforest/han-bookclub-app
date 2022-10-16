import { useState } from "react";
import {
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "fbase";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input } from "theme/commonStyle";
import device from "theme/mediaQueries";
import styled from "styled-components";

const LogIn = () => {
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
      if ((error as Error).message.includes("user-not-found"))
        return setError("해당 유저의 정보를 찾을 수 없습니다.");
      if ((error as Error).message.includes("password"))
        return setError("비밀번호가 일치하지 않습니다.");
    }
  };

  const onGuestModeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      signInAnonymously(authService);
      onAuthStateChanged(authService, (user) => {
        if (user) {
          navigator("/");
        }
      });
    } catch (error) {
      console.log(error);
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
    <Background>
      <Container>
        <Header>
          <h1>북클럽 한페이지</h1>
          <h2>자신의 책을 나누고 싶은 사람들의 모임</h2>
        </Header>
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
          <Button className="blue" name="login" type="submit" value="로그인" />
          <Button as={Link} className="orange" to="/create_account">
            회원가입
          </Button>
          <Button
            name="guestLogin"
            type="button"
            value="게스트로 입장해 한번 둘러보기"
            onClick={onGuestModeClick}
            className="purple"
          />
        </Form>
        <Footer>
          <Link to="/find_pw">비밀번호 찾기</Link>
        </Footer>
      </Container>
    </Background>
  );
};

const Background = styled.main`
  height: 100vh;
  background-image: url(https://images.unsplash.com/photo-1630343710506-89f8b9f21d31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.section`
  width: 85vw;
  @media ${device.tablet} {
    width: 400px;
  }
`;

const Header = styled.header`
  margin-bottom: 20px;
  h1 {
    font-size: 26px;
    font-weight: 700;
    text-shadow: -2px 0 #4574ff, 0 2px #4574ff, 2px 0 #4574ff, 0 -2px #4574ff;
    color: ${(props) => props.theme.container.lightBlue};
    padding-bottom: 5px;
  }
  h2 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 15px;
    color: ${(props) => props.theme.text.white};
  }
  @media ${device.tablet} {
    h1 {
      font-size: 36px;
    }
    h2 {
      margin-top: 10px;
      font-size: 24px;
    }
  }
`;

export const ErrorMessage = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${(props) => props.theme.text.white};
  margin-bottom: 20px;
  @media ${device.tablet} {
    font-size: 16px;
  }
`;

const Button = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
  background-color: ${(props) => props.theme.container.blue};
  color: ${(props) => props.theme.text.white};
  font-size: 16px;
  font-weight: 700;
  &.orange {
    background-color: ${(props) => props.theme.container.orange};
    color: ${(props) => props.theme.text.lightBlue};
  }
  &.purple {
    background-color: ${(props) => props.theme.container.purple};
    color: ${(props) => props.theme.text.default};
  }
  @media ${device.tablet} {
    height: 50px;
    font-size: 18px;
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 20px;
  > a {
    color: ${(props) => props.theme.text.white};
    font-size: 13px;
  }
  @media ${device.tablet} {
    > a {
      font-size: 16px;
    }
  }
`;

export default LogIn;
