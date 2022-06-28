import { useEffect, useState } from "react";
import { IBookMeetingInfo } from "components/clubbookhistory/HistoryBox";
import { getReviews, getSubjects } from "util/getFirebaseDoc";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import Subjects from "components/bookmeeting/Subjects";
import styled from "styled-components";
import Reviews from "components/bookmeeting/Reviews";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import device from "theme/mediaQueries";

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
  const [guide, setGuide] = useState("");
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
    setGuide("");
    if (filteredArr.length === 0) {
      setGuide("아직 작성한 발제문이 없어요.");
      return;
    }
    setOpenModal((prev) => !prev);
    setMyReviewsByBook([]);
    setMySubjectsByBook(filteredArr);
  };

  const onReviewClick = (booktitle: string) => {
    const filteredArr = myReviews.filter((item) => item.title === booktitle);
    setGuide("");
    if (filteredArr.length === 0) {
      setGuide("아직 작성한 모임후기가 없어요.");
      return;
    }
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
            <span>{guide}</span>
          </Record>
          {openModal ? (
            <>
              <Overlay
                onClick={() => {
                  setOpenModal((prev) => !prev);
                }}
              />
              <SubjectBox>
                {mySubjectsByBook.length &&
                  mySubjectsByBook?.map((item) => (
                    <Subjects
                      key={item.id}
                      item={item}
                      docMonth={docMonth}
                      onSubjectRemove={onSubjectRemove}
                    />
                  ))}
                {myReviewsByBook.length &&
                  myReviewsByBook.map((item) => (
                    <Reviews
                      key={item.id}
                      item={item}
                      docMonth={docMonth}
                      onReviewRemove={onReviewRemove}
                    />
                  ))}
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
    height: 95px;
    img {
      height: 70px;
    }
    h3 {
      font-size: 10px;
    }
  }
  @media ${device.tablet} {
    width: 260px;
    height: 220px;
    > div:first-child {
      height: 120px;
      img {
        height: 80px;
      }
      h3 {
        font-size: 15px;
      }
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
    font-size: 11px;
    border-radius: 15px;
    border: none;
    background-color: ${(props) => props.theme.container.lightBlue};
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.text.accent};
    }
  }
  @media ${device.tablet} {
    > button {
      margin: 5px;
      padding: 5px 8px;
      font-size: 15px;
    }
  }
`;

const Overlay = styled.div`
  cursor: pointer;
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
  right: 0;
  left: 0;
  width: 80vw;
  max-height: 82vh;
  margin: 0 auto;
  border-radius: 5px;
  > div {
    border-radius: 5px;
    padding: 10px 15px;
    margin: 0 0 10px;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
    background-color: ${(props) => props.theme.container.default};
  }
  > div:last-child {
    margin: 0;
  }
  @media ${device.tablet} {
    width: 60vw;
    top: 100px;
    border-radius: 10px;
    > div {
      padding: 20px;
    }
  }
`;

export default MyRecord;
