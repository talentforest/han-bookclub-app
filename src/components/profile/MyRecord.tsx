import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { Overlay } from "components/bookmeeting/SubjectCreateModal";
import { IBookMeeting } from "util/getFirebaseDoc";
import Subjects from "components/bookmeeting/Subjects";
import styled from "styled-components";
import Reviews from "components/bookmeeting/Reviews";
import device from "theme/mediaQueries";
import useFilterMyRecords from "hooks/useFilterMyRecords";

interface PropsType {
  bookMeeting: IBookMeeting;
}

const MyRecord = ({ bookMeeting }: PropsType) => {
  const userData = useRecoilValue(currentUserState);

  const { id, book } = bookMeeting;

  const {
    mySubjects,
    myReviews,
    mySubjectsByBook,
    myReviewsByBook,
    openModal,
    setOpenModal,
    guide,
    onSubjectClick,
    onReviewClick,
    onSubjectRemove,
    onReviewRemove,
  } = useFilterMyRecords(id, userData.uid);

  return (
    <>
      {(mySubjects.length || myReviews.length) !== 0 ? (
        <>
          <Record>
            <img src={book.thumbnail} alt={`${book.title} thumbnail`} />
            <div>
              <h1>{book.title}</h1>
              <Category>
                {mySubjects.length !== 0 && (
                  <button onClick={() => onSubjectClick(book.title)}>
                    나의 발제문
                  </button>
                )}
                {myReviews.length !== 0 && (
                  <button onClick={() => onReviewClick(book.title)}>
                    나의 모임후기
                  </button>
                )}
              </Category>
              {guide && <Guide>{guide}</Guide>}
            </div>
          </Record>
          {openModal && (
            <>
              <Overlay
                onClick={() => {
                  setOpenModal((prev) => !prev);
                }}
              />
              <SubjectBox>
                {mySubjectsByBook?.map((subject) => (
                  <Subjects
                    key={id}
                    subject={subject}
                    docMonth={id}
                    onSubjectRemove={onSubjectRemove}
                  />
                ))}
                {myReviewsByBook?.map((review) => (
                  <Reviews
                    key={id}
                    review={review}
                    docMonth={id}
                    onReviewRemove={onReviewRemove}
                  />
                ))}
              </SubjectBox>
            </>
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
    > h1 {
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
      > h1 {
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
