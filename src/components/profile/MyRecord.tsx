import { Notes } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { IBookMeetingInfo } from "components/clubbookhistory/HistoryBox";
import { getReviews, getSubjects } from "util/getFirebaseDoc";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import Subjects from "components/bookmeeting/Subjects";
import styled from "styled-components";
import Reviews from "components/bookmeeting/Reviews";

interface PropsType {
  item: IBookMeetingInfo;
}

const MyRecord = ({ item }: PropsType) => {
  const [subjects, setSubjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const userData = useRecoilValue(currentUserState);

  useEffect(() => {
    getSubjects(item.id, setSubjects);
    getReviews(item.id, setReviews);
    return () => {
      getSubjects(item.id, setSubjects);
      getReviews(item.id, setReviews);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mySubjects = subjects?.filter(
    (item) => item?.creatorId === userData.uid
  );

  const myReviews = reviews?.filter((item) => item?.creatorId === userData.uid);

  // const onSubjectClick = (title: string) => {
  //   const filteredArr = GroupedBySameBookRecord.filter(
  //     (item) => item.title === title
  //   );
  //   const subjects = filteredArr[0]?.subjects;
  //   setFilteredReview([]);
  //   setFilteredSubject(subjects);
  // };

  // const onReviewClick = (title: string) => {
  //   const filteredArr = GroupedBySameBookRecord.filter(
  //     (item) => item.title === title
  //   );
  //   const reviews = filteredArr[0]?.reviews;
  //   setFilteredSubject([]);
  //   setFilteredReview(reviews);
  // };

  return (
    <>
      {mySubjects.length !== 0 || myReviews.length !== 0 ? (
        <Container>
          <Record>
            <div>
              <img src={item.book.thumbnail} alt="Book" />
              <h3>{item.book.title}</h3>
            </div>
            <Category>
              <div>
                <Notes />
                <button>발제문 보기</button>
              </div>
              <div>
                <Notes />
                <button>모임후기 보기</button>
              </div>
            </Category>
          </Record>
          <SubjectBox>
            {mySubjects.length !== 0 ? (
              mySubjects.map((item) => <Subjects key={item.id} item={item} />)
            ) : (
              <></>
            )}
            {myReviews.length !== 0 ? (
              myReviews.map((item) => <Reviews key={item.id} item={item} />)
            ) : (
              <></>
            )}
          </SubjectBox>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

const Container = styled.section`
  border: 1px solid red;
  margin: 0;
  padding: 0;

  height: fit-content;
`;

const SubjectBox = styled.article`
  border: 1px solid teal;
  position: absolute;
  bottom: -230px;
`;

const Record = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  border-radius: 5px;
  width: 230px;
  height: 140px;
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
      margin-top: 12px;
      text-align: center;
    }
  }
`;

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

export default MyRecord;
