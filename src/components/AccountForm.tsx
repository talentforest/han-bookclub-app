import styled from "styled-components";

interface propsType {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  error: string;
}

const AccountForm = ({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  value,
  error,
}: propsType) => {
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <INPUT
        name="email"
        type="text"
        placeholder="이메일 계정을 입력해주세요."
        value={email}
        onChange={onChange}
        required
      />
      <INPUT
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={onChange}
        autoComplete="on"
        required
      />
      <Error>{error}</Error>
      <Button type="submit" value={value} />
    </Form>
  );
};

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
`;
const Error = styled.span`
  font-size: 12px;
  /* display: block; */
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
  margin: 20px 0;
  cursor: pointer;
`;

export default AccountForm;
