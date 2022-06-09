import { Notes, Star } from "@mui/icons-material";
import { IRecord } from "./MyRecords";
import styled from "styled-components";

interface PropsType {
  item: IRecord;
  index: number;
  onSubjectClick: (id: string) => void;
  onReviewClick: (id: string) => void;
}

const MyRecord = ({ item, onSubjectClick, onReviewClick }: PropsType) => {
  return (
    <Record>
      <div>
        <img
          src={
            item.subjects[0]
              ? item.subjects[0].thumbnail
              : item.reviews[0].thumbnail
          }
          alt="Book"
        />
        <h3>{item.title}</h3>
      </div>
      <Rate>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </Rate>
      <Category>
        <div>
          <Notes />
          <button onClick={() => onSubjectClick(item.title)}>
            발제문 보기
          </button>
        </div>
        <div>
          <Notes />
          <button onClick={() => onReviewClick(item.title)}>
            모임후기 보기
          </button>
        </div>
      </Category>
    </Record>
  );
};

const Category = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  width: 100%;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    > svg {
      width: 16px;
      height: 16px;
    }
    > button {
      font-size: 12px;
      cursor: pointer;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      &:hover {
        span {
          color: ${(props) => props.theme.text.accent};
        }
        svg {
          fill: ${(props) => props.theme.text.accent};
        }
      }
    }
  }
`;

const Record = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  border-radius: 5px;
  width: 230px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      height: 50px;
      width: auto;
      box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
    }
    h3 {
      font-size: 10px;
      font-weight: 700;
      margin-top: 6px;
    }
  }
`;

const Rate = styled.div`
  margin-top: 5px;
  svg {
    fill: gold;
  }
`;

export default MyRecord;
