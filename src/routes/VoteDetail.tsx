import { todayWithHyphen } from 'util/index';
import { useLocation } from 'react-router-dom';
import { FiCheckCircle, FiCircle } from 'react-icons/fi';
import useHandleVoting from 'hooks/useHandleVoting';
import device from 'theme/mediaQueries';
import VoteDetails from 'components/organisms/VoteDetailReasonDetails';
import VoteDetailItemPercent from 'components/organisms/VoteDetailItemPercent';
import MobileHeader from 'layout/mobile/MobileHeader';
import NameTag from 'components/atoms/NameTag';
import SquareBtn from 'components/atoms/button/SquareBtn';
import styled from 'styled-components';
import DDay from 'components/atoms/DDay';

type LocationState = { state: { voteDocId: string } };

const VoteDetail = () => {
  const {
    state: { voteDocId },
  } = useLocation() as LocationState;

  const {
    currentVote,
    votingMember,
    selectedItem,
    onVotingSubmit,
    onVoteItemClick,
    mySubmittedVote,
    mySubmittedVoteItems,
  } = useHandleVoting(voteDocId);
  const expiredVote = currentVote?.deadline < todayWithHyphen;

  return (
    <>
      <MobileHeader title='투표함' backBtn />

      {currentVote?.vote?.voteItem && (
        <main>
          <VoteDetails voteDetail={currentVote} />

          {expiredVote || mySubmittedVote.length ? (
            <ResultBox>
              <Votelist $disabled>
                {currentVote.vote.voteItem.map((voteItem) => (
                  <VoteItem
                    key={voteItem.id}
                    $selected={!!mySubmittedVoteItems(voteItem.id)}
                  >
                    <FiCheckCircle fontSize={14} stroke='#333' />
                    <ItemText>{voteItem.item}</ItemText>
                    <VoteDetailItemPercent
                      voteItems={currentVote.vote.voteItem}
                      voteItemId={voteItem.id}
                    />
                  </VoteItem>
                ))}
              </Votelist>

              <SquareBtn name='투표 완료' disabled />
            </ResultBox>
          ) : (
            <Form onSubmit={onVotingSubmit}>
              <Votelist>
                {currentVote?.vote?.voteItem.map((voteItem) => (
                  <VoteItem
                    key={voteItem.id}
                    onClick={() => onVoteItemClick(voteItem.id)}
                    $selected={!!selectedItem(voteItem.id)}
                  >
                    {!!selectedItem(voteItem.id) ? (
                      <FiCheckCircle fontSize={14} stroke='#2c4fff' />
                    ) : (
                      <FiCircle fontSize={14} stroke='#666' />
                    )}
                    <ItemText>{voteItem.item}</ItemText>
                    <VoteDetailItemPercent
                      voteItems={currentVote.vote.voteItem}
                      voteItemId={voteItem.id}
                    />
                  </VoteItem>
                ))}
              </Votelist>
              <SquareBtn type='submit' name='투표하기' />
            </Form>
          )}

          <DDay hyphenDate={currentVote.deadline} />

          <InfoBox>
            <h4>{`투표인원: ${votingMember.length}명`}</h4>
            <VoteMember>
              {votingMember.map((member) => (
                <NameTag key={member.id} name={member.id} />
              ))}
            </VoteMember>
          </InfoBox>
        </main>
      )}
    </>
  );
};

const Form = styled.form`
  margin-bottom: 20px;
  button {
    margin-bottom: 5px;
  }
`;

const ResultBox = styled.div`
  margin-bottom: 20px;
`;

const Votelist = styled.ul<{ $disabled?: boolean }>`
  position: relative;
  margin: 4px 0 10px;
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'all')};
  @media ${device.tablet} {
    margin-bottom: 30px;
  }
`;

const VoteItem = styled.li<{ $selected: boolean }>`
  cursor: pointer;
  white-space: pre-line;
  word-break: break-all;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  border: ${({ $selected, theme }) =>
    $selected
      ? `2px solid ${theme.container.blue3}`
      : `2px solid ${theme.text.gray1}`};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: ${({ theme }) => theme.container.default};
  svg {
    z-index: 2;
  }
  @media ${device.tablet} {
    padding: 10px 15px;
    margin-top: 15px;
    min-height: 50px;
  }
`;

const ItemText = styled.span`
  z-index: 1;
  width: 75%;
  line-height: 1.5;
  margin-left: 8px;
  @media ${device.tablet} {
    width: 85%;
    font-size: 18px;
  }
`;

const InfoBox = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const VoteMember = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  @media ${device.tablet} {
    font-size: 18px;
  }
`;

export default VoteDetail;
