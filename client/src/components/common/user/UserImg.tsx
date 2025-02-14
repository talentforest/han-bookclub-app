import { useState } from 'react';

import { currAuthUserAtom } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { FiUser } from 'react-icons/fi';

import ImageInput from 'components/common/input/ImageInput';

interface ProfileType {
  isEditing: boolean;
  newUserImgUrl: string;
  setNewUserImgUrl: (newUserImgUrl: string) => void;
}

const UserImg = ({
  isEditing,
  newUserImgUrl,
  setNewUserImgUrl,
}: ProfileType) => {
  const { photoURL } = useRecoilValue(currAuthUserAtom);

  const [beforeOnChange, setBeforeOnChange] = useState(true);

  const commonImgStyle =
    'size-52 rounded-full bg-white  shadow-card max-sm:size-40';

  const onProfileImgChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onload = finishedEvent => {
      const {
        target: { result },
      } = finishedEvent;
      setNewUserImgUrl(result as string);
    };
    reader.readAsDataURL(theFile);
    setBeforeOnChange(false);
  };

  return (
    <div className="relative m-3 mx-auto flex w-fit items-center justify-center">
      {photoURL ? (
        <img
          src={beforeOnChange ? photoURL : newUserImgUrl}
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
