import { useEffect, useState } from 'react';

import { getDocument } from 'api/firebase/getFbDoc';

import { currentUserState, userExtraInfoState } from 'data/userAtom';
import { useRecoilState } from 'recoil';

import { BookField, USER } from 'appConstants';
import { authService, dbService, storageService } from 'fbase';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const useHandleProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useRecoilState(currentUserState);
  const [extraUserData, setExtraUserData] = useRecoilState(userExtraInfoState);

  const [newUserImgUrl, setNewUserImgUrl] = useState('');
  const [newDisplayName, setNewDisplayName] = useState(userData.displayName);

  const userDataRef = doc(dbService, USER, `${userData.uid}`);

  useEffect(() => {
    if (userData.uid) {
      getDocument(USER, userData.uid, setExtraUserData);
    }
  }, [userData.uid]);

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
    const fileRef = ref(storageService, `${userData.uid}`);
    const response = await uploadString(fileRef, newUserImgUrl, 'data_url');
    userImageUrl = await getDownloadURL(response.ref);
    await updateProfile(authService.currentUser, {
      photoURL: userImageUrl,
    });
    await updateDoc(userDataRef, {
      photoURL: userImageUrl,
    });
    refreshUser();
  };

  const updateDisplayName = async () => {
    await updateProfile(authService.currentUser, {
      displayName: newDisplayName,
    });
    await updateDoc(userDataRef, {
      displayName: newDisplayName,
    });
    refreshUser();
  };

  const updateFavBookField = async () => {
    await updateDoc(userDataRef, {
      favoriteBookField: Array.from(extraUserData.favoriteBookField),
    });
  };

  const onProfileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (newUserImgUrl !== '') {
        updateProfileImg();
      }
      if (userData.displayName !== newDisplayName) {
        updateDisplayName();
      }
      updateFavBookField();
      setIsEditing(false);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const onHandleFieldClick = (
    id: number,
    event: React.FormEvent<HTMLButtonElement>,
  ) => {
    const { name } = event.currentTarget;
    const selectedField = { id, name };
    const alreadySelected = extraUserData.favoriteBookField.some(
      (item: BookField) => item.id === id,
    );
    if (!alreadySelected) {
      const totalArray = [...extraUserData.favoriteBookField, selectedField];
      const removeDeduplicationArr = totalArray.filter(
        (arr, index, callback) =>
          index === callback.findIndex(t => t.id === arr.id),
      );
      return setExtraUserData(prevArr => ({
        ...prevArr,
        favoriteBookField: removeDeduplicationArr,
      }));
    }
    setExtraUserData(prevArr => ({
      ...prevArr,
      favoriteBookField: prevArr.favoriteBookField.filter(
        (ele: BookField) => ele.id !== id,
      ),
    }));
  };

  const onToggleEditClick = () => setIsEditing(true);

  const onDisplayNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNewDisplayName(event.currentTarget.value);
  };

  const isSelected = (id: number) => {
    return extraUserData?.favoriteBookField?.some(item => item.id === id);
  };

  return {
    isEditing,
    onToggleEditClick,
    onHandleFieldClick,
    onProfileSubmit,
    newUserImgUrl,
    setNewUserImgUrl,
    newDisplayName,
    setNewDisplayName,
    extraUserData,
    onDisplayNameChange,
    isSelected,
  };
};

export default useHandleProfile;
