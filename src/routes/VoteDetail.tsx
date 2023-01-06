import { CheckCircleOutline, Replay } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { today } from 'util/index';
import { IVote } from 'data/voteItemAtom';
import UsernameBox from 'components/organisms/UsernameBox';
import useHandleVoting from 'hooks/useHandleVoting';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import FormDetails from 'components/organisms/votedetail/FormDetails';
import Percentage from 'components/organisms/votedetail/Percentage';
import ShareButton from 'components/atoms/buttons/ShareBtn';
import SubmitBtn from 'components/atoms/buttons/SubmitBtn';
import HandleBtn from 'components/atoms/buttons/HandleBtn';
import Subtitle from 'components/atoms/Subtitle';

type LocationState = { state: { voteDetail: IVote } };

const VoteDetail = () => {
  const {
    state: { voteDetail },
  } = useLocation() as LocationState;
  const {
    voteDisabled,
    voteItems,
    totalVoteCount,
    myVote,
    personalVote,
    onRevoteClick,
    mySelectingItem,
    mySelectedItem,
    existVoteCount,
    onVotingSubmit,
    onVoteItemClick,
  } = useHandleVoting(voteDetail);
  const expiredVote = voteDetail.deadline < today;

  return (
    <main>
      <Vote $expired={!!expiredVote}>
        {!myVote.length ? (
          <Form $expired={!!expiredVote} onSubmit={onVotingSubmit}>
            <FormDetails voteDetail={voteDetail} />
            <Votelist $disabled={!!voteDisabled}>
              {voteDetail.vote.voteItem.map((item) => (
                <VoteItem
                  key={item.id}
                  onClick={() =>
                    onVoteItemClick(item.id, item.item, item.voteCount)
                  }
                  $selected={!!mySelectingItem(item)}
                >
                  <CheckCircleOutline />
                  <ItemText $shrinkWidth={!!existVoteCount(item.id)}>
                    {item.item}
                  </ItemText>
                  <Percentage
                    voteItems={voteItems}
                    item={item}
                    totalVoteCount={totalVoteCount}
                  />
                </VoteItem>
              ))}
            </Votelist>
            <SubmitBtn children='투표하기' disabled={!!voteDisabled} />
          </Form>
        ) : (
          <Form $expired={!!expiredVote}>
            <FormDetails voteDetail={voteDetail} />
            <Votelist $disabled>
              {voteDetail.vote.voteItem.map((item) => (
                <VoteItem key={item.id} $selected={!!mySelectedItem(item)}>
                  <CheckCircleOutline />
                  <ItemText $shrinkWidth={!!existVoteCount(item.id)}>
                    {item.item}
                  </ItemText>
                  <Percentage
                    voteItems={voteItems}
                    item={item}
                    totalVoteCount={totalVoteCount}
                  />
                </VoteItem>
              ))}
            </Votelist>
            <SubmitBtn children='투표하기' disabled />
            <HandleBtn handleClick={onRevoteClick}>
              다시 투표하기 <Replay />
            </HandleBtn>
          </Form>
        )}
      </Vote>
      <InfoBox>
        <ShareButton
          title='✨새로운 투표가 등록되었어요!'
          description='투표하러 가볼까요? 👀'
          path='vote'
        />
        <Subtitle title={`투표인원: ${personalVote.length}명`} />
        <VoteMember>
          {personalVote.map((member) => (
            <li key={member.id}>
              <UsernameBox creatorId={member.id} key={member.id} />
            </li>
          ))}
        </VoteMember>
      </InfoBox>
    </main>
  );
};

const Vote = styled.div<{ $expired: boolean }>`
  width: 100%;
  margin-bottom: 20px;
  pointer-events: ${(props) => (props.$expired ? 'none' : 'all')};
`;
const Form = styled.form<{ $expired: boolean }>`
  > button {
    margin-bottom: 5px;
    background-color: ${(props) =>
      props.$expired ? props.theme.text.lightGray : ''};
    color: ${(props) => (props.$expired ? props.theme.text.gray : '')};
    svg {
      fill: ${(props) => (props.$expired ? props.theme.text.gray : '')};
    }
  }
`;
const Votelist = styled.ul<{ $disabled: boolean }>`
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
  border: ${(props) =>
    props.$selected
      ? `2px solid ${props.theme.container.blue}`
      : `1px solid ${props.theme.text.lightGray}`};
  border-radius: 5px;
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
const ItemText = styled.span<{ $shrinkWidth: boolean }>`
  z-index: 1;
  width: ${(props) => (props.$shrinkWidth ? '77%' : '100%')};
  @media ${device.tablet} {
    font-size: 18px;
    width: ${(props) => (props.$shrinkWidth ? '85%' : '100%')};
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
