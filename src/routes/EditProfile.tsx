import { Container } from "theme/globalStyle";
import { Header } from "./Setting";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { authService } from "fbase";
import BackButton from "components/common/BackButton";
import Subtitle from "components/common/Subtitle";
import styled from "styled-components";
import ProfileImage from "components/common/ProfileImage";

interface PropsType {
  loggedInUserObj: any;
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
          <>
            <Form onSubmit={onSubmit}>
              <input type="submit" value="수정완료" />
              <UserInfo>
                <li>
                  <span>이름</span>
                  <span>전예림</span>
                </li>
                <li>
                  <span>별명</span>
                </li>
                <input
                  onChange={onChange}
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  value={newDisplayName}
                />
              </UserInfo>
            </Form>
          </>
        ) : (
          <>
            <input onClick={toggleEditing} type="button" value="수정하기" />
            <UserInfo>
              <li>
                <span>이름</span>
                <span>전예림</span>
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

const UserInfo = styled.ul`
  width: 90%;
  margin: 20px auto 0;
  > li {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    > span:first-child {
      font-weight: 700;
      font-size: 12px;
    }
    > input {
      width: fit-content;
      border: none;
      text-align: end;
      &:focus {
        outline: none;
        &::placeholder {
        }
      }
    }
  }
`;

export default EditProfile;
