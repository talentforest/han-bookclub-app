import { Container } from "theme/commonStyle";
import { Header } from "./Setting";
import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { authService, dbService, storageService } from "fbase";
import { LogInUserInfo } from "components/App";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { bookFields } from "util/Constants";
import { BookFieldType } from "components/UserDataInputForm";
import BackButton from "components/common/BackButton";
import Subtitle from "components/common/Subtitle";
import styled from "styled-components";
import AfterEdit from "components/editProfile/AfterEdit";
import ProfileImage from "components/common/ProfileImage";

export interface extraUserData {
  name: string;
  gender: string;
  favoriteBookField: BookFieldType[];
}

interface PropsType {
  loggedInUserObj: LogInUserInfo;
  refreshUser: () => void;
}

const EditProfile = ({ loggedInUserObj, refreshUser }: PropsType) => {
  const [editing, setEditing] = useState(false);
  const [profileImgUrl, setProfileImgUrl] = useState("");
  const [newDisplayName, setNewDisplayName] = useState(
    loggedInUserObj.displayName
  );
  const [extraUserData, setExtraUserData] = useState({
    name: "",
    gender: "",
    favoriteBookField: [],
  });
  const [favFields, setFavFields] = useState(new Set());
  const [toggleCheck, setToggleCheck] = useState(
    Array(bookFields.length).fill(false)
  );

  console.log(toggleCheck);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(dbService, "User_Data", `${loggedInUserObj.uid}`),
      (doc) => {
        setExtraUserData(doc.data() as extraUserData);
      }
    );

    return () => {
      unsubscribe();
    };
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

    const UserDataRef = doc(dbService, "User_Data", `${loggedInUserObj.uid}`);
    updateDoc(UserDataRef, {
      favoriteBookField: Array.from(favFields),
    });

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
      // setToggleCheck(Array(bookFields.length).fill(false));
      setEditing(false);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNewDisplayName(event.currentTarget.value);
  };

  const selectedItemStyle = (index: number) => {
    return {
      backgroundColor: `${toggleCheck[index] ? "#5162FF" : ""}`,
      color: `${toggleCheck[index] ? "#fff" : ""}`,
    };
  };

  const onHandleClick = (
    idx: number,
    event: React.FormEvent<HTMLDivElement>
  ) => {
    setToggleCheck((prev) =>
      prev.map((element, index) => {
        return index === idx ? !element : element;
      })
    );

    const { textContent } = event.currentTarget;

    const fieldObj = { id: idx + 1, name: textContent };

    if (!toggleCheck[idx]) {
      // false가 초기값이니까 true면 add
      favFields.add(fieldObj);
      setFavFields(favFields);
    } else if (toggleCheck[idx]) {
      // false면 delete
      favFields.delete(fieldObj);
      setFavFields(favFields);
    }
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
        {editing ? (
          <Form onSubmit={onSubmit}>
            <ProfileImage
              loggedInUserObj={loggedInUserObj}
              refreshUser={refreshUser}
              profileImgUrl={profileImgUrl}
              setProfileImgUrl={setProfileImgUrl}
            />
            <UserInfo>
              <p>이메일은 변경할 수 없습니다.</p>
              <List>
                <div>
                  <span>이메일</span>
                  <span>{loggedInUserObj.email}</span>
                </div>
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
                    autoFocus
                  />
                </div>
              </List>
              <FavBookEdit>
                <span>좋아하는 분야</span>
                <div>
                  <span>변경하실 분야를 선택해주세요.</span>
                  <FieldContainer>
                    {bookFields.map((item, index) => (
                      <div
                        onClick={(event) => onHandleClick(index, event)}
                        style={selectedItemStyle(index)}
                        key={item.id}
                      >
                        {item.name}
                      </div>
                    ))}
                  </FieldContainer>
                </div>
              </FavBookEdit>
              <EditBtn type="submit" value="수정완료" />
            </UserInfo>
          </Form>
        ) : (
          <AfterEdit
            loggedInUserObj={loggedInUserObj}
            setEditing={setEditing}
            extraUserData={extraUserData}
          />
        )}
      </NewContainer>
    </>
  );
};

const FavBookEdit = styled.div`
  display: flex;
  justify-content: space-between;
  > span:first-child {
    padding: 10px 0;
    font-weight: 700;
    font-size: 12px;
  }
  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 70%;
    > span {
      font-size: 10px;
      color: ${(props) => props.theme.text.lightBlue};
      padding: 10px 0;
    }
  }
`;

const FieldContainer = styled.div`
  width: 260px;
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  > div {
    cursor: pointer;
    padding: 2px 3px;
    border-radius: 10px;
    margin: 0px 0px 8px 8px;
    font-size: 10px;
    border: 1px solid ${(props) => props.theme.text.lightGray};
    background-color: ${(props) => props.theme.container.default};
    &:hover {
      background-color: ${(props) => props.theme.container.yellow};
    }
  }
`;

const UserInfo = styled.ul`
  width: 90%;
  margin: 20px auto 0;
  > p {
    font-size: 10px;
    color: ${(props) => props.theme.text.lightBlue};
  }
`;

const List = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  > div {
    padding: 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > span:first-child {
      font-weight: 700;
      font-size: 12px;
    }
    > input {
      text-align: end;
      border: none;
      border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
      height: 30px;
      background-color: transparent;
      font-size: 16px;
      color: ${(props) => props.theme.text.gray};
      &:focus {
        outline: none;
      }
    }
    > div:last-child {
      display: flex;
      justify-content: end;
      flex-wrap: wrap;
    }
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

export default EditProfile;
