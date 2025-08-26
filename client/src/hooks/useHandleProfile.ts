import { useState } from 'react';

import { useRecoilState } from 'recoil';

import { USER } from '@/appConstants';
import { currAuthUserAtom, userDocAtomFamily } from '@/data/userAtom';
import { authService, dbService, storageService } from '@/fbase';
import { ClubBookField } from '@/types';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const useHandleProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [{ uid, displayName, photoURL }, setUserData] =
    useRecoilState(currAuthUserAtom);

  const [userDoc, setUserDoc] = useRecoilState(userDocAtomFamily(uid));

  const [newUserImgUrl, setNewUserImgUrl] = useState('');
  const [newDisplayName, setNewDisplayName] = useState(displayName);

  const userDataRef = doc(dbService, USER, uid);

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
    let userImageUrl = photoURL;
    const fileRef = ref(storageService, `${uid}`);
    const response = await uploadString(fileRef, newUserImgUrl, 'data_url');
    userImageUrl = await getDownloadURL(response.ref);
    const updatePhotoUrl = {
      photoURL: userImageUrl,
    };
    await updateProfile(authService.currentUser, updatePhotoUrl);
    await updateDoc(userDataRef, updatePhotoUrl);
    refreshUser();
  };

  const updateDisplayName = async () => {
    const updateData = {
      displayName: newDisplayName,
    };
    await updateProfile(authService.currentUser, updateData);
    await updateDoc(userDataRef, updateData);
    refreshUser();
  };

  const updateFavBookField = async () => {
    await updateDoc(userDataRef, {
      favoriteBookField: Array.from(userDoc.favoriteBookField),
    });
  };

  const onProfileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (newUserImgUrl !== '') {
        updateProfileImg();
      }
      if (displayName !== newDisplayName) {
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
    const alreadySelected = userDoc.favoriteBookField.some(
      (item: ClubBookField) => item.id === id,
    );
    if (!alreadySelected) {
      const totalArray = [...userDoc.favoriteBookField, selectedField];
      const removeDeduplicationArr = totalArray.filter(
        (arr, index, callback) =>
          index === callback.findIndex(t => t.id === arr.id),
      );
      return setUserDoc(prevArr => ({
        ...prevArr,
        favoriteBookField: removeDeduplicationArr,
      }));
    }
    setUserDoc(prevArr => ({
      ...prevArr,
      favoriteBookField: prevArr.favoriteBookField.filter(
        (ele: ClubBookField) => ele.id !== id,
      ),
    }));
  };

  const onToggleEditClick = () => setIsEditing(true);

  const onDisplayNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNewDisplayName(event.currentTarget.value);
  };

  const isSelected = (id: number) => {
    return userDoc?.favoriteBookField?.some(item => item.id === id);
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
    userDoc,
    onDisplayNameChange,
    isSelected,
  };
};

export default useHandleProfile;
