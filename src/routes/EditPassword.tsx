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
import { useNavigate } from "react-router-dom";

const EditPassword = () => {
  const [originPassword, setOriginPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");
  const user = authService?.currentUser;
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (originPassword === "" || newPassword === "" || checkNewPassword === "")
      return;

    const credential = EmailAuthProvider.credential(
      user?.email,
      originPassword
    );
    reauthenticateWithCredential(user, credential)
      .then(() => {
        if (newPassword !== checkNewPassword) {
          window.alert(
            "새로운 비밀번호가 같지 않습니다. 다시 한번 확인해주세요."
          );
          return;
        }
        updatePassword(user, newPassword)
          .then(() => {
            window.alert("비밀번호가 성공적으로 변경되었습니다.");
            setOriginPassword("");
            setNewPassword("");
            setCheckNewPassword("");
            navigate(-1);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        window.alert(
          "기존의 비밀번호가 맞지 않습니다. 다시 한번 확인해주세요."
        );
      });
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
