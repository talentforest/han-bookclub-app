import { ArrowForwardIos, Help } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import device from "theme/mediaQueries";
import { IVote } from "util/getFirebaseDoc";
import { timestamp } from "util/timestamp";

interface PropsType {
  item: IVote;
  index: number;
}

const ExpiredVote = ({ item, index }: PropsType) => {
  return (
    <Vote to={`/vote/${index}`} state={{ item: item }}>
      <div>
        <h4>
          <Help />
          {item.vote.title}
        </h4>
        <span>{timestamp(item.deadline)}</span>
      </div>
      <ArrowForwardIos />
    </Vote>
  );
};

const Vote = styled(Link)`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  padding: 15px;
  background-color: ${(props) => props.theme.container.default};
  > div {
    h4 {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 700;
      svg {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
    span {
      display: block;
      font-size: 14px;
      margin-top: 10px;
    }
  }
  > svg {
    width: 16px;
    height: 16px;
    fill: ${(props) => props.theme.text.accent};
  }
  @media ${device.tablet} {
    > div {
      h4 {
        font-size: 16px;
        svg {
          width: 22px;
          height: 22px;
          margin-right: 10px;
        }
      }
      span {
        font-size: 16px;
      }
    }
    > svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export default ExpiredVote;
