import { useEffect, useState } from "react";
import { DocumentType } from "components/bookmeeting/Subjects";
import { getBookMeetingInfoData } from "util/getFirebaseDoc";
import MyRecord from "./MyRecord";
import styled from "styled-components";

export interface IRecord {
  title: string;
  subjects: DocumentType[];
  reviews: DocumentType[];
}

const MyRecords = () => {
  const [docData, setDocData] = useState([]);

  useEffect(() => {
    getBookMeetingInfoData(setDocData);

    return () => {
      getBookMeetingInfoData(setDocData);
    };
  }, []);

  return (
    <Container>
      <div>
        {docData.map((item) => (
          <MyRecord key={item.id} item={item} />
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  overflow-x: scroll;
  min-height: 150px;
  height: 200px;
  > div {
    overflow: hidden;
    display: flex;
    width: fit-content;
  }
`;

export default MyRecords;
