import { CheckCircleOutline } from "@mui/icons-material";
import { VoteDocument } from "util/getFirebaseDoc";
import styled from "styled-components";
import { voteTimestamp } from "util/timestamp";
import { Link } from "react-router-dom";
import device from "theme/mediaQueries";

interface PropsType {
  item: VoteDocument;
  index: number;
}

const VoteBox = ({ item, index }: PropsType) => {
  return (
    <Vote>
      <VoteLists>
        <h4>Q. {item.vote.title}</h4>
        {item.vote?.voteItem?.map((item) => (
          <li key={item.id}>
            <CheckCircleOutline />
            <span>{item.item}</span>
          </li>
        ))}
      </VoteLists>
      <VoteBottom>
        <p>투표기한: {voteTimestamp(item.deadline)}</p>
        <Link to={`/vote/${index}`} state={{ item: item }}>
          투표하러 가기
        </Link>
      </VoteBottom>
    </Vote>
  );
};

const Vote = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  border-radius: 10px;
  padding: 15px 20px 10px;
  margin: 10px auto 15px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  @media ${device.tablet} {
    width: 340px;
  }
`;

const VoteLists = styled.ul`
  > h4 {
    font-size: 14px;
    font-weight: 700;
    border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
    padding-bottom: 10px;
  }
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
  @media ${device.tablet} {
    > h4 {
      font-size: 16px;
    }
    > li {
      font-size: 16px;
      padding: 4px 10px;
      margin-top: 10px;
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
`;

const VoteBottom = styled.div`
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
    width: 100px;
  }
  @media ${device.tablet} {
    margin-top: 30px;
    > p {
      font-size: 14px;
    }
    > a {
      font-size: 14px;
      width: 120px;
    }
  }
`;

export default VoteBox;
