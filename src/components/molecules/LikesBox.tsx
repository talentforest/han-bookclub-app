import { IDocument } from 'data/documentsAtom';
import { currentUserState } from 'data/userAtom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { FiChevronDown, FiChevronUp, FiHeart } from 'react-icons/fi';
import UserNameBox from 'components/atoms/UserNameBox';
import useHandleLike from 'hooks/useHandleLike';
import styled from 'styled-components';

interface Props {
  post: IDocument;
  collName: string;
}

const LikesBox = ({ post, collName }: Props) => {
  const currentUser = useRecoilValue(currentUserState);

  const { like, setLike, onLikeClick, showLikeUsers, toggleShowLikeUsers } =
    useHandleLike({
      likes: post?.likes || 0,
      likeUsers: post?.likeUsers || [],
      docId: post.id,
      collName,
    });

  const currentUserLike = post?.likeUsers?.some(
    (uid) => uid === currentUser.uid
  );

  useEffect(() => {
    if (currentUserLike) {
      setLike(true);
    }
  }, []);

  return (
    <Box>
      <ShowUserBtn type='button' onClick={toggleShowLikeUsers}>
        {showLikeUsers ? (
          <FiChevronUp fontSize={15} stroke='#aaa' />
        ) : (
          <FiChevronDown fontSize={15} stroke='#aaa' />
        )}
        {post?.likeUsers?.length || 0}명이 좋아합니다
      </ShowUserBtn>

      <LikeBtn type='button' disabled={!collName} onClick={onLikeClick}>
        <FiHeart
          stroke={!collName ? '#aaa' : 'red'}
          fill={!collName ? '#aaa' : !like ? 'transparent' : 'red'}
          fontSize={13}
        />
      </LikeBtn>

      {showLikeUsers && (
        <LikeUsersBox>
          <h4>좋아한 사람</h4>
          <ul onClick={toggleShowLikeUsers}>
            {post?.likeUsers?.map((user) => (
              <UserNameBox key={user} creatorId={user} />
            ))}
          </ul>
        </LikeUsersBox>
      )}
    </Box>
  );
};

const Box = styled.div`
  position: relative;
  gap: 3px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const ShowUserBtn = styled.button`
  color: #888;
  font-size: 13px;
  display: flex;
  align-items: center;
  line-height: 0;
  justify-content: space-between;
  margin-right: 4px;
`;

const LikeBtn = styled.button`
  line-height: 0;
  padding: 2px;
`;

const LikeUsersBox = styled.div`
  position: absolute;
  bottom: 30px;
  right: 5px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  min-height: 100px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.container.blue1};
  z-index: 10;
  border-radius: 8px;
  padding: 5px 10px 10px;
  h4 {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.text.purple};
    border-bottom: 2px dotted ${({ theme }) => theme.container.purple2};
  }
  ul {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 10px;
  }
`;

export default LikesBox;
