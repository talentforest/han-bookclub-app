import { Delete, Help } from '@mui/icons-material';
import { getDDay, krCurTime, isoFormatDate } from 'util/index';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { dbService } from 'fbase';
import { IVote } from 'data/voteItemAtom';
import UsernameBox from 'components/organisms/UsernameBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import Guide from 'components/atoms/Guide';
import InfoTag from 'components/atoms/InfoTag';

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
      <InfoTag
        tagName={
          deadline < isoFormatDate(krCurTime)
            ? `등록일자: ${registerDate}`
            : `D-Day: ${getDDay(deadline)}`
        }
      />
      <Title>
        <Help />
        {vote.title}
      </Title>
      <VoteInfo>
        <span>투표 등록: </span>
        <UsernameBox creatorId={creatorId} />
        {creatorId === userData.uid && <Delete onClick={onDeleteClick} />}
      </VoteInfo>
      {vote.voteItem[0].selectReason && (
        <Reasons>
          <summary>선정 이유 읽어보기</summary>
          {vote.voteItem.map((item) => (
            <Reason key={item.id}>
              <span>
                투표 항목 {item.id} : {item.item}
              </span>
              {item.selectReason && <p>{item.selectReason}</p>}
            </Reason>
          ))}
        </Reasons>
      )}
      <Guide text='중복 투표가 가능합니다.' />
    </>
  );
};

const Title = styled.h3`
  white-space: pre-line;
  word-break: break-all;
  font-size: 18px;
  font-weight: 700;
  padding: 10px 0;
  svg {
    float: left;
    width: 20px;
    height: 20px;
    margin: 4px 5px 0 0;
  }
`;
const VoteInfo = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 10px;
  > span {
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-right: 5px;
  }
  > svg {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    transition: transform 0.3ms ease;
    &:hover {
      fill: ${(props) => props.theme.container.blue};
      transform: scale(1.1);
    }
  }
  @media ${device.tablet} {
  }
`;
const Reasons = styled.details`
  pointer-events: all;
  background-color: ${(props) => props.theme.container.default};
  border: 1px solid ${(props) => props.theme.container.yellow};
  padding: 10px;
  margin: 10px 0 20px;
  border-radius: 10px;
  font-size: 14px;
  > summary {
    color: ${(props) => props.theme.text.gray};
    cursor: pointer;
  }
  @media ${device.tablet} {
    font-size: 16px;
    margin: 5px 0 40px;
  }
`;
const Reason = styled.div`
  white-space: pre-line;
  word-break: break-all;

  margin-top: 10px;
  background-color: ${(props) => props.theme.container.default};
  font-weight: 700;
  span {
    display: inline-block;
    padding-left: 10px;
    border-left: 6px solid ${(props) => props.theme.container.lightBlue};
    color: ${(props) => props.theme.text.lightBlue};
  }
  p {
    white-space: pre-line;
    word-break: break-all;
    padding-top: 10px;
    line-height: 1.6;
    color: ${(props) => props.theme.text.gray};
  }
`;

export default FormDetails;
