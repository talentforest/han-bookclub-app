import { todayWithHyphen } from 'util/index';
import { useLocation } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';
import { BOOK_VOTE, VOTE } from 'constants/index';
import useHandleVoting from 'hooks/useHandleVoting';
import MobileHeader from 'layout/mobile/MobileHeader';
import SquareBtn from 'components/atoms/button/SquareBtn';
import DDay from 'components/atoms/DDay';
import UserName from 'components/atoms/UserName';
import VoteDetailHeader from 'components/organisms/VoteDetailHeader';
import VoteBarItem from 'components/molecules/VoteBarItem';
import VoteBookItem from 'components/molecules/VoteBookItem';
import GuideLine from 'components/atoms/GuideLine';
import VoteGaugeBarBox from 'components/molecules/VoteGaugeBarBox';
import VoteBookItemBtn from 'components/atoms/button/VoteBookItemBtn';
import VoteItemReasonBox from 'components/molecules/VoteItemReasonBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

type LocationState = {
  state: {
    collName: string;
    docId: string;
  };
};

const VoteDetail = () => {
  const {
    state: { collName, docId },
  } = useLocation() as LocationState;

  const {
    bookVote,
    votedItemsByMember,
    voteCountsById,
    totalVoteCount,
    selectedItem,
    onVotingSubmit,
    onVoteItemClick,
    myVotedItems,
    isMyVotedItems,
    onVoteDeleteClick,
    isRevote,
    onToggleRevoteClick,
  } = useHandleVoting({ collName, docId });

  const expiredVote = bookVote?.deadline < todayWithHyphen;

  return (
    <>
      <MobileHeader
        title={`${expiredVote ? '만료된 ' : ''}모임책 투표함`}
        backBtn
      />

      {bookVote?.voteItems && (
        <main>
          <VoteDetailHeader
            vote={bookVote}
            onVoteDeleteClick={onVoteDeleteClick}
          />

          <VoteItemReasonBox voteItems={bookVote.voteItems} />

          <GuideLine text='중복 투표도 가능해요' />

          {expiredVote || (myVotedItems && !isRevote) ? (
            <CurrentVoteItems>
              {collName === VOTE && (
                <BarItemList $disabled>
                  {bookVote.voteItems.map((voteItem) => (
                    <VoteBarItem
                      key={voteItem.id}
                      selected={isMyVotedItems(voteItem.id)}
                      voteCountsById={voteCountsById}
                      totalVoteCount={totalVoteCount}
                      voteItem={voteItem}
                    />
                  ))}
                </BarItemList>
              )}

              {collName === BOOK_VOTE && (
                <>
                  <BookItemList>
                    {bookVote.voteItems.map((voteItem) => (
                      <VoteBookItem key={voteItem.id} voteItem={voteItem} />
                    ))}
                  </BookItemList>

                  <VoteGaugeBarBox
                    voteCountsById={voteCountsById}
                    totalVoteCount={totalVoteCount}
                  />
                </>
              )}

              <SquareBtn name='투표 완료' disabled />

              <SquareBtn
                disabled={expiredVote}
                type='button'
                name='다시 투표하기'
                handleClick={onToggleRevoteClick}
              />
            </CurrentVoteItems>
          ) : (
            <Form onSubmit={onVotingSubmit}>
              <BookItemList>
                {bookVote.voteItems.map((voteItem) => (
                  <VoteBookItem
                    key={voteItem.id}
                    selected={!!selectedItem(voteItem.id)}
                    voteItem={voteItem}
                  >
                    <VoteBookItemBtn
                      selected={!!selectedItem(voteItem.id)}
                      onVoteItemClick={() => onVoteItemClick(voteItem.id)}
                    />
                  </VoteBookItem>
                ))}
              </BookItemList>

              <SquareBtn type='submit' name='투표하기' />
            </Form>
          )}

          {!expiredVote && <DDay hyphenDate={bookVote.deadline} />}

          <VoteMemberBox>
            <h4>
              <FiUsers />
              {`투표인원: ${votedItemsByMember?.length}명`}
            </h4>
            <MemberList>
              {votedItemsByMember.map((member) => (
                <UserName tag key={member.id} userId={member.id} />
              ))}
            </MemberList>
          </VoteMemberBox>
        </main>
      )}
    </>
  );
};

const Form = styled.form`
  margin-bottom: 20px;
  > button {
    margin-bottom: 5px;
  }
`;

const CurrentVoteItems = styled.div`
  margin-bottom: 40px;
  > button {
    margin-top: 12px;
    font-weight: 500;
  }
`;

const BookItemList = styled.ul`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
  flex-wrap: wrap;
  li {
    width: 150px;
  }
  @media ${device.tablet} {
    gap: 30px;
    li {
      width: 160px;
    }
  }
`;

const BarItemList = styled.ul<{ $disabled?: boolean }>`
  position: relative;
  margin: 4px 0 30px;
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'all')};
  @media ${device.tablet} {
    margin-bottom: 30px;
  }
`;

const VoteMemberBox = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  h4 {
    font-weight: 500;
    color: ${({ theme }) => theme.text.gray4};
    svg {
      font-size: 14px;
      margin-right: 4px;
      stroke: ${({ theme }) => theme.text.gray3};
    }
  }
`;

const MemberList = styled.div`
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
