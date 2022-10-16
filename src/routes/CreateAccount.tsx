import { useState } from "react";
import AccountForm from "components/login/AccountForm";
import UserDataInputForm from "components/login/UserDataInputForm";

const CreateAccount = () => {
  const [isShowingUserDataInput, setIsShowingUserDataInput] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  return (
    <>
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
    </>
  );
};

export default CreateAccount;
