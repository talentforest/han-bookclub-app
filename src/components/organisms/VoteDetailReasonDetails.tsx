import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { dbService } from 'fbase';
import { IVote } from 'data/voteAtom';
import { FiTrash2 } from 'react-icons/fi';
import { VOTE } from 'constants/index';
import { getLocaleDate } from 'util/index';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import GuideLine from 'components/atoms/GuideLine';
import ShareButton from 'components/atoms/button/ShareBtn';
import UserName from 'components/atoms/UserName';

interface PropsType {
  voteDetail: IVote;
}

const VoteDetailReasonDetails = ({ voteDetail }: PropsType) => {
  const { vote, creatorId, id, createdAt } = voteDetail;
  const userData = useRecoilValue(currentUserState);

  const navigate = useNavigate();
  const docRef = doc(dbService, VOTE, `${id}`);

  const onDeleteClick = async () => {
    const confirm = window.confirm('정말 투표를 삭제하시겠습니까?');
    if (!confirm) return;
    await deleteDoc(docRef);
    navigate(-1);
  };

  return (
    <>
      <VoteInfo>
        <span>투표 등록 멤버: </span>
        <UserName tag userId={creatorId} />
        <div>
          {creatorId === userData.uid && (
            <FiTrash2 stroke='#888' onClick={onDeleteClick} />
          )}
          <ShareButton
            title='✨새로운 투표가 등록되었어요!'
            description='투표하러 가볼까요? 👀'
            path='vote'
          />
        </div>
      </VoteInfo>

      <VoteInfo>
        <span>투표 등록일: </span>
        <span>{getLocaleDate(createdAt)}</span>
      </VoteInfo>

      <Title>{vote.title}</Title>

      {vote.voteItem[0].selectReason && (
        <ReasonDetails>
          <summary>선정 이유 읽어보기</summary>
          {vote.voteItem.map((item) => (
            <ReasonDetailBox key={item.id}>
              <span>
                투표 항목 {item.id} : {item.item}
              </span>
              {item.selectReason && <p>{item.selectReason}</p>}
            </ReasonDetailBox>
          ))}
        </ReasonDetails>
      )}

      <GuideLine text='중복 투표가 가능합니다.' color='green' />
    </>
  );
};

const VoteInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 8px;
  > span {
    display: flex;
    align-items: center;
    font-size: 15px;
    padding-right: 5px;
  }
  div:last-child {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  @media ${device.tablet} {
  }
`;

const Title = styled.h3`
  white-space: pre-line;
  word-break: break-all;
  font-size: 18px;
  padding: 10px 0;
  margin-top: 10px;
`;

const ReasonDetails = styled.details`
  pointer-events: all;
  background-color: ${({ theme }) => theme.container.default};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 10px;
  margin: 5px 0 20px;
  border-radius: 10px;
  > summary {
    font-size: 14px;
    color: ${({ theme }) => theme.text.gray4};
    cursor: pointer;
  }
  @media ${device.tablet} {
    font-size: 16px;
    margin: 5px 0 40px;
  }
`;

const ReasonDetailBox = styled.div`
  white-space: pre-line;
  word-break: break-all;
  margin-top: 18px;
  background-color: ${({ theme }) => theme.container.default};
  span {
    font-size: 15px;
    line-height: 1.3;
    display: inline-block;
    padding: 2px 0 0 8px;
    width: 100%;
    border-left: 4px solid ${({ theme }) => theme.container.blue2};
    color: ${({ theme }) => theme.text.blue1};
  }
  p {
    font-size: 15px;
    white-space: pre-line;
    word-break: break-all;
    padding: 8px 0 2px;
    color: ${({ theme }) => theme.text.gray4};
  }
`;

export default VoteDetailReasonDetails;
