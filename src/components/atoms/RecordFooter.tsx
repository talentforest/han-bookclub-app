import {
  Close,
  ExpandLess,
  ExpandMore,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import UsernameBox from 'components/organisms/UsernameBox';
import { IDocument } from 'data/documentsAtom';
import { currentUserState } from 'data/userAtom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import BookImgTitle from './BookImgTitle';
import useHandleLike from 'hooks/useHandleLike';

interface IRecordFooterProps {
  record: IDocument;
  collName?: string;
}

const RecordFooter = ({ record, collName }: IRecordFooterProps) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Footer>
      <BookImgTitle thumbnail={record.thumbnail} title={record.title} smSize />
      {collName ? (
        <Likes>
          <LikeUserBox type='button' onClick={toggleShowLikeUsers}>
            {showLikeUsers ? <ExpandMore /> : <ExpandLess />}
            {record?.likeUsers?.length || 0}명이 좋아합니다
          </LikeUserBox>
          {like ? (
            <Favorite onClick={onLikeClick} />
          ) : (
            <FavoriteBorder onClick={onLikeClick} />
          )}
        </Likes>
      ) : (
        !!record?.likeUsers?.length && (
          <Likes $nonClick>
            <LikeUserBox type='button' onClick={toggleShowLikeUsers}>
              {showLikeUsers ? <ExpandMore /> : <ExpandLess />}
              {record?.likeUsers?.length || 0}명이 좋아합니다
            </LikeUserBox>
            <Favorite />
          </Likes>
        )
      )}
      {showLikeUsers && (
        <LikeUserList onClick={toggleShowLikeUsers}>
          <h4>
            좋아한 사람 <Close />
          </h4>
          {record?.likeUsers?.map((user) => (
            <UsernameBox key={user} creatorId={user} />
          ))}
        </LikeUserList>
      )}
    </Footer>
  );
};

const Footer = styled.footer`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LikeUserList = styled.ul`
  box-shadow: ${(props) => props.theme.boxShadow};
  position: absolute;
  bottom: 30px;
  right: 20px;
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
    svg {
      fill: ${(props) => props.theme.text.lightBlue};
      width: 16px;
      margin-left: 15px;
    }
  }
`;
const LikeUserBox = styled.button`
  text-align: end;
  color: ${(props) => props.theme.text.lightBlue};
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    width: 18px;
    fill: ${(props) => props.theme.text.lightBlue};
    margin-top: 2px;
    margin-right: 1px;
  }
`;
const Likes = styled.div<{ $nonClick?: boolean }>`
  display: flex;
  align-items: center;
  gap: 2px;
  text-align: end;
  justify-content: flex-end;
  > span {
    text-align: end;
    color: ${(props) => props.theme.text.lightBlue};
    font-size: 12px;
  }
  > svg {
    cursor: ${(props) => (props.$nonClick ? 'none' : 'pointer')};
    width: ${(props) => (props.$nonClick ? '16px' : '22px')};
    fill: ${(props) => (props.$nonClick ? '#ff7f7f' : '#ff3131')};
    filter: drop-shadow(1px 2px 2px rgba(255, 0, 0, 0.3));
  }
`;

export default RecordFooter;
