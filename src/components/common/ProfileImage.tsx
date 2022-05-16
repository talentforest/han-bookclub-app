import { useRef, useState } from "react";
import { ReactComponent as CameraIcon } from "assets/camera.svg";
import { LogInUserInfo } from "components/App";
import UserIcon from "assets/account_circle.svg";
import styled from "styled-components";

interface ProfileType {
  userObj: LogInUserInfo;
  refreshUser: () => void;
  profileImgUrl: string;
  setProfileImgUrl: (profileImgUrl: string) => void;
}

const ProfileImage = ({
  userObj,
  profileImgUrl,
  setProfileImgUrl,
}: ProfileType) => {
  const [beforeOnChange, setBeforeOnChange] = useState(true);
  const fileInput = useRef(null);

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { files },
    } = event;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onload = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      setProfileImgUrl(result as string);
    };
    reader.readAsDataURL(theFile);
    setBeforeOnChange(false);
  };

  return (
    <Container>
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/jpg,image/png,image/jpeg"
        name="profile_img"
        onChange={onChange}
        ref={fileInput}
      />
      <div>
        {beforeOnChange ? (
          <img
            src={userObj.photoURL === null ? UserIcon : userObj.photoURL}
            alt="profileimg"
            onClick={() => {
              fileInput.current.click();
            }}
          />
        ) : (
          <img
            src={profileImgUrl}
            alt="profileimg"
            onClick={() => {
              fileInput.current.click();
            }}
          />
        )}
        <button
          type="button"
          onClick={() => {
            fileInput.current.click();
          }}
        >
          <CameraIcon />
        </button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  > div {
    position: relative;
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
    > button {
      position: absolute;
      right: 14px;
      bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      font-size: 10px;
      font-weight: 700;
      background-color: ${(props) => props.theme.container.orange};
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

export default ProfileImage;
