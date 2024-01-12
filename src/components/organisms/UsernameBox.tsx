import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { allUsersState, currentUserState } from 'data/userAtom';
import { getCollection } from 'api/getFbDoc';
import { USER_DATA } from 'util/index';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface PropsType {
  creatorId: string;
  fontSize?: number;
}

const UsernameBox = ({ creatorId, fontSize = 16 }: PropsType) => {
  const [allUserDocs, setAllUserDocs] = useRecoilState(allUsersState);
  const userInfo = allUserDocs.find((user) => user.id === creatorId);
  const currentUser = useRecoilValue(currentUserState);

  useEffect(() => {
    if (allUserDocs.length === 0) {
      getCollection(USER_DATA, setAllUserDocs);
    }
  }, [creatorId, allUserDocs, setAllUserDocs]);

  const bookShelfLink =
    creatorId === currentUser.uid
      ? '/mybookshelf'
      : `/bookshelf/${userInfo?.displayName}`;

  return (
    <Username
      $fontSize={fontSize}
      to={bookShelfLink}
      state={{ user: userInfo }}
    >
      {userInfo?.displayName && <span>{userInfo?.displayName}</span>}
    </Username>
  );
};

const Username = styled(Link)<{ $fontSize: number }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    font-size: ${(props) =>
      props.$fontSize ? `${props.$fontSize}px` : '20px'};
  }
  @media ${device.tablet} {
    > span {
      font-size: ${(props) =>
        props.$fontSize ? `${props.$fontSize + 2}px` : '22px'};
    }
  }
`;

export default UsernameBox;
