import { getDDay, krCurTime, isoFormatDate } from 'util/index';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { dbService } from 'fbase';
import { IVote } from 'data/voteItemAtom';
import { FiTrash2 } from 'react-icons/fi';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import Guide from 'components/atoms/Guide';
import Tag from 'components/atoms/Tag';
import NameTag from 'components/atoms/NameTag';
import ShareButton from 'components/atoms/buttons/ShareBtn';

interface PropsType {
  voteDetail: IVote;
}

const FormDetails = ({ voteDetail }: PropsType) => {
  const { deadline, vote, creatorId, id } = voteDetail;
  const userData = useRecoilValue(currentUserState);

  const navigate = useNavigate();
  const docRef = doc(dbService, `Vote`, `${id}`);
  const registerDate = new Date(deadline).toLocaleDateString().slice(0, -1);

  const onDeleteClick = async () => {
    const confirm = window.confirm('정말 투표를 삭제하시겠습니까?');
    if (!confirm) return;
    await deleteDoc(docRef);
    navigate(-1);
  };

  return (
    <>
      <Tag
        name={
          deadline < isoFormatDate(krCurTime)
            ? `등록일자 : ${registerDate}`
            : `디데이 : ${getDDay(deadline)}`
        }
      />

      <VoteInfo>
        <span>투표 등록: </span>
        <NameTag name={creatorId} />

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

      <Guide text='중복 투표가 가능합니다.' />
    </>
  );
};

const VoteInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  > span {
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-right: 5px;
  }
  div {
    flex: 1;
    display: flex;
    padding-top: 3px;
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
  padding-top: 10px;
`;

const ReasonDetails = styled.details`
  pointer-events: all;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: ${(props) => props.theme.boxShadow};
  padding: 10px;
  margin: 5px 0 20px;
  border-radius: 10px;
  > summary {
    font-size: 14px;
    color: ${(props) => props.theme.text.gray};
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
  background-color: ${(props) => props.theme.container.default};
  span {
    font-size: 13px;
    line-height: 1;
    display: inline-block;
    padding: 2px 0 0 8px;
    width: 100%;
    border-left: 4px solid ${(props) => props.theme.container.lightBlue};
    color: ${(props) => props.theme.text.lightBlue};
  }
  p {
    font-size: 14px;
    white-space: pre-line;
    word-break: break-all;
    padding: 8px 0 2px;
    color: ${(props) => props.theme.text.gray};
  }
`;

export default FormDetails;
