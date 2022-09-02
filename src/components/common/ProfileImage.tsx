import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { AccountCircle, CameraAlt } from "@mui/icons-material";
import styled from "styled-components";
import device from "theme/mediaQueries";

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
            <img
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
          <img
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  > div {
    margin: 20px 0 5px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      object-fit: cover;
      width: 140px;
      height: 140px;
      padding: 10px;
      border-radius: 50%;
      cursor: pointer;
    }
    > svg {
      height: 140px;
      width: 140px;
    }
    > button {
      cursor: pointer;
      position: absolute;
      right: 12px;
      bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: none;
      background-color: ${(props) => props.theme.container.orange};
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
  @media ${device.tablet} {
    > div {
      > svg {
        height: 200px;
        width: 200px;
      }
      > img {
        width: 200px;
        height: 200px;
      }
      > button {
        width: 40px;
        height: 40px;
        svg {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
`;

export default ProfileImage;
