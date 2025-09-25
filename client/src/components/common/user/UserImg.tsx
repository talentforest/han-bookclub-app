import { useState } from 'react';

import imageCompression from 'browser-image-compression';
import { FiUser } from 'react-icons/fi';

import { ProfileImgFiles } from '@/hooks/useHandleProfile';

import ImageInput from '@/components/common/input/ImageInput';

interface UserImgProps {
  isEditing: boolean;
  setNewUserImgUrl?: React.Dispatch<React.SetStateAction<ProfileImgFiles>>;
  imgUrl?: string;
}

const UserImg = ({ isEditing, setNewUserImgUrl, imgUrl }: UserImgProps) => {
  const [beforeOnChange, setBeforeOnChange] = useState(true);
  const [previewUrl, setPreviewUrl] = useState('');

  const commonImgStyle =
    'size-52 rounded-full bg-white  shadow-card max-sm:size-40';

  const onProfileImgChange = async (
    event: React.FormEvent<HTMLInputElement>,
  ) => {
    const {
      currentTarget: { files: originalFiles },
    } = event;

    if (!originalFiles || !originalFiles[0]) return;

    const originalFile = originalFiles[0];
    const originalReader = new FileReader();

    const options = {
      maxSizeMB: 0.1,
      useWebWorker: true,
      maxWidthOrHeight: 40,
      initialQuality: 0.7,
    };

    const compressedFile = await imageCompression(originalFile, options);

    originalReader.onload = finishedEvent => {
      const {
        target: { result },
      } = finishedEvent;

      setPreviewUrl(result as string);
    };

    setNewUserImgUrl({
      compressed: compressedFile,
      original: originalFile,
    });

    originalReader.readAsDataURL(originalFile);
    setBeforeOnChange(false);
  };

  return (
    <div className="relative m-3 mx-auto flex w-fit items-center justify-center">
      {imgUrl ? (
        <img
          src={beforeOnChange ? imgUrl : previewUrl}
          alt="나의 프로필 이미지"
          onContextMenu={event => event.preventDefault()}
          className={`object-cover ${commonImgStyle}`}
        />
      ) : (
        <div className={`flex items-center justify-center ${commonImgStyle}`}>
          <FiUser className="size-1/2 text-gray3" />
        </div>
      )}

      {isEditing && <ImageInput onImageChange={onProfileImgChange} />}
    </div>
  );
};

export default UserImg;
