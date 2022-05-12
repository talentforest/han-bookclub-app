import { Container } from "theme/commonStyle";
import { Header } from "./Setting";
import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { authService, dbService, storageService } from "fbase";
import { LogInUserInfo } from "components/App";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import { doc, getDoc } from "firebase/firestore";
import UserIcon from "assets/account_circle.svg";
import BackButton from "components/common/BackButton";
import Subtitle from "components/common/Subtitle";
import styled from "styled-components";
import ProfileImage from "components/common/ProfileImage";
import { bookFields } from "util/Constants";

interface extraUserData {
  name: string;
  gender: string;
  favoriteBookField: string;
}

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
  const [extraUserData, setExtraUserData] = useState({
    name: "",
    gender: "",
    favoriteBookField: "",
  });

  const getExtraUserData = async (uid: string) => {
    const userRef = doc(dbService, "User_Data", loggedInUserObj.uid);
    const userSnap = await getDoc(userRef);

    setExtraUserData(userSnap.data() as extraUserData);
  };

  useEffect(() => {
    getExtraUserData(loggedInUserObj.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                <List>
                  <div>
                    <span>이메일</span>
                    <span>{loggedInUserObj.email}</span>
                  </div>
                </List>
                <List>
                  <div>
                    <span>이름</span>
                    <span>{extraUserData.name}</span>
                  </div>
                  <p>
                    이메일과 이름은 변경할 수 없습니다.
                    <br /> 관리자에게 문의해주세요.
                  </p>
                </List>
                <List>
                  <div>
                    <span>별명</span>
                    <input
                      onChange={onChange}
                      type="text"
                      placeholder="닉네임을 입력해주세요"
                      value={newDisplayName}
                      required
                    />
                  </div>
                </List>
                <List>
                  <div>
                    <span>좋아하는 분야</span>
                    <span>{extraUserData.favoriteBookField}</span>
                  </div>
                  <div>
                    {bookFields.map((item) => (
                      <div key={item.id}>{item.name}</div>
                    ))}
                  </div>
                </List>
                <EditBtn type="submit" value="수정완료" />
              </UserInfo>
            </Form>
          </>
        ) : (
          <>
            <div>
              <img
                src={
                  loggedInUserObj.photoURL === null
                    ? UserIcon
                    : loggedInUserObj.photoURL
                }
                alt="profileimg"
              />
            </div>
            <EditBtn onClick={toggleEditing} type="button" value="수정하기" />
            <UserInfo>
              <List>
                <div>
                  <span>이메일</span>
                  <span>{loggedInUserObj.email}</span>
                </div>
              </List>
              <List>
                <div>
                  <span>이름</span>
                  <span>{extraUserData.name}</span>
                </div>
              </List>
              <List>
                <div>
                  <span>별명</span>
                  <span>
                    {loggedInUserObj.displayName === null
                      ? `${loggedInUserObj.email.split("@")[0]}`
                      : loggedInUserObj.displayName}
                  </span>
                </div>
              </List>
              <List>
                <div>
                  <span>좋아하는 분야</span>
                  <span>{extraUserData.favoriteBookField}</span>
                </div>
              </List>
            </UserInfo>
          </>
        )}
      </NewContainer>
    </>
  );
};

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

const UserInfo = styled.ul`
  width: 90%;
  margin: 20px auto 0;
`;

const List = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
  > div:first-child {
    padding: 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    width: 100%;
    > span:first-child {
      font-weight: 700;
      font-size: 12px;
    }
  }
  > div {
    display: flex;
    justify-content: end;
    flex-wrap: wrap;
    > div {
      border: 1px solid ${(props) => props.theme.text.lightGray};
      padding: 2px 3px;
      border-radius: 10px;
      margin: 0px 0px 8px 8px;
      font-size: 11px;
      background-color: ${(props) => props.theme.container.lightBlue};
      &:hover {
        background-color: ${(props) => props.theme.container.yellow};
      }
    }
    > input {
      text-align: end;
      border: 1px solid ${(props) => props.theme.text.lightGray};
      border-radius: 5px;
      height: 30px;
    }
  }
  > p {
    font-size: 10px;
    text-align: end;
    color: ${(props) => props.theme.text.lightBlue};
    margin-bottom: 10px;
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

export default EditProfile;
