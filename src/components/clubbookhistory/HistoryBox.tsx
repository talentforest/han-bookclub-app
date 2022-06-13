import { AccessTime, Book, KeyboardArrowUp, Place } from "@mui/icons-material";
import { BookDocument } from "data/bookAtom";
import { useEffect, useState } from "react";
import { getReviews, getSubjects } from "util/getFirebaseDoc";
import Subtitle from "components/common/Subtitle";
import Subjects from "components/bookmeeting/Subjects";
import Reviews from "components/bookmeeting/Reviews";
import styled from "styled-components";

export interface IMeeting {
  time: string;
  place: string;
}

export interface IBookMeetingInfo {
  id: string;
  book: BookDocument;
  meeting: IMeeting;
  creatorId: string;
  createdAt: string;
}

interface PropsType {
  item: IBookMeetingInfo;
}

const HistoryBox = ({ item }: PropsType) => {
  const [subjects, setSubjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [folderOpen, setFolderOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("subjects");

  useEffect(() => {
    getSubjects(item.id, setSubjects);
    getReviews(item.id, setReviews);
    return () => {
      getSubjects(item.id, setSubjects);
      getReviews(item.id, setReviews);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = () => {
    setFolderOpen((prev) => !prev);
  };

  const onButtonClick = (name: string) => {
    if (name === "subjects") return setSelectedCategory("subjects");
    if (name === "reviews") return setSelectedCategory("reviews");
  };

  return (
    <BookMeetingInfo>
      <Subtitle
        title={`${
          item.id.split("-")[1].split("")[0] === "0"
            ? item.id.split("-")[1].slice(1, 2)
            : item.id.split("-")[1]
        }월의 책`}
      />
      <BookInfo>
        {item?.book.thumbnail ? (
          <BookCover src={item?.book.thumbnail} alt="Book_Image" />
        ) : (
          <EmptySign>
            <Book />
          </EmptySign>
        )}
        <MeetingInfo>
          {item?.book.title ? (
            <h3>{item?.book.title}</h3>
          ) : (
            <h3>아직 등록된 책이 없습니다.</h3>
          )}
          <div>
            <span>
              모임 일정 <AccessTime />
            </span>
            <span>{item?.meeting.time}</span>
          </div>
          <div>
            <span>
              모임 장소 <Place />
            </span>
            <span>{item?.meeting.place}</span>
          </div>
        </MeetingInfo>
      </BookInfo>
      <Record onClick={onClick}>
        <h3>모임기록 보기</h3>
        <KeyboardArrowUp className={folderOpen ? "isActive" : ""} />
      </Record>
      {folderOpen ? (
        <>
          <BookSection>
            <button
              onClick={() => onButtonClick("subjects")}
              className={selectedCategory === "subjects" ? "isActive" : ""}
            >
              발제문 보기
            </button>
            <button
              onClick={() => onButtonClick("reviews")}
              className={selectedCategory === "reviews" ? "isActive" : ""}
            >
              모임 후기 보기
            </button>
          </BookSection>
          {selectedCategory === "subjects" &&
            (subjects.length !== 0 ? (
              subjects.map((item) => <Subjects key={item.id} item={item} />)
            ) : (
              <EmptyRecord>기록된 발제문이 아직 없어요.</EmptyRecord>
            ))}
          {selectedCategory === "reviews" &&
            (reviews.length !== 0 ? (
              reviews.map((item) => <Reviews key={item.id} item={item} />)
            ) : (
              <EmptyRecord>기록된 모임 후기가 아직 없어요.</EmptyRecord>
            ))}
        </>
      ) : (
        <></>
      )}
    </BookMeetingInfo>
  );
};

const BookSection = styled.div`
  button {
    padding: 3px 0;
    font-size: 10px;
    font-weight: 700;
    width: 80px;
    margin: 0 5px;
    border: none;
    border-radius: 30px;
    background-color: #eaeaea;
    color: #aaa;
    &.isActive {
      background-color: ${(props) => props.theme.container.blue};
      color: ${(props) => props.theme.text.white};
    }
  }
`;

const BookInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyRecord = styled.div`
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  font-size: 13px;
  text-align: center;
  background-color: ${(props) => props.theme.container.lightBlue};
`;

const BookMeetingInfo = styled.div`
  border-radius: 7px;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  h1 {
    font-size: 14px;
    font-weight: 700;
    margin: 20px 0 10px 10px;
  }
  h1:first-child {
    margin-top: 0;
  }
`;

const Record = styled.div`
  margin: 20px 10px 0px;
  display: flex;
  justify-content: start;
  align-items: center;
  h3 {
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 3px;
  }
  svg {
    &.isActive {
      transform: rotate(180deg);
    }
  }
`;

const EmptySign = styled.div`
  text-align: center;
  width: 70px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.theme.container.default};
  font-size: 13px;
  font-weight: 700;
`;

const BookCover = styled.img`
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
  height: 120px;
  width: auto;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
  margin-right: 20px;
`;

const MeetingInfo = styled.div`
  width: 50%;
  > h3 {
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 10px;
  }
  > div {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    > span:first-child {
      font-size: 12px;
      display: flex;
      align-items: center;
      border: 1px solid ${(props) => props.theme.container.blue};
      width: fit-content;
      padding: 0px 4px;
      border-radius: 15px;
      background-color: ${(props) => props.theme.container.lightBlue};
      color: ${(props) => props.theme.text.accent};
      svg {
        width: 15px;
        height: 15px;
        fill: ${(props) => props.theme.text.accent};
      }
    }
    > span:last-child {
      font-size: 14px;
      padding-left: 3px;
      margin-top: 3px;
    }
  }
`;

export default HistoryBox;
