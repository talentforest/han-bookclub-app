import { CheckCircleOutline } from "@mui/icons-material";
import { VoteDocument } from "util/getFirebaseDoc";
import styled from "styled-components";
import { voteTimestamp } from "util/timestamp";
import { Link } from "react-router-dom";

interface PropsType {
  item: VoteDocument;
  index: number;
}

const VoteBox = ({ item, index }: PropsType) => {
  return (
    <Vote>
      <h4>Q. {item.vote.title}</h4>
      <ul>
        {item.vote?.voteItem?.map((item) => (
          <li key={item.id}>
            <CheckCircleOutline />
            <span>{item.item}</span>
          </li>
        ))}
      </ul>
      <div>
        <p>투표기한: {voteTimestamp(item.vote.deadline)}</p>
        <Link to={`/vote/${index}`} state={{ item: item }}>
          투표하러 가기
        </Link>
      </div>
    </Vote>
  );
};

const Vote = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 15px 20px 10px;
  margin: 10px 10px 15px 0;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  > h4 {
    font-size: 14px;
    font-weight: 700;
    border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  > ul {
    > li {
      font-size: 14px;
      border: 1px solid ${(props) => props.theme.container.blue};
      border-radius: 5px;
      padding: 4px 10px;
      margin-top: 10px;
      background-color: ${(props) => props.theme.container.lightBlue};
      display: flex;
      align-items: center;
      height: 32px;
      > svg {
        width: 15px;
        height: 15px;
        margin-right: 5px;
      }
    }
  }
  > div {
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-top: 10px;
    > p {
      color: ${(props) => props.theme.text.accent};
      font-size: 12px;
      width: 100%;
    }
    > a {
      color: ${(props) => props.theme.text.accent};
      font-size: 12px;
      width: 100%;
      text-align: end;
    }
  }
`;

export default VoteBox;
