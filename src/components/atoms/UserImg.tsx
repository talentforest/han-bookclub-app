import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { FiImage, FiUser } from 'react-icons/fi';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

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
    reader.onload = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      setNewUserImgUrl(result as string);
    };
    reader.readAsDataURL(theFile);
    setBeforeOnChange(false);
  };

  return (
    <ImgBox>
      {!userData.photoURL ? (
        <CircleImg as='div'>
          <FiUser fontSize={30} stroke='#aaa' />
        </CircleImg>
      ) : (
        <CircleImg
          src={beforeOnChange ? userData.photoURL : newUserImgUrl}
          alt='profileimg'
          onClick={() => fileInput.current?.click()}
          onContextMenu={(e) => e.preventDefault()}
        />
      )}
      {editing && (
        <>
          <ChangeImgBtn
            type='button'
            onClick={() => fileInput.current?.click()}
          >
            <FiImage fontSize={13} />
          </ChangeImgBtn>

          <input
            type='file'
            style={{ display: 'none' }}
            accept='image/jpg,image/png,image/jpeg'
            name='profile_img'
            onChange={onProfileImgChange}
            ref={fileInput}
          />
        </>
      )}
    </ImgBox>
  );
};

const ChangeImgBtn = styled.button`
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
  background-color: ${({ theme }) => theme.container.orange};
  svg {
    width: 16px;
    height: 16px;
  }
  @media ${device.tablet} {
    width: 40px;
    height: 40px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const ImgBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: fit-content;
  margin: 15px auto;
  > svg {
    height: 140px;
    width: 140px;
  }
  .no-image {
    background-color: #eee;
  }
  @media ${device.tablet} {
    > svg {
      height: 200px;
      width: 200px;
    }
  }
`;

export const CircleImg = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.boxShadow};
  object-fit: cover;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  -webkit-touch-callout: none;
  background-color: #eee;
  @media ${device.tablet} {
    width: 200px;
    height: 200px;
  }
`;

export default UserImg;
