import { useState } from 'react';

import { authService, dbService, storageService } from '@/fbase';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { useRecoilState } from 'recoil';

import { currAuthUserAtom, userAtomFamily } from '@/data/userAtom';

import { USER } from '@/appConstants';

import { ClubBookField } from '@/types';

export type ProfileImgFiles = {
  original: File;
  compressed: File;
};

export const useHandleProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [{ uid, displayName }, setUserData] = useRecoilState(currAuthUserAtom);

  const [{ data: userDoc }, setUserDoc] = useRecoilState(userAtomFamily(uid));

  const [newUserImgUrl, setNewUserImgUrl] = useState<ProfileImgFiles | null>(
    null,
  );

  const [newDisplayName, setNewDisplayName] = useState(displayName);

  const refreshUser = () => {
    const user = getAuth().currentUser;
    setUserData({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const userDataRef = doc(dbService, USER, uid);

  const updateProfileImg = async () => {
    const { original, compressed } = newUserImgUrl;

    const originalFileRef = ref(storageService, `avatars/${uid}/original`);
    const originalResponse = await uploadBytes(originalFileRef, original);
    const originalPhotoURL = await getDownloadURL(originalResponse.ref);

    const compressedFileRef = ref(storageService, `avatars/${uid}/compressed`);
    const compressedResponse = await uploadBytes(compressedFileRef, compressed);
    const compressedPhotoURL = await getDownloadURL(compressedResponse.ref);

    await updateProfile(authService.currentUser, {
      photoURL: originalPhotoURL,
    });
    await updateDoc(userDataRef, {
      photoURL: { original: originalPhotoURL, compressed: compressedPhotoURL },
    });

    refreshUser();
  };

  const updateDisplayName = async () => {
    const updateData = { displayName: newDisplayName };

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
      if (newUserImgUrl) {
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
      favoriteBookField: prevArr.data.favoriteBookField.filter(
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
