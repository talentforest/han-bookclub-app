import { KeyboardArrowUp } from "@mui/icons-material";
import { BookDocument } from "data/bookAtom";
import { useEffect, useState } from "react";
import { getAllRecommends, getReviews, getSubjects } from "util/getFirebaseDoc";
import Subtitle from "components/common/Subtitle";
import Subjects from "components/bookmeeting/Subjects";
import Reviews from "components/bookmeeting/Reviews";
import styled from "styled-components";
import device from "theme/mediaQueries";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import MeetingInfoBox from "components/common/MeetingInfoBox";

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
  const [recommends, setRecommends] = useState([]);
  const [folderOpen, setFolderOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("subjects");
  const docMonth = item.id;

  useEffect(() => {
    getSubjects(item.id, setSubjects);
    getReviews(item.id, setReviews);
    getAllRecommends(item.id, setRecommends);
    return () => {
      getSubjects(item.id, setSubjects);
      getReviews(item.id, setReviews);
      getAllRecommends(item.id, setRecommends);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = () => {
    setFolderOpen((prev) => !prev);
  };

  const onButtonClick = (name: string) => {
    if (name === "subjects") return setSelectedCategory("subjects");
    if (name === "reviews") return setSelectedCategory("reviews");
    if (name === "recommend") return setSelectedCategory("recommend");
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
      <Info>
        <BookTitleImgBox docData={item?.book} />
        <MeetingInfoBox docData={item?.meeting} />
      </Info>
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
            <button
              onClick={() => onButtonClick("recommend")}
              className={selectedCategory === "recommend" ? "isActive" : ""}
            >
              추천책 보기
            </button>
          </BookSection>
          {selectedCategory === "subjects" &&
            (subjects.length !== 0 ? (
              subjects.map((item) => (
                <Subjects key={item.id} item={item} docMonth={docMonth} />
              ))
            ) : (
              <EmptyRecord>기록된 발제문이 아직 없어요.</EmptyRecord>
            ))}
          {selectedCategory === "reviews" &&
            (reviews.length !== 0 ? (
              reviews.map((item) => (
                <Reviews key={item.id} item={item} docMonth={docMonth} />
              ))
            ) : (
              <EmptyRecord>기록된 모임 후기가 아직 없어요.</EmptyRecord>
            ))}
          {selectedCategory === "recommend" &&
            (recommends.length !== 0 ? (
              recommends.map((item) => (
                <Reviews key={item.id} item={item} docMonth={docMonth} />
              ))
            ) : (
              <EmptyRecord>기록된 추천책이 아직 없어요.</EmptyRecord>
            ))}
        </>
      ) : (
        <></>
      )}
    </BookMeetingInfo>
  );
};

const BookMeetingInfo = styled.div`
  width: 100%;
  border-radius: 7px;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  @media ${device.tablet} {
    margin-top: 20px;
    width: 48%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > div:last-child {
    box-shadow: none;
    width: 260px;
    margin-top: 0;
  }
  @media ${device.tablet} {
  }
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

const BookSection = styled.div`
  button {
    cursor: pointer;
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
  @media ${device.tablet} {
    margin-top: 10px;
  }
`;

const Record = styled.div`
  margin: 20px 10px 0px;
  display: flex;
  justify-content: start;
  align-items: center;
  width: fit-content;
  cursor: pointer;
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

export default HistoryBox;
