import { Container } from "theme/commonStyle";
import { useEffect, useState } from "react";
import { authService, dbService, storageService } from "fbase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { bookFields } from "util/constants";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { BookFieldType } from "components/loginForm/UserDataInputForm";
import { useRecoilState } from "recoil";
import { currentUserState } from "data/userAtom";
import { v4 } from "uuid";
import styled from "styled-components";
import NotEditingProfile from "components/editProfile/NotEditingProfile";
import EditingProfile from "components/editProfile/EditingProfile";
import ProfileImage from "components/common/ProfileImage";
import BackButtonHeader from "components/common/BackButtonHeader";

export interface extraUserData {
  name: string;
  favoriteBookField: BookFieldType[];
  email: string;
  displayName: string;
  photoUrl: string;
}

const EditProfile = () => {
  const [userData, setUserData] = useRecoilState(currentUserState);
  const [extraUserData, setExtraUserData] = useState({
    name: "",
    favoriteBookField: [],
    email: "",
    displayName: "",
    photoUrl: "",
  });
  const [editing, setEditing] = useState(false);
  const [profileImgUrl, setProfileImgUrl] = useState("");
  const [newDisplayName, setNewDisplayName] = useState(userData.displayName);

  const [toggleCheck, setToggleCheck] = useState(
    Array(bookFields.length).fill(false)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(dbService, "User Data", `${userData.uid}`),
      (doc) => {
        setExtraUserData(doc.data() as extraUserData);

        console.log(doc.data()?.favoriteBookField);
        window.localStorage.setItem(
          "favFields",
          JSON.stringify(doc.data()?.favoriteBookField)
        );
      }
    );

    // window.localStorage.setItem("favFieldsCheck", JSON.stringify(toggleCheck));

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshUser = () => {
    const user = getAuth().currentUser;

    setUserData({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const updateProfileImg = async () => {
    let userImageUrl = userData.photoURL;
    const UserDataRef = doc(dbService, "User Data", `${userData.uid}`);

    const fileRef = ref(storageService, `${userData.uid}/${v4()}`);
    const response = await uploadString(fileRef, profileImgUrl, "data_url");
    userImageUrl = await getDownloadURL(response.ref);

    await updateProfile(authService.currentUser, {
      photoURL: userImageUrl,
    });
    await updateDoc(UserDataRef, {
      photoUrl: userImageUrl,
    });

    refreshUser();
  };

  const updateDisplayName = async () => {
    const UserDataRef = doc(dbService, "User Data", `${userData.uid}`);

    await updateProfile(authService.currentUser, {
      displayName: newDisplayName,
    });
    await updateDoc(UserDataRef, {
      displayName: newDisplayName,
    });

    refreshUser();
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const UserDataRef = doc(dbService, "User Data", `${userData.uid}`);
    try {
      if (profileImgUrl !== "") {
        updateProfileImg();
      }
      if (userData.displayName !== newDisplayName) {
        updateDisplayName();
      }
      updateDoc(UserDataRef, {
        favoriteBookField: Array.from(extraUserData.favoriteBookField),
      });

      setEditing(false);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const onHandleClick = (
    idx: number,
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    setToggleCheck((prev) =>
      prev.map((element, index) => {
        return index === idx ? !element : element;
      })
    );

    const { name } = event.currentTarget;
    const currentFieldValue = { id: idx + 1, name };

    if (!toggleCheck[idx]) {
      const totalArray = [
        ...extraUserData.favoriteBookField,
        currentFieldValue,
      ];
      const result = totalArray.filter(
        (arr, index, callback) =>
          index === callback.findIndex((t) => t.id === arr.id)
      );

      setExtraUserData((prev) => ({ ...prev, favoriteBookField: result }));
    } else if (toggleCheck[idx]) {
      setExtraUserData((prev) => ({
        ...prev,
        favoriteBookField: extraUserData.favoriteBookField.filter(
          (ele: BookFieldType) => ele.id !== idx + 1
        ),
      }));
    }
  };

  return (
    <>
      <BackButtonHeader title="프로필 정보" />
      <NewContainer>
        {editing ? (
          <Form onSubmit={onSubmit}>
            <ProfileImage
              profileImgUrl={profileImgUrl}
              setProfileImgUrl={setProfileImgUrl}
            />
            <EditingProfile
              extraUserData={extraUserData}
              newDisplayName={newDisplayName}
              setNewDisplayName={setNewDisplayName}
              onHandleClick={onHandleClick}
              toggleCheck={toggleCheck}
              setToggleCheck={setToggleCheck}
            />
          </Form>
        ) : (
          <NotEditingProfile
            setEditing={setEditing}
            extraUserData={extraUserData}
          />
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

const Form = styled.form`
  width: 100%;
`;

export default EditProfile;
