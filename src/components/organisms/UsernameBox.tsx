import { AccountCircle } from '@mui/icons-material';
import { memo, useEffect, useState } from 'react';
import { USER_DATA } from 'util/index';
import { getDocument } from 'api/getFbDoc';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface PropsType {
  creatorId: string;
}

const UsernameBox = ({ creatorId }: PropsType) => {
  const [userDataDoc, setUserDataDoc] = useState({
    displayName: '',
    email: '',
    favoriteBookField: [],
    name: '',
    photoUrl: '',
  });

  useEffect(() => {
    getDocument(USER_DATA, creatorId, setUserDataDoc);
  }, [creatorId]);

  return (
    <User>
      {userDataDoc?.photoUrl ? (
        <ProfileImgBox $bgPhoto={userDataDoc.photoUrl} />
      ) : (
        <AccountCircle />
      )}
      {userDataDoc?.displayName && <span>{userDataDoc?.displayName}</span>}
    </User>
  );
};

const User = styled.div`
  display: flex;
  align-items: center;
  > span {
    font-size: 14px;
    margin-left: 2px;
  }
  > svg {
    width: 20px;
    height: 20px;
  }
  @media ${device.tablet} {
    > span {
      font-size: 16px;
      margin-left: 5px;
    }
    > svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const ProfileImgBox = styled.div<{ $bgPhoto: string }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  @media ${device.tablet} {
    width: 24px;
    height: 24px;
    margin-right: 5px;
  }
`;

export default memo(UsernameBox);
