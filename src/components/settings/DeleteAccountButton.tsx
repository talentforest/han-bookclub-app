import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import { authService, dbService } from "fbase";
import { deleteDoc, doc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import styled from "styled-components";

const DeleteAccountButton = () => {
  const userData = useRecoilValue(currentUserState);
  const navigate = useNavigate();
  const onDeleteClick = async () => {
    const user = authService.currentUser;
    const checkDeleteAccount = window.confirm(
      "정말 탈퇴하시겠어요? 탈퇴할 시 회원님의 데이터는 모두 삭제되며, 관련된 데이터는 복구 불가능합니다."
    );
    try {
      if (checkDeleteAccount === true) {
        const UserDataRef = doc(dbService, "User Data", `${userData.uid}`);
        await deleteDoc(UserDataRef);
        deleteUser(user);
        navigate("/");
      } else {
        return;
      }
    } catch (error) {
      window.alert(
        "로그인한지 오래되어 인증토큰이 만료되었습니다. 재로그인시 탈퇴가 가능합니다."
      );
    }
  };
  return <DeleteBtn onClick={onDeleteClick}>탈퇴</DeleteBtn>;
};

const DeleteBtn = styled.button`
  border: none;
  background-color: transparent;
`;

export default DeleteAccountButton;
