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

const UserNameBox = ({ creatorId, fontSize = 15 }: PropsType) => {
  const currentUser = useRecoilValue(currentUserState);

  const [allUserDocs, setAllUserDocs] = useRecoilState(allUsersState);

  const user = allUserDocs.find((user) => user.id === creatorId);

  useEffect(() => {
    if (allUserDocs.length === 0) {
      getCollection(USER_DATA, setAllUserDocs);
    }
  }, [creatorId, allUserDocs, setAllUserDocs]);

  const isCurrentUser = currentUser.uid === user?.id;

  const to = `/bookshelf${isCurrentUser ? '' : `/${user?.displayName}`}`;

  return (
    <>
      {user ? (
        <Username $fontSize={fontSize} to={to} state={{ userId: user.id }}>
          {user?.displayName && <span>{user.displayName}</span>}
        </Username>
      ) : (
        <></>
      )}
    </>
  );
};

const Username = styled(Link)<{ $fontSize: number }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  > span {
    color: #666;
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

export default UserNameBox;
