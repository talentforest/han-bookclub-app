import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { allUsersState, currentUserState } from 'data/userAtom';
import { getCollection } from 'api/getFbDoc';
import { USER_DATA } from 'constants/index';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import useAlertAskJoin from 'hooks/useAlertAskJoin';

interface PropsType {
  creatorId: string;
  fontSize?: number;
}

const UserName = ({ creatorId, fontSize = 15 }: PropsType) => {
  const currentUser = useRecoilValue(currentUserState);

  const [allUserDocs, setAllUserDocs] = useRecoilState(allUsersState);

  const user = allUserDocs.find((user) => user.id === creatorId);

  const { blockLinkAndAlertJoinMember, anonymous } = useAlertAskJoin('see');

  useEffect(() => {
    if (allUserDocs.length === 0) {
      getCollection(USER_DATA, setAllUserDocs);
    }
  }, [creatorId, allUserDocs, setAllUserDocs]);

  const isCurrentUser = currentUser.uid === user?.id;

  const to = `/bookshelf${isCurrentUser ? '' : `/${user?.displayName}`}`;

  return (
    <>
      {anonymous ? (
        <UserPageLink
          onClick={blockLinkAndAlertJoinMember}
          $fontSize={fontSize}
          to={to}
        >
          {user?.displayName && <span>{user.displayName}</span>}
        </UserPageLink>
      ) : user ? (
        <UserPageLink $fontSize={fontSize} to={to} state={{ userId: user.id }}>
          {user?.displayName && <span>{user.displayName}</span>}
        </UserPageLink>
      ) : (
        <></>
      )}
    </>
  );
};

const UserPageLink = styled(Link)<{ $fontSize: number }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    font-family: 'Locus_Sangsang';
    line-height: 1;
    color: #666;
    font-size: ${({ $fontSize }) => ($fontSize ? `${$fontSize}px` : '20px')};
  }
  @media ${device.tablet} {
    > span {
      font-size: ${({ $fontSize }) =>
        $fontSize ? `${$fontSize + 2}px` : '22px'};
    }
  }
`;

export default UserName;
