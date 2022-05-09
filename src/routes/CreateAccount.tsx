import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService } from "fbase";
import { useNavigate } from "react-router-dom";
import { Container } from "theme/globalStyle";
import { gender, bookFields } from "util/Constants";
import AccountForm from "components/AccountForm";
import BackBtn from "components/common/BackButton";
import styled from "styled-components";
import BookField from "BookField";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userGender, setUserGender] = useState("");
  const [checkedBookField, setCheckedBookField] = useState(new Set());
  const [error, setError] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(authService, email, password);
      navigate("/");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const onChange = async (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = event;
    if (name === "username") {
      setUsername(value);
    } else if (name === "gender") {
      setUserGender(value);
    }
  };

  const checkedBoxHandler = (fieldName: string, checked: boolean) => {
    if (checked) {
      checkedBookField.add(fieldName);
      setCheckedBookField(checkedBookField);
    } else if (!checked && checkedBookField.has(fieldName)) {
      checkedBookField.delete(fieldName);
      setCheckedBookField(checkedBookField);
    }
  };

  return (
    <Container>
      <BackBtn />
      {userInfo ? (
        <UserInfoForm onSubmit={onSubmit}>
          <span>개인 정보를 입력해주세요.</span>
          <div>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              name="username"
              placeholder="이름을 입력해주세요."
              onChange={onChange}
              value={username}
              required
            />
          </div>
          <Info>성별</Info>
          <fieldset>
            {gender.map((item) => (
              <div key={item}>
                <label htmlFor={item}>{item}</label>
                <input
                  id={item}
                  type="radio"
                  name="gender"
                  value={userGender}
                  onChange={onChange}
                  required
                />
              </div>
            ))}
          </fieldset>
          <Info>관심 분야</Info>
          <fieldset>
            {bookFields.map((item, index) => (
              <BookField
                key={index}
                bookFieldName={item.name}
                checkedBoxHandler={checkedBoxHandler}
              />
            ))}
          </fieldset>
          <Button type="submit" value="계정 생성" />
        </UserInfoForm>
      ) : (
        <AccountForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          checkPassword={checkPassword}
          setCheckPassword={setCheckPassword}
          onSubmit={onSubmit}
          error={error}
          setUserInfo={setUserInfo}
        />
      )}
    </Container>
  );
};

const UserInfoForm = styled.form`
  margin-top: 30px;
  > span:first-child {
    display: block;
    font-weight: 700;
    margin-bottom: 20px;
  }
  > fieldset {
    margin-bottom: 20px;
    border: 1px solid ${(props) => props.theme.text.lightGray};
    border-radius: 5px;
    padding: 5px 10px 0;
    background-color: ${(props) => props.theme.text.white};
    > div {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      > label {
        font-size: 16px;
        color: ${(props) => props.theme.text.gray};
      }
    }
  }
  > div {
    display: flex;
    flex-direction: column;
    > label {
      font-size: 12px;
      color: ${(props) => props.theme.text.gray};
      margin-bottom: 5px;
    }
    > input {
      width: 100%;
      height: 35px;
      border-radius: 5px;
      border: 1px solid ${(props) => props.theme.text.lightGray};
      padding: 10px;
      margin-bottom: 10px;
      &::placeholder {
        font-size: 16px;
      }
    }
  }
`;
const Info = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.theme.text.gray};
`;

const Button = styled.input`
  text-align: center;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.theme.container.yellow};
  color: ${(props) => props.theme.text.lightBlue};
  font-weight: 700;
  margin-bottom: 30px;
  cursor: pointer;
`;

export default CreateAccount;
