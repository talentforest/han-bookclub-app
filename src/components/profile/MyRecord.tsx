import { useEffect, useState } from "react";
import { getReviews, getSubjects } from "util/getFirebaseDoc";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { IBookMeeting } from "util/getFirebaseDoc";
import Subjects from "components/bookmeeting/Subjects";
import styled from "styled-components";
import Reviews from "components/bookmeeting/Reviews";
import device from "theme/mediaQueries";
import { Overlay } from "components/bookmeeting/SubjectCreateModal";

interface PropsType {
  item: IBookMeeting;
}

const MyRecord = ({ item }: PropsType) => {
  const [subjects, setSubjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [mySubjectsByBook, setMySubjectsByBook] = useState([]);
  const [myReviewsByBook, setMyReviewsByBook] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [guide, setGuide] = useState("");
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
    setGuide("");
    if (filteredArr.length === 0) {
      setGuide("작성한 발제문이 없어요.");
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
      setGuide("작성한 모임후기가 없어요.");
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
            <img src={item.book.thumbnail} alt="thumbnail" />
            <div>
              <h4>{item.book.title}</h4>
              <Category>
                <button onClick={() => onSubjectClick(item.book.title)}>
                  나의 발제문
                </button>
                <button onClick={() => onReviewClick(item.book.title)}>
                  나의 모임후기
                </button>
              </Category>
              {guide ? <Guide>{guide}</Guide> : <></>}
            </div>
          </Record>
          {openModal ? (
            <>
              <Overlay
                onClick={() => {
                  setOpenModal((prev) => !prev);
                }}
              />
              <SubjectBox>
                {mySubjectsByBook &&
                  mySubjectsByBook?.map((item) => (
                    <Subjects
                      key={item.id}
                      item={item}
                      docMonth={docMonth}
                      onSubjectRemove={onSubjectRemove}
                    />
                  ))}
                {myReviewsByBook &&
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
  width: 100%;
  height: 100px;
  padding: 15px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  > img {
    height: 55px;
    margin-right: 15px;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
  }
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    > h4 {
      font-weight: 700;
      font-size: 13px;
      margin-bottom: 10px;
    }
  }
  @media ${device.tablet} {
    width: 49%;
    height: 130px;
    margin-bottom: 0;
    > img {
      height: 70px;
    }
    > div {
      > h4 {
        font-size: 16px;
      }
    }
  }
`;

const Category = styled.div`
  display: flex;
  width: 100%;
  > button {
    width: 84px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 0;
    font-size: 12px;
    font-weight: 700;
    border-radius: 15px;
    border: 1px solid ${(props) => props.theme.container.yellow};
    background-color: ${(props) => props.theme.container.lightBlue};
    color: ${(props) => props.theme.text.accent};
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.theme.container.yellow};
    }
    &:first-child {
      margin-right: 6px;
    }
  }
  @media ${device.tablet} {
    font-size: 16px;
    > button {
      width: 90px;
    }
  }
`;

const Guide = styled.span`
  font-size: 12px;
  margin: 5px 0;
  @media ${device.tablet} {
    font-size: 16px;
  }
`;

export const SubjectBox = styled.article`
  overflow: scroll;
  position: fixed;
  top: 30px;
  right: 0;
  left: 0;
  width: 80vw;
  max-height: 82vh;
  margin: 0 auto;
  border-radius: 5px;
  z-index: 2;
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
