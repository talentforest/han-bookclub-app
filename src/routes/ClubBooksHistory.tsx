import { useEffect, useState } from "react";
import { Container, Header } from "theme/commonStyle";
import { months } from "util/constants";
import Subtitle from "components/common/Subtitle";
import Title from "components/common/Title";
import styled from "styled-components";
import { AccessTime, Place } from "@mui/icons-material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";

const ClubBooksHistory = () => {
  const thisMonth = new Date().getMonth() + 1;
  const thisYear = new Date().getFullYear();
  const [thisMonthBookDocData, setThisMonthBookDocData] = useState([]);
  const [selectMonth, setSelectMonth] = useState(`${thisMonth}월`);

  const onClick = (month: string) => {
    setSelectMonth(month);
  };

  useEffect(() => {
    getThisMonthBookMeetingData();
    return () => {
      getThisMonthBookMeetingData();
    };
  }, []);

  const getThisMonthBookMeetingData = async () => {
    const q = query(
      collection(dbService, "Book of the Month"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as unknown as DocumentType;
      });
      setThisMonthBookDocData(newArray);
    });
  };

  return (
    <>
      <Header>
        <Title title="지난 책모임" />
      </Header>
      <Container>
        <Subtitle title={`${thisYear} 히스토리`} />
        <History>
          {months.map((item) => (
            <button
              key={item}
              name={item}
              onClick={() => onClick(item)}
              className={selectMonth === item ? "isActive" : ""}
            >
              {item}
            </button>
          ))}
        </History>
        <BookMeetingInfo>
          <Subtitle title={`${selectMonth}의 책모임`} />
          <div>
            <BookCover
              src={thisMonthBookDocData[0]?.book.thumbnail}
              alt="Book_Image"
            />
            <MeetingInfo>
              <h3>{thisMonthBookDocData[0]?.book.title}</h3>
              <div>
                <span>
                  모임시간 <AccessTime />
                </span>
                <span>{thisMonthBookDocData[0]?.meeting.time}</span>
              </div>
              <div>
                <span>
                  모임장소 <Place />
                </span>
                <span>{thisMonthBookDocData[0]?.meeting.place}</span>
              </div>
            </MeetingInfo>
          </div>
          <Subtitle title={`${selectMonth}의 기록`} />
        </BookMeetingInfo>
      </Container>
    </>
  );
};

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
    display: flex;
    flex-direction: column;
    > span:first-child {
      font-size: 12px;
      margin-bottom: 3px;
      display: flex;
      align-items: center;
      svg {
        width: 15px;
        height: 15px;
      }
    }
    > span:last-child {
      border-bottom: 1px solid #aaa;
      padding-bottom: 2px;
      margin-bottom: 8px;
      font-size: 15px;
    }
  }
`;

const History = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px;
  text-align: center;
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px;
  background-color: ${(props) => props.theme.container.purple};
  div {
  }
  button {
    border: none;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 700;
    padding: 3px 0;
    background-color: transparent;
    &.isActive {
      background-color: ${(props) => props.theme.container.yellow};
      color: ${(props) => props.theme.text.lightBlue};
    }
  }
`;

export default ClubBooksHistory;
