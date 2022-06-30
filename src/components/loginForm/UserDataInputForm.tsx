import { authService, dbService } from "fbase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Header, Input } from "theme/commonStyle";
import { bookFields, gender } from "util/constants";
import { doc, setDoc } from "firebase/firestore";
import BookField from "components/loginForm/BookField";
import styled from "styled-components";
import device from "theme/mediaQueries";
import { createUserWithEmailAndPassword } from "firebase/auth";

export interface BookFieldType {
  id: number;
  name: string;
}

interface PropsType {
  email?: string;
  password?: string;
}

const UserDataInputForm = ({ email, password }: PropsType) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userGender, setUserGender] = useState("");
  const [checkedBookField, setCheckedBookField] = useState(new Set());

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(authService, email, password);
      if (username && userGender && checkedBookField.size !== 0) {
        await setDoc(
          doc(dbService, "User Data", `${authService?.currentUser?.uid}`),
          {
            favoriteBookField: Array.from(checkedBookField),
            gender: userGender,
            name: username,
            displayName: "한 페이지 멤버",
            photoUrl: "",
          }
        );
        window.alert(
          "회원가입이 성공적으로 완료되었습니다. 한페이지 북클럽의 멤버가 되신 것을 환영해요!"
        );
        navigate("/");
      } else {
        alert("입력하신 정보를 다시 한번 확인해주세요.");
      }
    } catch (error) {
      console.error((error as Error).message);
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

  const checkedBoxHandler = (bookFields: BookFieldType, checked: boolean) => {
    if (checked) {
      checkedBookField.add(bookFields);
      setCheckedBookField(checkedBookField);
    } else if (!checked && checkedBookField.has(bookFields)) {
      checkedBookField.delete(bookFields);
      setCheckedBookField(checkedBookField);
    }
  };

  return (
    <>
      <Header>개인정보와 취향 등록하기</Header>
      <Container>
        <UserInfoForm onSubmit={onSubmit}>
          <Info>이름</Info>
          <Input
            type="text"
            name="username"
            placeholder="이름을 입력해주세요."
            onChange={onChange}
            value={username}
            required
          />
          <Info>성별</Info>
          <FieldSet>
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
          </FieldSet>
          <Info>관심 분야</Info>
          <FieldSet>
            {bookFields.map((item, index) => (
              <BookField
                key={index}
                bookFieldName={item.name}
                bookFields={item}
                checkedBoxHandler={checkedBoxHandler}
              />
            ))}
          </FieldSet>
          <Button type="submit" value="등록하기" />
        </UserInfoForm>
      </Container>
    </>
  );
};

const UserInfoForm = styled.form`
  > div {
    display: flex;
    flex-direction: column;
    > input {
      &[type="checkbox"] {
        width: 100%;
        height: 35px;
        border-radius: 5px;
        border: 1px solid ${(props) => props.theme.text.lightGray};
        padding: 10px;
        margin-bottom: 10px;
        font-size: 16px;
      }
    }
  }
`;

const FieldSet = styled.fieldset`
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.text.white};
  border: 1px solid ${(props) => props.theme.text.lightGray};
  border-radius: 10px;
  > div {
    display: flex;
    align-items: center;
    padding: 10px 30px;
    label {
      width: 80%;
      font-size: 16px;
      color: ${(props) => props.theme.text.gray};
      cursor: pointer;
    }
    input {
      &[type="checkbox"],
      &[type="radio"] {
        width: 22px;
        height: 22px;
        border: 1px solid ${(props) => props.theme.text.lightGray};
        font-size: 18px;
        &:checked {
          content: "";
          width: 22px;
          height: 22px;
        }
      }
    }
  }
  @media ${device.tablet} {
    margin-bottom: 40px;
    > div {
      padding: 15px 30px;
    }
  }
`;

const Info = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.theme.text.gray};
  @media ${device.tablet} {
    font-size: 16px;
    margin: 20px 0 10px;
  }
`;

export default UserDataInputForm;
