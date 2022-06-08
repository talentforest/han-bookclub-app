import React, { useEffect, useState } from "react";
import { Container, Header } from "theme/commonStyle";
import { AccessTime, Book, Place } from "@mui/icons-material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";
import Subtitle from "components/common/Subtitle";
import Title from "components/common/Title";
import styled from "styled-components";
import { DocumentType } from "components/bookmeeting/Subjects";

const ClubBooksHistory = () => {
  const thisYear = `${new Date().getFullYear()}`;
  const [selectedYear, setSelectedYear] = useState(thisYear);
  const [allBookMeeting, setAllBookMeeting] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    getBookMeetingInfoDoc();
    getAllSubjects();
    getAllReviews();
    return () => {
      getBookMeetingInfoDoc();
      getAllSubjects();
      getAllReviews();
    };
  }, []);

  const getAllSubjects = async () => {
    const q = query(
      collection(
        dbService,
        `Book Subjects/${new Date().getFullYear()}년 ${
          new Date().getMonth() + 1
        }월/subjects`
      ),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as DocumentType;
      });
      setAllSubjects(newArray);
    });
  };

  const getAllReviews = async () => {
    const q = query(
      collection(
        dbService,
        `Meeting Review/${new Date().getFullYear()}년 ${
          new Date().getMonth() + 1
        }월/reviews`
      ),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as DocumentType;
      });
      setAllReviews(newArray);
    });
  };

  const getBookMeetingInfoDoc = async () => {
    const q = query(
      collection(dbService, "BookMeeting Info"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as unknown as DocumentType;
      });

      setAllBookMeeting(newArray);
    });
  };

  const yearKey = allBookMeeting?.reduce((acc, current) => {
    acc[current.id.split("-")[0]] = acc[current.id.split("-")[0]] || [];
    acc[current.id.split("-")[0]].push(current);
    return acc;
  }, {});

  const GroupedBySameYear = Object.keys(yearKey).map((key) => {
    return {
      id: key,
      bookMeetingInfo: yearKey[key] || [],
    };
  });

  const onChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedYear(event.currentTarget.value);
  };

  return (
    <>
      <Header>
        <Title title="지난 책모임" />
      </Header>
      <Container>
        <Subtitle title="한페이지 히스토리" />
        <History>
          <YearCategory onChange={onChange} value={selectedYear}>
            {GroupedBySameYear?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id}년의 책
              </option>
            ))}
          </YearCategory>
          {GroupedBySameYear?.map((item: any) => (
            <div key={item.id}>
              {item.id === selectedYear
                ? item?.bookMeetingInfo.map((item: any) => (
                    <BookMeetingInfo key={item.id}>
                      <Subtitle
                        title={`${
                          item.id.split("-")[1].split("")[0] === "0"
                            ? item.id.split("-")[1].slice(1, 2)
                            : item.id.split("-")[1]
                        }월의 북클럽 정보`}
                      />
                      <div>
                        {item?.book.thumbnail ? (
                          <BookCover
                            src={item?.book.thumbnail}
                            alt="Book_Image"
                          />
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
                              모임시간 <AccessTime />
                            </span>
                            <span>{item?.meeting.time}</span>
                          </div>
                          <div>
                            <span>
                              모임장소 <Place />
                            </span>
                            <span>{item?.meeting.place}</span>
                          </div>
                        </MeetingInfo>
                      </div>
                      <Subtitle
                        title={`${
                          item.id.split("-")[1].split("")[0] === "0"
                            ? item.id.split("-")[1].slice(1, 2)
                            : item.id.split("-")[1]
                        }월의 기록`}
                      />
                    </BookMeetingInfo>
                  ))
                : null}
            </div>
          ))}
        </History>
      </Container>
    </>
  );
};

const YearCategory = styled.select`
  height: 30px;
  width: 100px;
  border-radius: 5px;
  display: flex;
  margin-left: 15px;
  h3 {
    font-size: 14px;
    font-weight: 700;
  }
  &:focus {
    outline: none;
  }
`;

const BookMeetingInfo = styled.div`
  border-radius: 10px;
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
  > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
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
  margin-right: 10px;
`;

const MeetingInfo = styled.div`
  width: 60%;
  h3 {
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 10px;
  }
  div {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    > span:first-child {
      font-size: 12px;
      display: flex;
      align-items: center;
      border: 1px solid ${(props) => props.theme.container.blue};
      width: fit-content;
      padding: 2px 4px;
      border-radius: 15px;
      background-color: ${(props) => props.theme.container.lightBlue};
      svg {
        width: 15px;
        height: 15px;
      }
    }
    > span:last-child {
      font-size: 14px;
      padding-left: 3px;
      margin-top: 3px;
    }
  }
`;

const History = styled.div`
  //   display: grid;
  //   grid-template-columns: repeat(6, 1fr);
  //   grid-template-rows: repeat(2, 1fr);
  //   gap: 5px;
  //   text-align: center;
  //   border-radius: 10px;
  //   margin-top: 10px;
  //   padding: 10px;
  //   background-color: ${(props) => props.theme.container.lightBlue};
  //   div {
  //   }
  //   button {
  //     cursor: pointer;
  //     border: none;
  //     border-radius: 15px;
  //     font-size: 12px;
  //     font-weight: 700;
  //     padding: 3px 0;
  //     background-color: transparent;
  //     &.isActive {
  //       background-color: ${(props) => props.theme.container.yellow};
  //       color: ${(props) => props.theme.text.lightBlue};
  //     }
  //   }
`;

export default ClubBooksHistory;
