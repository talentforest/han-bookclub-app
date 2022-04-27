import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService } from "fbase";
import { useNavigate } from "react-router-dom";
import AccountForm from "components/AccountForm";
import styled from "styled-components";
import BackBtn from "components/BackButton";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await createUserWithEmailAndPassword(
        authService,
        email,
        password
      );
      navigate("/");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <>
      <BackBtn />
      <Desc>사용하실 계정 정보를 입력해 주세요.</Desc>
      <AccountForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
        value="계정 생성하기"
        error={error}
      />
    </>
  );
};

const Desc = styled.span`
  font-weight: 700;
  display: block;
  text-align: center;
  padding: 28px 0;
  color: ${(props) => props.theme.text.lightBlue};
`;

export default CreateAccount;
