import { useState } from "react";
import { Container, Header } from "theme/commonStyle";
import { months } from "util/constants";
import Subtitle from "components/common/Subtitle";
import Title from "components/common/Title";
import styled from "styled-components";
import BookTitleImage from "components/bookmeeting/BookTitleImage";
import { AccessTime, Place } from "@mui/icons-material";

const ClubBooksHistory = () => {
  const thisMonth = new Date().getMonth() + 1;
  const thisYear = new Date().getFullYear();
  const [selectMonth, setSelectMonth] = useState(`${thisMonth}월`);

  const onClick = (month: string) => {
    setSelectMonth(month);
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
          <h1>{selectMonth}의 책모임</h1>
          <div>
            <MeetingInfo>
              <div>
                <span>
                  모임시간 <AccessTime />
                </span>
                <span>2022년 6월 19일 오후 12:00</span>
              </div>
              <div>
                <span>
                  모임장소 <Place />
                </span>
                <span>카페꼼마 삼일빌딩점</span>
              </div>
            </MeetingInfo>
            <BookTitleImage />
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
  padding: 10px;
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
    align-items: flex-end;
  }
`;

const MeetingInfo = styled.div`
  div {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    > span:first-child {
      font-size: 13px;
      margin-bottom: 3px;
      display: flex;
      align-items: center;
      svg {
        width: 15px;
        height: 15px;
      }
    }
    > span:last-child {
      border-bottom: 1px solid ${(props) => props.theme.text.gray};
      margin-bottom: 4px;
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
