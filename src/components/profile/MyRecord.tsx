import { Notes, Star } from "@mui/icons-material";
import { DocumentType } from "components/bookmeeting/Subjects";
import styled from "styled-components";

interface RecordType {
  bookTitle: string;
  reviewsGroup?: DocumentType[];
  subjectsGroup?: DocumentType[];
}

interface PropsType {
  item: RecordType;
  index: number;
  onRecordClick: (id: string) => void;
  onReviewClick: (id: string) => void;
}

const MyRecord = ({ item, index, onRecordClick, onReviewClick }: PropsType) => {
  return (
    <Record>
      <div>
        <img
          src={
            item.subjectsGroup.map((item: DocumentType) => item.bookCover)[0]
          }
          alt="Book"
        />
        <h3>{item.bookTitle}</h3>
      </div>
      <Rate>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </Rate>
      <div>
        <button onClick={() => onRecordClick(item.bookTitle)}>
          <Notes />
          <span>발제문 보기</span>
        </button>
        <button onClick={() => onReviewClick(item.bookTitle)}>
          <Notes />
          <span>모임후기 보기</span>
        </button>
      </div>
    </Record>
  );
};

const Record = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  border-radius: 5px;
  width: 200px;
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
  > div:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    width: 100%;
    > button {
      cursor: pointer;
      width: 50%;
      padding: 1px 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background-color: transparent;
      border-radius: 15px;
      svg {
        width: 18px;
        height: 18px;
        margin-right: 4px;
      }
      span {
        font-size: 10px;
      }
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

const Rate = styled.div`
  margin-top: 5px;
  svg {
    fill: gold;
  }
`;

export default MyRecord;
