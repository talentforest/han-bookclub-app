import { Container } from "theme/commonStyle";
import { Header } from "./Setting";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { authService, storageService } from "fbase";
import { LogInUserInfo } from "components/App";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
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
  const [beforeOnChange, setBeforeOnChange] = useState(true);
  const [profileImgUrl, setProfileImgUrl] = useState("");
  const [newDisplayName, setNewDisplayName] = useState(
    loggedInUserObj.displayName
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let userImageUrl = loggedInUserObj.photoURL;
    if (profileImgUrl !== "") {
      const fileRef = ref(storageService, `${loggedInUserObj.uid}/${v4()}`);
      const response = await uploadString(fileRef, profileImgUrl, "data_url");
      userImageUrl = await getDownloadURL(response.ref);
    }

    try {
      if (loggedInUserObj.displayName !== newDisplayName) {
        await updateProfile(authService.currentUser, {
          displayName: newDisplayName,
        });
      }
      await updateProfile(authService.currentUser, {
        photoURL: userImageUrl,
      });
      refreshUser();
      setEditing(false);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNewDisplayName(event.currentTarget.value);
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <>
      <NewHeader>
        <div>
          <BackButton />
          <Subtitle title="프로필 정보" />
        </div>
      </NewHeader>
      <NewContainer>
        {editing ? (
          <>
            <Form onSubmit={onSubmit}>
              <ProfileImage
                loggedInUserObj={loggedInUserObj}
                refreshUser={refreshUser}
                beforeOnChange={beforeOnChange}
                setBeforeOnChange={setBeforeOnChange}
                profileImgUrl={profileImgUrl}
                setProfileImgUrl={setProfileImgUrl}
              />
              <UserInfo>
                <li>
                  <div>
                    <span>이메일</span>
                    <span>{loggedInUserObj.email}</span>
                  </div>
                  <p>이메일은 변경할 수 없습니다. 관리자에게 문의해주세요.</p>
                </li>
                <li>
                  <span>별명</span>
                  <input
                    onChange={onChange}
                    type="text"
                    placeholder="닉네임을 입력해주세요"
                    value={newDisplayName}
                    required
                  />
                </li>
                <EditBtn type="submit" value="수정완료" />
              </UserInfo>
            </Form>
          </>
        ) : (
          <>
            <div>
              <img src={loggedInUserObj.photoURL} alt="profileimg" />
            </div>
            <EditBtn onClick={toggleEditing} type="button" value="수정하기" />
            <UserInfo>
              <li>
                <div>
                  <span>이메일</span>
                  <span>{loggedInUserObj.email}</span>
                </div>
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
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 140px;
    width: 140px;
    margin-top: 10px;
    > img {
      object-fit: cover;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: ${(props) => props.theme.container.green};
    }
  }
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
  font-weight: 700;
  padding-top: 2px;
  font-size: 12px;
`;

const UserInfo = styled.ul`
  width: 90%;
  margin: 20px auto 0;
  > li:first-child {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    > div:first-child {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > span:first-child {
        font-weight: 700;
        font-size: 12px;
      }
      > span:last-child {
        height: 25px;
      }
    }
    > p {
      font-size: 10px;
      text-align: end;
      width: 100%;
      color: #4149e1;
    }
  }
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
