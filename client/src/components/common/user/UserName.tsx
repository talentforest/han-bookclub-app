import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';

import { getCollection } from '@/api/firebase/getFbDoc';
import { USER } from '@/appConstants';
import { allUsersAtom, currAuthUserAtom } from '@/data/userAtom';
import useAlertAskJoin from '@/hooks/useAlertAskJoin';

interface PropsType {
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
}: PropsType) => {
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

  return (
    <div className="flex h-fit w-fit min-w-fit items-center justify-center rounded-sm">
      {anonymous && (
        <Link
          to={to}
          onClick={blockLinkAndAlertJoinMember}
          className="flex cursor-pointer items-center justify-center"
        >
          {user?.displayName && (
            <span className="pt-1 leading-4 text-gray1">
              {user.displayName}
            </span>
          )}
        </Link>
      )}

      {user &&
        (isLink ? (
          <Link
            to={to}
            state={{ userId: user.id }}
            className={`cursor-pointer ${tag ? `rounded-md px-1.5 py-0.5 text-sm text-gray1` : ''} ${className}`}
            style={{ backgroundColor: tag ? user.tagColor : undefined }}
          >
            {user?.displayName && (
              <span className="pt-1 leading-4">{user.displayName}</span>
            )}
          </Link>
        ) : (
          <div
            className={`${tag ? `rounded-md py-0.5 pl-1.5 pr-2 text-sm text-text` : ''} ${className}`}
            style={{ backgroundColor: tag ? user.tagColor : undefined }}
          >
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
