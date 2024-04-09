import { IBookVote } from 'data/voteAtom';
import { getLocaleDate } from 'util/index';
import CreatorBox from 'components/molecules/CreatorBox';
import styled from 'styled-components';
import { FiTrash2 } from 'react-icons/fi';
import ShareBtn from 'components/atoms/button/ShareBtn';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';

interface PropsType {
  vote: IBookVote;
  onVoteDeleteClick: () => void;
}

const VoteDetailHeader = ({ vote, onVoteDeleteClick }: PropsType) => {
  const { creatorId, createdAt, title, voteItems } = vote;

  const { uid } = useRecoilValue(currentUserState);

  const voteItemBooks = voteItems
    .map((item) => `📚 ${item.book.title}`)
    .join(' vs ');

  return (
    <Header>
      <div>
        <CreatorBox creatorId={creatorId} />
        {uid === creatorId && (
          <Btns>
            <button
              type='button'
              className='delete-btn'
              onClick={onVoteDeleteClick}
            >
              <FiTrash2 />
            </button>

            <ShareBtn
              title={title}
              description={`${voteItemBooks}, 투표하러 가볼까요?`}
              path='vote'
            />
          </Btns>
        )}
      </div>

      {title && <Title>{title}</Title>}

      <RegisterDate>{getLocaleDate(createdAt)}</RegisterDate>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  flex-direction: column;
  > div {
    gap: 5px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const Title = styled.h3`
  white-space: pre-line;
  word-break: break-all;
  font-size: 18px;
  flex: 1;
  line-height: 1.4;
  margin: 15px 0 4px;
`;

const RegisterDate = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text.gray3};
  margin-bottom: 15px;
`;

const Btns = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  .delete-btn {
    padding-top: 4px;
  }
  svg {
    font-size: 18px;
    stroke: ${({ theme }) => theme.text.gray3};
  }
`;

export default VoteDetailHeader;
