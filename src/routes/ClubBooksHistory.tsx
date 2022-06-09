import React, { useEffect, useState } from "react";
import { Container, Header } from "theme/commonStyle";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";
import Subtitle from "components/common/Subtitle";
import Title from "components/common/Title";
import styled from "styled-components";
import { DocumentType } from "components/bookmeeting/Subjects";
import HistoryBox from "components/clubbookhistory/HistoryBox";

const ClubBooksHistory = () => {
  const thisYear = `${new Date().getFullYear()}`;
  const [selectedYear, setSelectedYear] = useState(thisYear);
  const [allBookMeeting, setAllBookMeeting] = useState([]);

  useEffect(() => {
    getBookMeetingInfoDoc();

    return () => {
      getBookMeetingInfoDoc();
    };
  }, []);

  const getBookMeetingInfoDoc = async () => {
    const q = query(
      collection(dbService, "BookMeeting Info"),
      orderBy("createdAt", "asc")
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
        <YearCategory onChange={onChange} value={selectedYear}>
          {GroupedBySameYear.length !== 0 ? (
            GroupedBySameYear?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id}년의 책
              </option>
            ))
          ) : (
            <option>{`${selectedYear}년의 책`}</option>
          )}
        </YearCategory>
        {GroupedBySameYear.length !== 0 ? (
          GroupedBySameYear?.map((item: any) => (
            <div key={item.id}>
              {item.id === selectedYear
                ? item?.bookMeetingInfo.map((item: any) => (
                    <HistoryBox item={item} key={item.id} />
                  ))
                : null}
            </div>
          ))
        ) : (
          <EmptyBox>북클럽에 아직 등록된 책이 없습니다.</EmptyBox>
        )}
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

const EmptyBox = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;
  padding: 30px 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
`;

export default ClubBooksHistory;
