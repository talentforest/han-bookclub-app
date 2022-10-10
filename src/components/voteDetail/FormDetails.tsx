import { Delete, Help } from "@mui/icons-material";
import { today } from "util/constants";
import { IVote } from "util/getFirebaseDoc";
import { dDay } from "util/timestamp";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { dbService } from "fbase";
import UserInfoBox from "components/common/UserInfoBox";
import styled from "styled-components";
import device from "theme/mediaQueries";
import Guide from "components/common/Guide";

interface PropsType {
  voteDetail: IVote;
}

const FormDetails = ({ voteDetail }: PropsType) => {
  const { deadline, vote, creatorId, id } = voteDetail;
  const userData = useRecoilValue(currentUserState);
  const navigate = useNavigate();
  const docRef = doc(dbService, `Vote`, `${id}`);

  const onDeleteClick = async () => {
    const confirm = window.confirm("정말 투표를 삭제하시겠습니까?");
    if (confirm) {
      await deleteDoc(docRef);
      navigate(-1);
    } else {
      return;
    }
  };

  return (
    <>
      <span>
        {deadline < today()
          ? `등록일자: ${deadline.split("-").join(".")}`
          : `D-Day: ${dDay(deadline)}`}
      </span>
      <VoteHeader>
        <h4>
          <Help />
          {vote.title}
        </h4>
        <div>
          <span>
            투표 등록: <UserInfoBox creatorId={creatorId} />
          </span>
          {creatorId === userData.uid && <Delete onClick={onDeleteClick} />}
        </div>
      </VoteHeader>
      {vote.voteItem[0].selectReason && (
        <Reasons>
          <summary>선정 이유 읽어보기</summary>
          {vote.voteItem.map((item) => (
            <div key={item.id}>
              <div>
                <span>투표항목 {item.id} :</span> {item.item}
              </div>
              {item.selectReason && <p>{item.selectReason}</p>}
            </div>
          ))}
        </Reasons>
      )}
      <Guide text="각 퍼센티지는 현재 득표율이며, 중복 투표도 가능해요!" />
    </>
  );
};

const VoteHeader = styled.header`
  margin: 5px 0 15px;
  padding: 10px 0;
  border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
  > h4 {
    white-space: pre-line;
    word-break: break-all;
    font-size: 18px;
    font-weight: 700;
    padding-bottom: 10px;
    svg {
      float: left;
      width: 20px;
      height: 20px;
      margin: 4px 5px 0 0;
    }
  }
  > div {
    display: flex;
    justify-content: space-between;
    > span {
      display: flex;
      align-items: center;
      font-size: 14px;
    }
    svg {
      cursor: pointer;
      transition: transform 0.3ms ease;
      &:hover {
        fill: ${(props) => props.theme.container.blue};
        transform: scale(1.1);
      }
    }
  }
  @media ${device.tablet} {
    > h4 {
      font-size: 22px;
      svg {
        margin: 8px 5px 0 0;
      }
    }
    span {
      font-size: 16px;
    }
  }
`;

const Reasons = styled.details`
  background-color: #fffce7;
  border: 1px solid ${(props) => props.theme.container.yellow};
  padding: 10px;
  margin: 5px 0 10px;
  border-radius: 5px;
  font-size: 14px;
  > summary {
    color: ${(props) => props.theme.text.gray};
    cursor: pointer;
  }
  > div {
    border-bottom: 1px solid #ddd;
    padding: 10px 0 5px;
    &:last-child {
      border: none;
    }
    div {
      white-space: pre-line;
      word-break: break-all;
      padding: 5px;
      border-radius: 5px;
      background-color: ${(props) => props.theme.container.default};
      border: 1px solid ${(props) => props.theme.text.lightGray};
      font-weight: 700;
      span {
        color: ${(props) => props.theme.text.lightBlue};
      }
    }
    p {
      white-space: pre-line;
      word-break: break-all;
      padding-top: 10px;
      line-height: 1.6;
    }
  }
  @media ${device.tablet} {
    font-size: 16px;
    margin: 5px 0 40px;
  }
`;

export default FormDetails;
