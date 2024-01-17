import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { votesState } from 'data/documentsAtom';
import { krCurTime, isoFormatDate } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { FiPlusCircle } from 'react-icons/fi';
import VoteBox from 'components/organisms/vote/VoteBox';
import VoteCreateModal from 'components/organisms/modal/VoteCreateModal';
import Subtitle from 'components/atoms/Subtitle';
import ExpiredVoteBox from 'components/organisms/vote/ExpiredVoteBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import Loading from 'components/atoms/Loading';
import Header from 'layout/mobile/Header';

const Vote = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [votes, setVotes] = useRecoilState(votesState);

  const progressVotes = votes.filter(
    (item) => item.deadline >= isoFormatDate(krCurTime)
  );

  const expiredVote = votes.filter(
    (item) => item.deadline < isoFormatDate(krCurTime)
  );

  useEffect(() => {
    if (votes.length === 0) {
      getCollection('Vote', setVotes);
    }
  }, []);

  const onModalClick = () => setModalOpen((prev) => !prev);

  return (
    <>
      <Header title='한페이지의 투표함' />
      {votes.length === 0 ? (
        <Loading />
      ) : (
        <main>
          <AddVoteBtn onClick={onModalClick}>
            <FiPlusCircle fontSize={20} stroke='#2054ff' />
            <span>투표 등록하기</span>
          </AddVoteBtn>

          <Subtitle title='진행중인 투표함' />
          <VoteList>
            {progressVotes?.length ? (
              progressVotes.map((voteDetail) => (
                <VoteBox key={voteDetail.id} voteDetail={voteDetail} />
              ))
            ) : (
              <EmptyBox>아직 등록된 투표가 없습니다.</EmptyBox>
            )}
          </VoteList>

          <Subtitle title='기한이 만료된 투표함' />
          <VoteList>
            {expiredVote?.length ? (
              expiredVote.map((voteDetail) => (
                <ExpiredVoteBox key={voteDetail.id} voteDetail={voteDetail} />
              ))
            ) : (
              <EmptyBox>아직 만료된 투표가 없습니다.</EmptyBox>
            )}
          </VoteList>

          {modalOpen && <VoteCreateModal onModalClick={onModalClick} />}
        </main>
      )}
      ;
    </>
  );
};

const AddVoteBtn = styled.button`
  position: absolute;
  top: -28px;
  right: 20px;
  display: flex;
  align-items: center;
  border: none;
  color: ${(props) => props.theme.text.accent};
  font-size: 16px;
  span {
    display: none;
  }
  @media ${device.tablet} {
    padding: 10px;
  }
`;
const VoteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px auto 40px;
  width: 100%;
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 20px;
  }
`;
const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180px;
  padding: 10px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 10px;
  margin-bottom: 30px;
  color: #aaa;
  font-size: 14px;
`;

export default Vote;
