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
  const [mySubjectsByBook, setMySubjectsByBook] = useState([]);
  const [myReviewsByBook, setMyReviewsByBook] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const userData = useRecoilValue(currentUserState);
  const docMonth = item.id;

  useEffect(() => {
    getSubjects(item.id, setSubjects);
    getReviews(item.id, setReviews);
    return () => {
      getSubjects(item.id, setSubjects);
      getReviews(item.id, setReviews);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCloseClick = () => {
    setOpenModal(false);
  };

  const mySubjects = subjects?.filter(
    (item) => item?.creatorId === userData.uid
  );

  const myReviews = reviews?.filter((item) => item?.creatorId === userData.uid);

  const onSubjectClick = (booktitle: string) => {
    const filteredArr = mySubjects.filter((item) => item.title === booktitle);
    if (filteredArr.length === 0) return;
    setOpenModal((prev) => !prev);
    setMyReviewsByBook([]);
    setMySubjectsByBook(filteredArr);
  };

  const onReviewClick = (booktitle: string) => {
    const filteredArr = myReviews.filter((item) => item.title === booktitle);
    if (filteredArr.length === 0) return;
    setOpenModal((prev) => !prev);
    setMySubjectsByBook([]);
    setMyReviewsByBook(filteredArr);
  };

  const onSubjectRemove = (targetId: string) => {
    const newSubjectArr = mySubjectsByBook.filter(
      (item) => item.id !== targetId
    );
    setMySubjectsByBook(newSubjectArr);
  };

  const onReviewRemove = (targetId: string) => {
    const newSubjectArr = myReviewsByBook.filter(
      (item) => item.id !== targetId
    );
    setMyReviewsByBook(newSubjectArr);
  };

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
                <button onClick={() => onSubjectClick(item.book.title)}>
                  발제문 보기
                </button>
              </div>
              <div>
                <Notes />
                <button onClick={() => onReviewClick(item.book.title)}>
                  모임후기 보기
                </button>
              </div>
            </Category>
          </Record>
          {openModal ? (
            <>
              <Overlay onClick={onCloseClick} />
              <SubjectBox>
                {mySubjectsByBook.length !== 0
                  ? mySubjectsByBook?.map((item) => (
                      <Subjects
                        key={item.id}
                        item={item}
                        docMonth={docMonth}
                        onSubjectRemove={onSubjectRemove}
                      />
                    ))
                  : "작성한 발제문이 없습니다."}
                {myReviewsByBook.length !== 0
                  ? myReviewsByBook.map((item) => (
                      <Reviews
                        key={item.id}
                        item={item}
                        onReviewRemove={onReviewRemove}
                      />
                    ))
                  : "작성한 모임후기가 없습니다."}
              </SubjectBox>
            </>
          ) : (
            <></>
          )}
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

const Container = styled.section``;

const Record = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 3px 10px 3px 0;
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

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
`;

const SubjectBox = styled.article`
  position: fixed;
  top: 50px;
  right: 0;
  left: 0;
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  > div {
    background-color: ${(props) => props.theme.container.lightBlue};
    width: 100%;
    border-radius: 5px;
    padding: 10px 15px;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  }
`;

export default MyRecord;
