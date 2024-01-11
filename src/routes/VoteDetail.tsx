import { krCurTime, isoFormatDate } from 'util/index';
import { useLocation } from 'react-router-dom';
import UsernameBox from 'components/organisms/UsernameBox';
import useHandleVoting from 'hooks/useHandleVoting';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import FormDetails from 'components/organisms/votedetail/FormDetails';
import Percentage from 'components/organisms/votedetail/Percentage';
import ShareButton from 'components/atoms/buttons/ShareBtn';
import SubmitBtn from 'components/atoms/buttons/SubmitBtn';
import Subtitle from 'components/atoms/Subtitle';

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
  const expiredVote = currentVote?.deadline < isoFormatDate(krCurTime);

  return (
    currentVote?.vote?.voteItem && (
      <main>
        <Form onSubmit={onVotingSubmit}>
          <FormDetails voteDetail={currentVote} />
          {expiredVote || mySubmittedVote.length ? (
            <>
              <Votelist $disabled>
                {currentVote.vote.voteItem.map((voteItem) => (
                  <VoteItem
                    key={voteItem.id}
                    $selected={!!mySubmittedVoteItems(voteItem.id)}
                  >
                    <ItemText>{voteItem.item}</ItemText>
                    <Percentage
                      voteItems={currentVote.vote.voteItem}
                      voteItemId={voteItem.id}
                    />
                  </VoteItem>
                ))}
              </Votelist>
              <SubmitBtn children='투표 완료' disabled={true} />
            </>
          ) : (
            <>
              <Votelist>
                {currentVote?.vote?.voteItem.map((voteItem) => (
                  <VoteItem
                    key={voteItem.id}
                    onClick={() => onVoteItemClick(voteItem.id)}
                    $selected={!!selectedItem(voteItem.id)}
                  >
                    <ItemText>{voteItem.item}</ItemText>
                    <Percentage
                      voteItems={currentVote.vote.voteItem}
                      voteItemId={voteItem.id}
                    />
                  </VoteItem>
                ))}
              </Votelist>
              <SubmitBtn children='투표하기' />
            </>
          )}
        </Form>
        <InfoBox>
          <ShareButton
            title='✨새로운 투표가 등록되었어요!'
            description='투표하러 가볼까요? 👀'
            path='vote'
          />
          <Subtitle title={`투표인원: ${votingMember.length}명`} />
          <VoteMember>
            {votingMember.map((member) => (
              <li key={member.id}>
                <UsernameBox creatorId={member.id} key={member.id} />
              </li>
            ))}
          </VoteMember>
        </InfoBox>
      </main>
    )
  );
};

const Form = styled.form`
  margin-bottom: 20px;
  button {
    margin-bottom: 5px;
  }
`;
const Votelist = styled.ul<{ $disabled?: boolean }>`
  position: relative;
  margin-bottom: 10px;
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'all')};
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
  border: ${(props) =>
    props.$selected
      ? `2px solid ${props.theme.container.blue}`
      : `1px solid ${props.theme.text.lightGray}`};
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  background-color: ${(props) => props.theme.container.default};
  > svg {
    z-index: 1;
    width: 18px;
    height: 18px;
    margin-right: 5px;
    fill: ${(props) =>
      props.$selected
        ? props.theme.container.blue
        : props.theme.text.lightGray};
  }
  @media ${device.tablet} {
    padding: 10px 15px;
    margin-top: 15px;
    min-height: 50px;
    > svg {
      width: 24px;
      height: 24px;
    }
  }
`;
const ItemText = styled.span`
  z-index: 1;
  width: 75%;
  @media ${device.tablet} {
    font-size: 18px;
    width: 85%;
  }
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  > button {
    align-self: flex-end;
  }
`;
const VoteMember = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 5px 10px;
  list-style: none;
  @media ${device.tablet} {
    font-size: 18px;
  }
`;

export default VoteDetail;
