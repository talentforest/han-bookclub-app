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
  userId: string;
  fontSize?: number;
  tag?: boolean;
}

const UserName = ({ userId, fontSize = 15, tag }: PropsType) => {
  const currentUser = useRecoilValue(currentUserState);

  const [allUserDocs, setAllUserDocs] = useRecoilState(allUsersState);

  const user = allUserDocs.find((user) => user.id === userId);

  const { blockLinkAndAlertJoinMember, anonymous } = useAlertAskJoin('see');

  useEffect(() => {
    if (allUserDocs.length === 0) {
      getCollection(USER_DATA, setAllUserDocs);
    }
  }, [userId, allUserDocs, setAllUserDocs]);

  const isCurrentUser = currentUser.uid === user?.id;

  const to = `/bookshelf${isCurrentUser ? '' : `/${user?.displayName}`}`;

  return (
    <TagItem
      as={tag ? 'li' : 'div'}
      $color={tag ? user?.tagColor : 'eee'}
      $tag={tag}
    >
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
    </TagItem>
  );
};

const TagItem = styled.div<{ $color: string; $tag: boolean }>`
  border-radius: 5px;
  padding: ${({ $tag }) => ($tag ? '0 6px' : '')};
  background-color: ${({ $color, $tag }) => ($tag ? $color : '')};
  height: ${({ $tag }) => ($tag ? '26px' : '')};
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserPageLink = styled(Link)<{ $fontSize: number }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    padding-top: 4px;
    font-family: 'Locus_Sangsang';
    line-height: 1;
    color: #666;
    font-size: ${({ $fontSize }) => ($fontSize ? `${$fontSize}px` : '20px')};
  }
  @media ${device.tablet} {
    > span {
      font-size: ${({ $fontSize }) =>
        $fontSize ? `${$fontSize + 1}px` : '18px'};
    }
  }
`;

export default UserName;
