import { AccountCircle } from '@mui/icons-material';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { allUsersState } from 'data/userAtom';
import { getCollection } from 'api/getFbDoc';
import { USER_DATA } from 'util/index';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface PropsType {
  creatorId: string;
}

const UsernameBox = ({ creatorId }: PropsType) => {
  const [allUserDocs, setAllUserDocs] = useRecoilState(allUsersState);
  const userInfo = allUserDocs.find((user) => user.id === creatorId);

  useEffect(() => {
    if (allUserDocs.length === 0) {
      getCollection(USER_DATA, setAllUserDocs);
    }
  }, [creatorId, allUserDocs]);

  return (
    <User>
      {userInfo?.photoUrl ? (
        <ProfileImgBox $bgPhoto={userInfo.photoUrl} />
      ) : (
        <AccountCircle />
      )}
      {userInfo?.displayName && <span>{userInfo?.displayName}</span>}
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

export default UsernameBox;
