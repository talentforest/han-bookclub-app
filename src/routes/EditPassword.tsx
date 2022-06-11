import BackButtonHeader from "components/common/BackButtonHeader";
import { authService } from "fbase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useState } from "react";
import { Container, Input } from "theme/commonStyle";
import styled from "styled-components";

const EditPassword = () => {
  const [originPassword, setOriginPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");
  const user = authService?.currentUser;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (originPassword === "" || newPassword === "" || checkNewPassword === "")
      return;

    const credential = EmailAuthProvider.credential(
      authService?.currentUser?.email,
      originPassword
    );
    reauthenticateWithCredential(authService?.currentUser, credential);

    updatePassword(user, newPassword).catch((error) => {
      console.log(error);
    });

    setOriginPassword("");
    setNewPassword("");
    setCheckNewPassword("");
  };

  const onNewChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNewPassword(event.currentTarget.value);
  };
  const onOriginChange = (event: React.FormEvent<HTMLInputElement>) => {
    setOriginPassword(event.currentTarget.value);
  };
  const onCheckNewChange = (event: React.FormEvent<HTMLInputElement>) => {
    setCheckNewPassword(event.currentTarget.value);
  };
  return (
    <>
      <BackButtonHeader title="비밀번호 변경하기" />
      <Container>
        <InputForm onSubmit={onSubmit}>
          <input
            hidden
            type="text"
            autoComplete="username"
            defaultValue={user.email}
          />
          <Input
            aria-hidden
            type="password"
            value={originPassword}
            placeholder="기존 비밀번호를 작성해주세요."
            onChange={onOriginChange}
            autoComplete="current-password"
          />
          <Input
            aria-hidden
            type="password"
            value={newPassword}
            placeholder="새로운 비밀번호를 작성해주세요."
            onChange={onNewChange}
            autoComplete="new-password"
          />
          <Input
            aria-hidden
            type="password"
            value={checkNewPassword}
            placeholder="새로운 비밀번호를 다시 한번 작성해주세요."
            onChange={onCheckNewChange}
            autoComplete="new-password"
          />
          <Input type="submit" value="변경하기" />
        </InputForm>
      </Container>
    </>
  );
};

const InputForm = styled.form`
  > input:last-child {
    width: 100%;
    text-align: center;
    height: 40px;
    border: none;
    font-size: 12px;
    font-weight: 700;
    background-color: ${(props) => props.theme.container.blue};
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
  }
`;

export default EditPassword;
