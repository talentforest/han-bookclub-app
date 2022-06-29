import { currentUserState } from "data/userAtom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { getAllRecommends } from "util/getFirebaseDoc";
import { BookMeetingInfo } from "routes/BookMeeting";
import { SubjectBox } from "./MyRecord";
import device from "theme/mediaQueries";
import BookRecomBox from "components/bookmeeting/BookRecomBox";
import styled from "styled-components";

interface PropsType {
  item: BookMeetingInfo;
}

const MyRecommendBook = ({ item }: PropsType) => {
  const [recommendBook, setRecommendBook] = useState([]);
  const [showDetail, setShowDetail] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const userData = useRecoilValue(currentUserState);
  const docMonth = item.id;

  useEffect(() => {
    getAllRecommends(item.id, setRecommendBook);
    return () => {
      getAllRecommends(item.id, setRecommendBook);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const myRecommendBooks = recommendBook?.filter(
    (item) => item?.creatorId === userData.uid
  );

  const onRecommendBookClick = (booktitle: string) => {
    const filteredArr = myRecommendBooks.filter(
      (item) => item.recommendBookThumbnail === booktitle
    );
    setOpenModal((prev) => !prev);
    setShowDetail(filteredArr);
  };

  const onRecommendRemove = (targetId: string) => {
    const newSubjectArr = showDetail.filter((item) => item.id !== targetId);
    setRecommendBook(newSubjectArr);
  };

  return (
    <>
      {myRecommendBooks.length !== 0 ? (
        <>
          {myRecommendBooks.map((item) => (
            <Record
              key={item.id}
              onClick={() => onRecommendBookClick(item.recommendBookThumbnail)}
            >
              <Book>
                <img src={item.recommendBookThumbnail} alt="thumbnail" />
                <h3>{item.recommendBookTitle}</h3>
              </Book>
              <span>보기</span>
            </Record>
          ))}
          {openModal &&
            showDetail.map((item) => (
              <div key={item.id}>
                <Overlay
                  onClick={() => {
                    setOpenModal((prev) => !prev);
                  }}
                />
                <SubjectBox>
                  <BookRecomBox
                    key={item.id}
                    item={item}
                    docMonth={docMonth}
                    setShowDetail={setShowDetail}
                  />
                  {item.id}
                </SubjectBox>
              </div>
            ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

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

const Record = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  span {
    font-size: 12px;
    width: 10%;
    text-align: end;
    color: ${(props) => props.theme.text.accent};
  }
  @media ${device.tablet} {
  }
`;

const Book = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 50px;
    width: auto;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
    margin-right: 10px;
  }
  h3 {
    font-size: 13px;
    font-weight: 700;
  }
`;

export default MyRecommendBook;
