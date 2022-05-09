import { Button, Desc, Form, Input } from "theme/commonStyle";

interface propsType {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  checkPassword: string;
  setCheckPassword: (checkPassword: string) => void;
  setIsShowingUserDataInput: (isShowingUserDataInput: boolean) => void;
}

const AccountForm = ({
  email,
  setEmail,
  password,
  setPassword,
  checkPassword,
  setCheckPassword,
  setIsShowingUserDataInput,
}: propsType) => {
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "checkPassword") {
      setCheckPassword(value);
    }
  };

  const onNextStepClick = () => {
    try {
      if (password !== checkPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      } else {
        setIsShowingUserDataInput(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Desc>사용하실 계정 정보를 입력해 주세요</Desc>
      <Form>
        <Input
          name="email"
          type="email"
          placeholder="자주 사용하는 이메일 계정을 입력해주세요."
          value={email}
          onChange={onChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호는 8자 이상이어야 합니다."
          value={password}
          onChange={onChange}
          autoComplete="on"
          required
        />
        <Input
          name="checkPassword"
          type="password"
          placeholder="비밀번호를 다시 한번 입력해주세요."
          value={checkPassword}
          onChange={onChange}
          autoComplete="on"
          required
        />
        <Button defaultValue="다음으로" onClick={onNextStepClick} />
      </Form>
    </>
  );
};

export default AccountForm;
