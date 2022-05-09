import styled from "styled-components";

interface propsType {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  checkPassword: string;
  setCheckPassword: (checkPassword: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  setUserInfo: (userInfo: boolean) => void;
}

const AccountForm = ({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  error,
  checkPassword,
  setCheckPassword,
  setUserInfo,
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
        alert("비밀번호를 다시 한번 확인해주세요!");
        return;
      } else {
        setUserInfo(true);
      }
    } catch (error) {
      console.error("password error!");
    }
  };

  return (
    <>
      <Desc>사용하실 계정 정보를 입력해 주세요.</Desc>
      <Form onSubmit={onSubmit}>
        <INPUT
          name="email"
          type="text"
          placeholder="자주 사용하는 이메일 계정을 입력해주세요."
          value={email}
          onChange={onChange}
          required
        />
        <INPUT
          name="password"
          type="password"
          placeholder="비밀번호는 8자 이상이어야 합니다."
          value={password}
          onChange={onChange}
          autoComplete="on"
          required
        />
        <INPUT
          name="checkPassword"
          type="password"
          placeholder="비밀번호를 다시 한번 입력해주세요."
          value={checkPassword}
          onChange={onChange}
          autoComplete="on"
          required
        />
        <Error>{error}</Error>
        <Button defaultValue="다음으로" onClick={onNextStepClick} />
      </Form>
    </>
  );
};

const Desc = styled.span`
  font-weight: 700;
  display: block;
  text-align: center;
  padding: 28px 0;
  color: ${(props) => props.theme.text.lightBlue};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const INPUT = styled.input`
  width: 250px;
  height: 35px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.text.gray};
  padding: 10px;
  margin-bottom: 10px;
  &::placeholder {
    font-size: 12px;
  }
`;
const Error = styled.span`
  font-size: 12px;
  padding-bottom: 10px;
`;
const Button = styled.input`
  width: 250px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.theme.container.yellow};
  color: ${(props) => props.theme.text.lightBlue};
  font-weight: 700;
  margin-bottom: 30px;
  cursor: pointer;
  text-align: center;
`;

export default AccountForm;
