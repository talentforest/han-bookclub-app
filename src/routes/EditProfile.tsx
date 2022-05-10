import { Container } from "theme/commonStyle";
import { Header } from "./Setting";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { authService } from "fbase";
import { LogInUserInfo } from "components/App";
import BackButton from "components/common/BackButton";
import Subtitle from "components/common/Subtitle";
import styled from "styled-components";
import ProfileImage from "components/common/ProfileImage";

interface PropsType {
  loggedInUserObj: LogInUserInfo;
  refreshUser: () => void;
}

const EditProfile = ({ loggedInUserObj, refreshUser }: PropsType) => {
  const [editing, setEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(
    loggedInUserObj.displayName
  );

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loggedInUserObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
    setEditing(false);
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNewDisplayName(event.currentTarget.value);
  };

  return (
    <>
      <NewHeader>
        <div>
          <BackButton />
          <Subtitle title="프로필 정보" />
        </div>
      </NewHeader>
      <NewContainer>
        <ProfileImage />
        {editing ? (
          <Form onSubmit={onSubmit}>
            <EditBtn type="submit" value="수정완료" />
            <UserInfo>
              <li>
                <span>이메일</span>
                <span>{loggedInUserObj.email}</span>
              </li>
              <li>
                <span>별명</span>
                <input
                  onChange={onChange}
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  value={newDisplayName}
                />
              </li>
            </UserInfo>
          </Form>
        ) : (
          <>
            <EditBtn onClick={toggleEditing} type="button" value="수정하기" />
            <UserInfo>
              <li>
                <span>이메일</span>
                <span>{loggedInUserObj.email}</span>
              </li>
              <li>
                <span>별명</span>
                <span>{newDisplayName}</span>
              </li>
            </UserInfo>
          </>
        )}
      </NewContainer>
    </>
  );
};

const NewContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NewHeader = styled(Header)`
  position: relative;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
  }
  > button {
    border: none;
    background-color: transparent;
    color: ${(props) => props.theme.text.lightBlue};
    cursor: pointer;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const EditBtn = styled.input`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.text.accent};
`;

const UserInfo = styled.ul`
  width: 90%;
  margin: 20px auto 0;
  > li {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    > span:first-child {
      font-weight: 700;
      font-size: 12px;
    }
    > span:last-child {
      height: 25px;
    }
    > input {
      width: fit-content;
      border: none;
      text-align: end;
      height: 25px;
      font-size: 16px;
      &:focus {
        outline: none;
      }
    }
  }
`;

export default EditProfile;
