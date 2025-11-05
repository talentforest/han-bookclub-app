import { useState } from 'react';

import imageCompression from 'browser-image-compression';

import { useRecoilValue } from 'recoil';

import { basePhotoAtom } from '@/data/clubAtom';

import { ProfileImgFiles } from '@/hooks/handleAccount/useHandleProfile';

import ImageInput from '@/components/common/input/ImageInput';

interface UserImgProps {
  isEditing: boolean;
  setNewUserImgUrl?: React.Dispatch<React.SetStateAction<ProfileImgFiles>>;
  imgUrl?: string;
}

const UserImg = ({ isEditing, setNewUserImgUrl, imgUrl }: UserImgProps) => {
  const [beforeOnChange, setBeforeOnChange] = useState(true);
  const [previewUrl, setPreviewUrl] = useState('');

  const basePhoto = useRecoilValue(basePhotoAtom);

  const onProfileImgChange = async (
    event: React.FormEvent<HTMLInputElement>,
  ) => {
    const {
      currentTarget: { files: originalFiles },
    } = event;

    if (!originalFiles || !originalFiles[0]) return;

    const originalFile = originalFiles[0];
    const originalReader = new FileReader();

    const compressedOptions = {
      maxSizeMB: 0.1,
      useWebWorker: true,
      maxWidthOrHeight: 100,
      initialQuality: 0.8,
    };

    const maxOptions = {
      maxSizeMB: 1,
      useWebWorker: true,
      maxWidthOrHeight: 600,
      initialQuality: 1,
    };

    const compressedFile = await imageCompression(
      originalFile,
      compressedOptions,
    );

    const maxFile = await imageCompression(originalFile, maxOptions);

    originalReader.onload = finishedEvent => {
      const {
        target: { result },
      } = finishedEvent;

      setPreviewUrl(result as string);
    };

    setNewUserImgUrl({
      compressed: compressedFile,
      original: originalFile.size > 100000 ? maxFile : originalFile,
    });

    originalReader.readAsDataURL(originalFile);
    setBeforeOnChange(false);
  };

  return (
    <div className="relative m-3 mx-auto flex w-fit items-center justify-center">
      <img
        src={beforeOnChange ? imgUrl || basePhoto : previewUrl}
        alt="프로필 이미지"
        onContextMenu={event => event.preventDefault()}
        className={`size-52 min-h-52 min-w-52 rounded-full bg-white object-cover shadow-card max-sm:size-40`}
      />

      {isEditing && <ImageInput onImageChange={onProfileImgChange} />}
    </div>
  );
};

export default UserImg;
