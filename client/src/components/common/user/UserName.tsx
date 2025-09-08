import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';

import { allUsersAtom, currAuthUserAtom } from '@/data/userAtom';

import { getCollection } from '@/api';

import { USER } from '@/appConstants';

import { useAlertAskJoin } from '@/hooks';

interface UserNameProps {
  userId: string;
  tag?: boolean;
  className?: string;
  isLink?: boolean;
}

const UserName = ({
  userId,
  tag,
  className = '',
  isLink = false,
}: UserNameProps) => {
  const { uid } = useRecoilValue(currAuthUserAtom);

  const [allUserDocs, setAllUserDocs] = useRecoilState(allUsersAtom);

  const user = allUserDocs.find(({ id }) => id === userId);

  const { blockLinkAndAlertJoinMember, anonymous } = useAlertAskJoin('see');

  useEffect(() => {
    if (allUserDocs.length === 0) {
      getCollection(USER, setAllUserDocs);
    }
  }, [userId, allUserDocs, setAllUserDocs]);

  const isCurrentUser = uid === user?.id;

  const to = `/bookshelf${isCurrentUser ? '' : `/${user?.displayName}`}`;

  const tagClassName = `${tag ? `rounded-md py-0.5 pl-1.5 pr-2 text-sm text-text` : ''} ${className}`;
  const tagStyle = { backgroundColor: tag ? user?.tagColor : undefined };

  return (
    <div className="inline-block h-fit w-fit min-w-fit rounded-sm">
      {anonymous && (
        <Link
          to={to}
          onClick={blockLinkAndAlertJoinMember}
          className={tagClassName}
          style={tagStyle}
        >
          {user?.displayName && (
            <span className="pt-1 leading-4 text-gray1">
              {user.displayName}
            </span>
          )}
        </Link>
      )}

      {!anonymous &&
        user &&
        (isLink ? (
          <Link
            to={to}
            state={{ userId: user.id }}
            className={`cursor-pointer ${tagClassName}`}
            style={tagStyle}
          >
            {user?.displayName && (
              <span className="pt-1 leading-4">{user.displayName}</span>
            )}
          </Link>
        ) : (
          <div className={tagClassName} style={tagStyle}>
            {user?.displayName && (
              <span className="pt-1 leading-4 text-text">
                {user.displayName}
              </span>
            )}
          </div>
        ))}
    </div>
  );
};

export default UserName;
