import { useState } from "react";
import { Container } from "theme/commonStyle";
import BackButtonHeader from "components/common/BackButtonHeader";
import UserDataInputForm from "components/loginForm/UserDataInputForm";
import AccountForm from "components/loginForm/AccountForm";

const CreateAccount = () => {
  const [isShowingUserDataInput, setIsShowingUserDataInput] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  return (
    <>
      <BackButtonHeader title="계정 생성하기" />
      <Container>
        {!isShowingUserDataInput ? (
          <AccountForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            checkPassword={checkPassword}
            setCheckPassword={setCheckPassword}
            setIsShowingUserDataInput={setIsShowingUserDataInput}
          />
        ) : (
          <UserDataInputForm email={email} password={password} />
        )}
      </Container>
    </>
  );
};

export default CreateAccount;
