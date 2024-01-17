import { IDocument } from 'data/documentsAtom';
import { currentUserState } from 'data/userAtom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { FiChevronDown, FiChevronUp, FiHeart } from 'react-icons/fi';
import UserNameBox from 'components/organisms/UserNameBox';
import useHandleLike from 'hooks/useHandleLike';
import styled from 'styled-components';

interface IRecordFooterProps {
  record: IDocument;
  collName: string;
}

const LikesBox = ({ record, collName }: IRecordFooterProps) => {
  const currentUser = useRecoilValue(currentUserState);

  const { like, setLike, onLikeClick, showLikeUsers, toggleShowLikeUsers } =
    useHandleLike({
      likes: record?.likes || 0,
      likeUsers: record?.likeUsers || [],
      docId: record.id,
      collName,
    });

  const currentUserLike = record?.likeUsers?.some(
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
        {record?.likeUsers?.length || 0}명이 좋아합니다
      </ShowUserBtn>

      <LikeBtn type='button' disabled={!collName} onClick={onLikeClick}>
        <FiHeart
          stroke={!collName ? '#aaa' : 'red'}
          fill={!collName ? '#aaa' : !like ? 'transparent' : 'red'}
          fontSize={13}
        />
      </LikeBtn>

      {showLikeUsers && (
        <LikeUserList onClick={toggleShowLikeUsers}>
          <h4>좋아한 사람</h4>
          {record?.likeUsers?.map((user) => (
            <UserNameBox key={user} creatorId={user} />
          ))}
        </LikeUserList>
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
  font-size: 12px;
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

const LikeUserList = styled.ul`
  box-shadow: ${(props) => props.theme.boxShadow};
  position: absolute;
  bottom: 30px;
  right: 5px;
  width: fit-content;
  min-height: 100px;
  background-color: ${(props) => props.theme.container.lightBlue};
  z-index: 10;
  border-radius: 8px;
  padding: 5px 10px 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  h4 {
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme.text.lightBlue};
  }
`;

export default LikesBox;
