import { Help } from "@mui/icons-material";
import { today } from "util/constants";
import { IVote } from "util/getFirebaseDoc";
import { dDay } from "util/timestamp";
import UserInfoBox from "components/common/UserInfoBox";
import styled from "styled-components";
import device from "theme/mediaQueries";

interface PropsType {
  voteDetail: IVote;
}

const FormDetails = ({ voteDetail }: PropsType) => {
  const { deadline, vote, creatorId } = voteDetail;
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
        <span>
          투표 등록: <UserInfoBox creatorId={creatorId} />
        </span>
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
      <p>각 퍼센티지는 현재 득표율이며, 중복 투표도 가능합니다.</p>
    </>
  );
};

const VoteHeader = styled.header`
  margin: 5px 0 15px;
  padding: 10px 0;
  border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
  > h4 {
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
  > span {
    display: flex;
    align-items: center;
    font-size: 14px;
    > div {
      margin-left: 5px;
    }
  }
  @media ${device.tablet} {
    > h4 {
      font-size: 22px;
    }
    > span {
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
      padding-top: 10px;
      line-height: 1.6;
    }
  }
`;

export default FormDetails;
