import { useNavigate } from "react-router-dom";
import { deleteUser, getAuth } from "firebase/auth";
import styled from "styled-components";

const DeleteAccountButton = () => {
  const navigate = useNavigate();
  const onDeleteClick = () => {
    const user = getAuth().currentUser;
    const checkDeleteAccount = window.confirm(
      "정말 탈퇴하시겠어요? 탈퇴할 시 회원님의 데이터는 복구 불가능합니다."
    );
    if (checkDeleteAccount === true) {
      deleteUser(user);
      navigate("/");
    } else {
      return;
    }
  };
  return <DeleteBtn onClick={onDeleteClick}>탈퇴</DeleteBtn>;
};

const DeleteBtn = styled.button`
  border: none;
  background-color: transparent;
`;

export default DeleteAccountButton;
