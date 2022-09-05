import { currentUserState } from "data/userAtom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { getCollection, IBookMeeting } from "util/getFirebaseDoc";
import { Modal } from "./MyRecord";
import device from "theme/mediaQueries";
import RecommandBox from "components/common/RecommandBox";
import styled from "styled-components";
import Overlay from "components/common/Overlay";

interface PropsType {
  item: IBookMeeting;
}

const MyRecommendBook = ({ item }: PropsType) => {
  const [recommendBook, setRecommendBook] = useState([]);
  const [showDetail, setShowDetail] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const userData = useRecoilValue(currentUserState);
  const docMonth = item.id;

  useEffect(() => {
    getCollection(
      `BookMeeting Info/${item.id}/recommended book`,
      setRecommendBook
    );
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

  return (
    <>
      {myRecommendBooks.length !== 0 && (
        <>
          {myRecommendBooks.map((item) => (
            <Record
              key={item.id}
              onClick={() => onRecommendBookClick(item.recommendBookThumbnail)}
            >
              <Book>
                {item.recommendBookThumbnail ? (
                  <img src={item.recommendBookThumbnail} alt="thumbnail" />
                ) : (
                  <img src={item.thumbnail} alt="thumbnail" />
                )}
                {item.recommendBookTitle ? (
                  <h3>{item.recommendBookTitle}</h3>
                ) : (
                  <h3>{item.title}</h3>
                )}
              </Book>
              <span>보기</span>
            </Record>
          ))}
          {openModal && (
            <>
              <Overlay
                onModalClick={() => {
                  setOpenModal((prev) => !prev);
                }}
              />
              <Modal>
                {showDetail.map((recommend) => (
                  <div key={item.id}>
                    <RecommandBox
                      key={item.id}
                      recommend={recommend}
                      docMonth={docMonth}
                      setShowDetail={setShowDetail}
                    />
                  </div>
                ))}
              </Modal>
            </>
          )}
        </>
      )}
    </>
  );
};

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
    padding: 15px;
    span {
      font-size: 16px;
    }
  }
`;

const Book = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  img {
    height: 50px;
    width: auto;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
    margin-right: 10px;
  }
  h3 {
    width: 100%;
    display: block;
    font-size: 13px;
    font-weight: 700;
  }
  @media ${device.tablet} {
    img {
      height: 60px;
      margin-right: 20px;
    }
    h3 {
      font-size: 16px;
    }
  }
`;

export default MyRecommendBook;
