import BookField from "BookField";
import { authService, dbService } from "fbase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Desc, Input } from "theme/commonStyle";
import { bookFields, gender } from "util/Constants";
import { addDoc, collection } from "firebase/firestore";
import styled from "styled-components";

interface PropsType {
  email: string;
  password: string;
}

const UserDataInputForm = ({ email, password }: PropsType) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userGender, setUserGender] = useState("");
  const [checkedBookField, setCheckedBookField] = useState(new Set(""));

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username && userGender && checkedBookField.size !== 0) {
      try {
        await createUserWithEmailAndPassword(authService, email, password);
        await addDoc(collection(dbService, "User_Data"), {
          favoriteBookField: `${Array.from(checkedBookField)}`,
          gender: userGender,
          name: username,
        });
        navigate("/");
      } catch (error) {
        console.error((error as Error).message);
      }
    } else {
      alert("입력하신 정보를 다시 한번 확인해주세요.");
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
    // console.log(`${Array.from(checkedBookField)}`);
  };

  return (
    <UserInfoForm onSubmit={onSubmit}>
      <Desc>개인 정보를 입력해주세요.</Desc>
      <div>
        <label htmlFor="name">이름</label>
        <Input
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
              value={item}
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
      {/* <Button type="button" value="저장" onClick={onSaveUserDataClick} /> */}
    </UserInfoForm>
  );
};

const UserInfoForm = styled.form`
  > fieldset {
    margin-bottom: 20px;
    border: 1px solid ${(props) => props.theme.text.lightGray};
    border-radius: 10px;
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
      &[type="checkbox"] {
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
  }
`;
const Info = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.theme.text.gray};
`;

export default UserDataInputForm;
