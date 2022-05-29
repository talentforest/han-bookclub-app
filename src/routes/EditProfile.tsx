import { Container } from "theme/commonStyle";
import { Header } from "./Setting";
import { useEffect, useState } from "react";
import { authService, dbService, storageService } from "fbase";
import { LogInUserInfo } from "components/App";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { bookFields } from "util/constants";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { BookFieldType } from "components/loginForm/UserDataInputForm";
import { v4 } from "uuid";
import BackButton from "components/common/BackButton";
import Subtitle from "components/common/Subtitle";
import styled from "styled-components";
import AfterEdit from "components/editProfile/AfterEdit";
import BeforeEdit from "components/editProfile/BeforeEdit";
import ProfileImage from "components/common/ProfileImage";

interface PropsType {
  userObj: LogInUserInfo;
  refreshUser: () => void;
}
export interface extraUserData {
  name: string;
  gender: string;
  favoriteBookField: BookFieldType[];
}

const EditProfile = ({ userObj, refreshUser }: PropsType) => {
  const [editing, setEditing] = useState(false);
  const [profileImgUrl, setProfileImgUrl] = useState("");
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [extraUserData, setExtraUserData] = useState({
    name: "",
    gender: "",
    favoriteBookField: [],
  });
  const [favFields, setFavFields] = useState(extraUserData.favoriteBookField);
  const [toggleCheck, setToggleCheck] = useState(
    Array(bookFields.length).fill(false)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(dbService, "User_Data", `${userObj.uid}`),
      (doc) => {
        setExtraUserData(doc.data() as extraUserData);
        setFavFields(doc.data().favoriteBookField);
      }
    );

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let userImageUrl = userObj.photoURL;
    try {
      // update profile
      if (profileImgUrl !== "") {
        const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
        const response = await uploadString(fileRef, profileImgUrl, "data_url");
        userImageUrl = await getDownloadURL(response.ref);

        await updateProfile(authService.currentUser, {
          photoURL: userImageUrl,
        });
      }
      if (userObj.displayName !== newDisplayName) {
        await updateProfile(authService.currentUser, {
          displayName: newDisplayName,
        });
      }

      // update document
      const UserDataRef = doc(dbService, "User_Data", `${userObj.uid}`);
      updateDoc(UserDataRef, {
        favoriteBookField: Array.from(favFields),
      });

      refreshUser();
      setToggleCheck(Array(bookFields.length).fill(false));
      setEditing(false);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNewDisplayName(event.currentTarget.value);
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
      const totalArray = [...favFields, fieldObj];
      const result = totalArray.filter(
        (arr, index, callback) =>
          index === callback.findIndex((t) => t.id === arr.id)
      );

      setFavFields(result);
    } else if (toggleCheck[idx]) {
      setFavFields(favFields.filter((ele) => ele.id !== idx + 1));
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
              userObj={userObj}
              refreshUser={refreshUser}
              profileImgUrl={profileImgUrl}
              setProfileImgUrl={setProfileImgUrl}
            />
            <BeforeEdit
              userObj={userObj}
              onChange={onChange}
              newDisplayName={newDisplayName}
              onHandleClick={onHandleClick}
              toggleCheck={toggleCheck}
              setToggleCheck={setToggleCheck}
              favFields={favFields}
              setFavFields={setFavFields}
            />
          </Form>
        ) : (
          <AfterEdit
            userObj={userObj}
            setEditing={setEditing}
            favFields={favFields}
          />
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

const Form = styled.form`
  width: 100%;
`;

export default EditProfile;
