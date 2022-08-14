import { useState } from "react";
import { authService } from "fbase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Container, Desc, Input } from "theme/commonStyle";
import BackButtonHeader from "components/header/BackButtonHeader";
import styled from "styled-components";
import device from "theme/mediaQueries";

const ResetPasswordEmail = () => {
  const [email, setEmail] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendPasswordResetEmail(authService, email).catch((error) => {
      console.log(error);
    });

    setSubmitSuccess(true);
    setEmail("");
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSubmitSuccess(false);
    setEmail(event.currentTarget.value);
  };

  return (
    <>
      <BackButtonHeader title="비밀번호 찾기" />
      <Container>
        <Desc>비밀번호가 생각나지 않으세요?</Desc>
        <Detail>
          가입할 때 사용하신 계정 이메일을 적어주세요. <br />
          해당 이메일에 비밀번호 재설정 링크를 전송해 드릴게요.
        </Detail>
        <InputForm onSubmit={onSubmit}>
          <Input
            type="email"
            value={email}
            placeholder="계정 이메일을 적어주세요."
            onChange={onChange}
            required
          />
          <Input type="submit" value="전송하기" />
        </InputForm>
        {submitSuccess ? (
          <Message>
            해당 이메일에 성공적으로 전송되었습니다.
            <br /> 수신함에 메일이 보이지 않는다면 스팸을 확인해주세요.
          </Message>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

const Detail = styled.p`
  font-size: 12px;
  margin-bottom: 15px;
  line-height: 1.5;
  color: ${(props) => props.theme.text.lightBlue};
  @media ${device.tablet} {
    font-size: 18px;
  }
`;

const Message = styled(Detail)`
  color: #666;
  font-size: 10px;
  margin: 10px 0;
  text-align: end;
`;

const InputForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > input:first-child {
    margin: 0 5px 0 0;
    width: 78%;
  }
  > input:last-child {
    margin: 0;
    width: fit-content;
    font-size: 14px;
    background-color: ${(props) => props.theme.container.blue};
    color: #fff;
  }
  @media ${device.tablet} {
    > input:first-child {
      margin: 0 15px 0 0;
      width: 80%;
    }
    > input:last-child {
      width: 20%;
      font-size: 20px;
      margin: 0;
    }
  }
`;
export default ResetPasswordEmail;
