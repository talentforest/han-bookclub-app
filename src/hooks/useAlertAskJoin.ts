import { authService } from "fbase";
import { useNavigate } from "react-router-dom";

const useAlertAskJoin = () => {
  const navigate = useNavigate();

  function alertAskJoinMember() {
    if (authService.currentUser.isAnonymous) {
      const confirm = window.confirm(
        "한페이지 멤버가 되셔야 등록할 수 있습니다. 아주 간단하게 가입하시겠어요?"
      );
      if (confirm) {
        navigate("/create_account");
        return;
      }
    }
  }

  return { alertAskJoinMember };
};

export default useAlertAskJoin;
