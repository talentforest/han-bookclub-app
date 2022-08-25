import { useNavigate } from "react-router-dom";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { authService, dbService } from "fbase";
import { deleteDoc, doc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { useState } from "react";
import { Button, Container, Desc, Input } from "theme/commonStyle";
import styled from "styled-components";

const DeleteAccount = () => {
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const userData = useRecoilValue(currentUserState);
  const navigate = useNavigate();

  const onDeleteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === "") return;
    const user = authService.currentUser;
    const credential = EmailAuthProvider.credential(user?.email, password);
    try {
      const checkDeleteAccount = window.confirm("정말 탈퇴하시겠어요?");
      if (checkDeleteAccount === true) {
        reauthenticateWithCredential(user, credential)
          .then(() => {
            const UserDataRef = doc(dbService, "User Data", `${userData.uid}`);
            deleteDoc(UserDataRef);
            deleteUser(user);
            navigate("/");
          })
          .catch((error) => {
            if (error.message.includes("wrong-password")) {
              setShowMessage(true);
            }
          });
      } else {
        window.alert("취소되었습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <Container>
      <Desc>
        탈퇴할 시 회원님의 데이터는 즉시 모두 삭제되며, 데이터는 복구
        불가능합니다.
      </Desc>
      <form onSubmit={onDeleteSubmit}>
        {showMessage ? <Msg>비밀번호가 맞지 않습니다.</Msg> : <></>}
        <Input
          type="password"
          placeholder="현재 비밀번호를 입력해주세요."
          value={password}
          onChange={onChange}
          autoComplete="true"
          required
        />
        <Button type="submit" value="탈퇴하기" />
      </form>
    </Container>
  );
};

const Msg = styled.span`
  font-size: 13px;
  color: ${(props) => props.theme.text.lightBlue};
  margin-bottom: 3px;
  display: block;
`;

export default DeleteAccount;
