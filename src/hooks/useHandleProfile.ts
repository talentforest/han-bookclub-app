import { BookFieldType } from "components/loginForm/UserDataInputForm";
import { currentUserState } from "data/userAtom";
import { authService, dbService, storageService } from "fbase";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getUserData } from "util/getFirebaseDoc";

const useHandleProfile = () => {
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
  const user = useRecoilValue(currentUserState);

  useEffect(() => {
    getUserData(user.uid, setExtraUserData);

    return () => {
      getUserData(user.uid, setExtraUserData);
    };
  }, [user.uid]);

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

    const fileRef = ref(storageService, `${userData.uid}`);
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

  const onProfileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    id: number,
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    const { name } = event.currentTarget;
    const selectedFieldValue = { id, name };
    const checkSelectedItem = extraUserData.favoriteBookField.some(
      (item: BookFieldType) => item.id === id
    );

    if (!checkSelectedItem) {
      const totalArray = [
        ...extraUserData.favoriteBookField,
        selectedFieldValue,
      ];

      const removeDeduplicationArr = totalArray.filter(
        (arr, index, callback) =>
          index === callback.findIndex((t) => t.id === arr.id)
      );
      setExtraUserData((prevArr) => ({
        ...prevArr,
        favoriteBookField: removeDeduplicationArr,
      }));
    } else if (checkSelectedItem) {
      setExtraUserData((prevArr) => ({
        ...prevArr,
        favoriteBookField: prevArr.favoriteBookField.filter(
          (ele: BookFieldType) => ele.id !== id
        ),
      }));
    }
  };

  return {
    editing,
    setEditing,
    getUserData,
    onHandleClick,
    onProfileSubmit,
    profileImgUrl,
    setProfileImgUrl,
    newDisplayName,
    setNewDisplayName,
    extraUserData,
  };
};

export default useHandleProfile;
