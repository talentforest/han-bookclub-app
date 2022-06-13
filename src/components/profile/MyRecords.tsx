import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";
import { DocumentType } from "components/bookmeeting/Subjects";
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
    getAllSubjects();

    return () => {
      getAllSubjects();
    };
  }, []);

  const getAllSubjects = async () => {
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
      setDocData(newArray);
    });
  };

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
  overflow: scroll;
  min-height: 150px;
  position: relative;
  > div {
    overflow: hidden;
    display: flex;
    width: fit-content;
  }
`;

export default MyRecords;
