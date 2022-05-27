import { BigBox } from "theme/commonStyle";
import { CheckCircle, CheckCircleOutline } from "@mui/icons-material";
import styled from "styled-components";
import LinkButton from "./LinkButton";

const VoteBox = () => {
  return (
    <Vote>
      <p>Q. 6월 책은 뭐할까용?</p>
      <ul>
        <li>
          <CheckCircleOutline />
          <span>발칙한 현대세계사아아아아아</span>
        </li>
        <li>
          <CheckCircleOutline />
          <span>빨강의 자서전</span>
        </li>
        <li>
          <CheckCircle />
          <span>떨림과 울림</span>
        </li>
      </ul>
      <span>•••</span>
      <LinkButton
        link={`/vote/${new Date().getMonth() + 1}`}
        title="해당 투표 보기"
      />
    </Vote>
  );
};

const Vote = styled(BigBox)`
  display: flex;
  flex-direction: column;
  padding: 15px 15px 10px;
  margin-right: 10px;
  > span {
    text-align: center;
  }
  > p {
    font-size: 12px;
    font-weight: 700;
    border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
    padding-bottom: 5px;
  }
  > ul {
    margin-top: 5px;
    > li {
      font-size: 12px;
      border: 1px solid ${(props) => props.theme.container.blue};
      border-radius: 10px;
      padding: 4px 10px;
      margin-top: 7px;
      background-color: ${(props) => props.theme.container.lightBlue};
      display: flex;
      align-items: center;
      > svg {
        width: 14px;
        height: 14px;
        margin-right: 5px;
      }
    }
  }
  > div {
    display: flex;
    justify-content: center;
  }
`;

export default VoteBox;
