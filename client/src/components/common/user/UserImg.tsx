import { useRef, useState } from 'react';

import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { FiImage, FiUser } from 'react-icons/fi';

interface ProfileType {
  editing: boolean;
  newUserImgUrl: string;
  setNewUserImgUrl: (newUserImgUrl: string) => void;
}

const UserImg = ({ editing, newUserImgUrl, setNewUserImgUrl }: ProfileType) => {
  const fileInput = useRef(null);
  const userData = useRecoilValue(currentUserState);
  const [beforeOnChange, setBeforeOnChange] = useState(true);

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
      {!userData.photoURL ? (
        <div>
          <FiUser fontSize={30} stroke="#aaa" />
        </div>
      ) : (
        <img
          src={beforeOnChange ? userData.photoURL : newUserImgUrl}
          alt="profileimg"
          // onClick={() => fileInput.current?.click()} // NOTE:
          onContextMenu={event => event.preventDefault()}
        />
      )}
      {editing && (
        <>
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="bottom-2 right-3 flex size-[30px] cursor-pointer items-center justify-center rounded-[50%] border-0 bg-orange md:size-10"
          >
            <FiImage fontSize={13} className="size-4 md:size-5" />
          </button>

          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/jpg,image/png,image/jpeg"
            name="profile_img"
            onChange={onProfileImgChange}
            ref={fileInput}
          />
        </>
      )}
    </div>
  );
};

export default UserImg;
