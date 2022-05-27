import { useState } from "react";
import { Container } from "theme/commonStyle";
import BackBtn from "components/common/BackButton";
import UserDataInputForm from "components/loginForm/UserDataInputForm";
import AccountForm from "components/loginForm/AccountForm";
import { LogInUserInfo } from "components/App";

interface PropsType {
  userObj: LogInUserInfo;
}

const CreateAccount = ({ userObj }: PropsType) => {
  const [isShowingUserDataInput, setIsShowingUserDataInput] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  return (
    <Container>
      <BackBtn />
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
  );
};

export default CreateAccount;
