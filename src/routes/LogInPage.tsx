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
      if ((error as Error).message.includes("user-not-found"))
        return setError("해당 유저의 정보를 찾을 수 없습니다.");

      if ((error as Error).message.includes("password"))
        return setError("비밀번호가 일치하지 않습니다.");
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
      <Footer>
        <Link to="/find_pw">비밀번호 찾기</Link>
        <h3>&copy; 2022 Book Club: Han Page </h3>
      </Footer>
    </NewContainer>
  );
};

const NewContainer = styled(Container)`
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media ${device.tablet} {
    padding: 20px 80px 60px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
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
    width: 150px;
    height: 150px;
    margin: 10px 0 20px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.container.lightBlue};
  }
  @media ${device.tablet} {
    div {
      width: 230px;
      height: 230px;
    }
  }
`;

export const ErrorMessage = styled.span`
  font-size: 13px;
  font-weight: 700;
  padding: 0 30px 10px;
  color: ${(props) => props.theme.text.accent};
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 20px;
  > a {
    font-size: 12px;
    text-decoration: underline;
  }
  > h3 {
    display: block;
    margin-top: 20px;
    font-size: 13px;
  }
  @media ${device.tablet} {
    margin-top: 80px;
    > a {
      font-size: 20px;
      text-decoration: underline;
    }
    > h3 {
      display: block;
      margin-top: 40px;
      font-size: 22px;
    }
  }
`;

export default LogInPage;
