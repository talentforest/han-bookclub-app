import { CircleImg, ImgBox } from 'components/atoms/UserImg';
import { MouseEvent } from 'react';
import { FiUser } from 'react-icons/fi';
import styled from 'styled-components';

interface Props {
  photoURL: string;
  displayName: string;
}

export default function UserImgName({ photoURL, displayName }: Props) {
  const onContextMenu = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <UserBox>
      <ImgBox>
        {photoURL ? (
          <CircleImg
            onContextMenu={onContextMenu}
            src={photoURL}
            alt={`${displayName}의 프로필 이미지`}
          />
        ) : (
          <CircleImg as='div' className='no-image'>
            <FiUser fontSize={30} stroke='#aaa' />
          </CircleImg>
        )}
      </ImgBox>
      <span>{displayName}</span>
    </UserBox>
  );
}

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
