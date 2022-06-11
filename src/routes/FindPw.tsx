import React, { useState } from "react";
import { authService } from "fbase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Container, Input } from "theme/commonStyle";
import BackButtonHeader from "components/common/BackButtonHeader";
import styled from "styled-components";

const FindPw = () => {
  const [email, setEmail] = useState("");

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendPasswordResetEmail(authService, email)
      .then(() => {
        console.log("성공");
      })
      .catch((error) => {
        console.log(error);
      });
    setEmail("");
  };

  return (
    <>
      <BackButtonHeader title="비밀번호 찾기" />
      <Container>
        <Title>비밀번호가 생각나지 않으세요?</Title>
        <Desc>
          가입할 때 사용하신 계정 이메일을 적어주세요. <br />
          해당 이메일에 비밀번호 재설정 링크를 보내드릴게요.
        </Desc>
        <InputForm onSubmit={onSubmit}>
          <Input
            type="email"
            value={email}
            placeholder="계정 이메일을 적어주세요."
            onChange={onChange}
            required
          />
          <input type="submit" value="전송하기" />
        </InputForm>
      </Container>
    </>
  );
};

const Title = styled.h4`
  font-size: 15px;
  margin-bottom: 10px;
`;

const Desc = styled.p`
  font-size: 12px;
  margin-bottom: 15px;
  line-height: 1.5;
  color: ${(props) => props.theme.text.lightBlue};
`;

const InputForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > input:first-child {
    margin: 0;
    margin-right: 5px;
    width: 78%;
  }
  > input:last-child {
    width: fit-content;
    text-align: center;
    height: 40px;
    border: none;
    font-size: 12px;
    background-color: ${(props) => props.theme.container.blue};
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
  }
`;
export default FindPw;
