import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { AccountCircle, CameraAlt } from "@mui/icons-material";
import styled from "styled-components";

interface ProfileType {
  profileImgUrl: string;
  setProfileImgUrl: (profileImgUrl: string) => void;
}

const ProfileImage = ({ profileImgUrl, setProfileImgUrl }: ProfileType) => {
  const userData = useRecoilValue(currentUserState);
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
          userData.photoURL ? (
            <BeforeChoice
              src={userData.photoURL}
              alt="profileimg"
              onClick={() => {
                fileInput.current.click();
              }}
            />
          ) : (
            <AccountCircle />
          )
        ) : (
          <AfterChoice
            src={profileImgUrl}
            alt="profileImage"
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
          <CameraAlt />
        </button>
      </div>
    </Container>
  );
};

const BeforeChoice = styled.img``;
const AfterChoice = styled.img`
  background-color: antiquewhite;
`;

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
    > svg {
      height: 120px;
      width: 120px;
    }
    > img {
      object-fit: cover;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      cursor: pointer;
    }
    > button {
      cursor: pointer;
      position: absolute;
      right: 24px;
      bottom: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
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
