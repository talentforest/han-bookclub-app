import { BigBox } from "theme/commonStyle";
import styled from "styled-components";
import LinkButton from "./LinkButton";

const VoteBox = () => {
  return (
    <Vote>
      <p>Q. 6월 책은 뭐할까용?</p>
      <ul>
        <li>발칙한 현대세계사아아아아아아아아</li>
        <li>빨강의 자서전</li>
        <li>떨림과 울림</li>
      </ul>
      <span>•••</span>
      <div>
        <LinkButton link={"/vote"} title="해당 투표 보기" />
      </div>
    </Vote>
  );
};

const Vote = styled(BigBox)`
  display: flex;
  flex-direction: column;
  padding: 15px;
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
      font-size: 13px;
      border: 1px solid ${(props) => props.theme.text.lightGray};
      border-radius: 10px;
      padding: 2px 10px;
      margin-top: 5px;
      background-color: ${(props) => props.theme.container.lightBlue};
    }
  }
  > div {
    display: flex;
    justify-content: center;
    height: 20px;
  }
`;

export default VoteBox;
