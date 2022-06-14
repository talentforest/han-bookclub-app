import { useEffect, useState } from "react";
import { IBookMeetingInfo } from "components/clubbookhistory/HistoryBox";
import { getReviews, getSubjects } from "util/getFirebaseDoc";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import Subjects from "components/bookmeeting/Subjects";
import styled from "styled-components";
import Reviews from "components/bookmeeting/Reviews";
import BookTitleImgBox from "components/common/BookTitleImgBox";

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
        <>
          <Record>
            <BookTitleImgBox docData={item.book} />
            <Category>
              <button onClick={() => onSubjectClick(item.book.title)}>
                나의 발제문
              </button>
              <button onClick={() => onReviewClick(item.book.title)}>
                나의 모임후기
              </button>
            </Category>
          </Record>
          {openModal ? (
            <>
              <Overlay
                onClick={() => {
                  setOpenModal((prev) => !prev);
                }}
              />
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
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const Record = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 3px 10px 3px 0;
  border-radius: 5px;
  width: 200px;
  height: 160px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  > div:first-child {
    img {
      height: 70px;
    }
    h3 {
      font-size: 10px;
      margin-top: 5px;
    }
  }
`;

const Category = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 5px;
  width: 100%;
  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    margin: 0 3px;
    padding: 3px 0;
    font-size: 12px;
    border-radius: 15px;
    border: none;
    background-color: ${(props) => props.theme.container.lightBlue};
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.text.accent};
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
  overflow: scroll;
  position: fixed;
  top: 30px;
  bottom: 60px;
  right: 0;
  left: 0;
  width: 80%;
  margin: 0 auto;
  border-radius: 5px;
  > div {
    width: 100%;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 0 0 20px;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
    background-color: ${(props) => props.theme.container.default};
  }
`;

export default MyRecord;
