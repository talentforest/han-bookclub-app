import { useState } from "react";
import { Button, Container, Desc, Form, Input } from "theme/commonStyle";
import device from "theme/mediaQueries";
import BackButtonHeader from "components/header/BackButtonHeader";
import styled from "styled-components";

interface PropsType {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  checkPassword: string;
  setCheckPassword: (checkPassword: string) => void;
  setIsShowingUserDataInput: (isShowingUserDataInput: boolean) => void;
}

const AccountForm = ({
  email,
  setEmail,
  password,
  setPassword,
  checkPassword,
  setCheckPassword,
  setIsShowingUserDataInput,
}: PropsType) => {
  const [emailMessage, setEmailMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [accountMessage, setAccountMessage] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (password !== checkPassword) {
        setErrorMessage("비밀번호가 일치하지 않아요.");
        return;
      } else {
        window.alert(
          "다음 단계에서 간단한 정보를 작성하시면 회원가입이 완료됩니다!"
        );
        setIsShowingUserDataInput(true);
      }
    } catch (error) {
      if ((error as Error).message.includes("email-already-in-use"))
        return setAccountMessage(
          "이미 사용되고 있는 이메일 계정입니다. 다른 이메일을 사용해주세요."
        );
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
      setEmailMessage(
        "유효한 이메일을 작성하셔야 비밀번호 찾기 등 다른 기능을 제대로 이용할 수 있어요. 이메일이 맞는지 다시 한번 확인해주세요."
      );
      setAccountMessage("");
    } else if (name === "password") {
      setPassword(value);
      setEmailMessage("");
      setErrorMessage("");
    } else if (name === "checkPassword") {
      setCheckPassword(value);
    }
  };

  return (
    <>
      <BackButtonHeader title="계정 생성하기" />
      <Container>
        <Desc>사용하실 계정 정보를 입력해 주세요.</Desc>
        <Form onSubmit={onSubmit}>
          <EmailMessage>{emailMessage}</EmailMessage>
          <Input
            name="email"
            type="email"
            placeholder="자주 사용하는 이메일 계정을 입력해주세요."
            value={email}
            onChange={onChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="비밀번호는 8자 이상이어야 합니다."
            value={password}
            onChange={onChange}
            autoComplete="on"
            required
          />
          <Input
            name="checkPassword"
            type="password"
            placeholder="비밀번호를 다시 한번 입력해주세요."
            value={checkPassword}
            onChange={onChange}
            autoComplete="on"
            required
          />
          <Message>{errorMessage}</Message>
          <Message>{accountMessage}</Message>
          <Button type="submit" value="계정 생성하기" />
        </Form>
      </Container>
    </>
  );
};

const Message = styled.span`
  font-size: 12px;
  font-weight: 700;
  width: 100%;
  text-align: start;
  padding-left: 3px;
  color: ${(props) => props.theme.text.accent};
  @media ${device.tablet} {
    font-size: 16px;
    margin-top: 10px;
  }
`;

const EmailMessage = styled(Message)`
  line-height: 1.6;
  margin-bottom: 4px;
  @media ${device.tablet} {
    font-size: 20px;
    margin-top: 10px;
  }
`;
export default AccountForm;
