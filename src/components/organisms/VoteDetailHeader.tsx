import { IBookVote } from 'data/voteAtom';
import { getLocaleDate } from 'util/index';
import CreatorBox from 'components/molecules/CreatorBox';
import styled from 'styled-components';

interface PropsType {
  vote?: IBookVote;
}

const VoteDetailHeader = ({ vote }: PropsType) => {
  const { creatorId, createdAt, title } = vote;

  return (
    <VoteInfo>
      <CreatorBox creatorId={creatorId} />
      <RegisterDate>{getLocaleDate(createdAt)}</RegisterDate>

      {title && <Title>{title}</Title>}
    </VoteInfo>
  );
};

const VoteInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  border: 1px solid red;
  white-space: pre-line;
  word-break: break-all;
  font-size: 18px;
  padding: 10px 0;
  margin-top: 10px;
`;

const RegisterDate = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.text.gray4};
`;

export default VoteDetailHeader;
