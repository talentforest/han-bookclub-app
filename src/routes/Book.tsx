import { Container, Header } from "theme/globalStyle";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authService, dbService } from "fbase";
import Title from "components/common/Title";
import BookDescBox from "components/book/BookDescBox";
import SubjectBox from "components/book/SubjectBox";
import Subtitle from "components/common/Subtitle";
import styled from "styled-components";
import SubjectCreateBox from "components/book/SubjectCreateBox";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export interface SubjectData {
  text: string;
  createdAt: number;
  creatorId: string;
  id: string;
}

export interface UserData {
  uid: string;
}

const Book = () => {
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [userData, setUserData] = useState<UserData>({
    uid: "",
  });

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserData(user);
      }
    });
    const q = query(
      collection(dbService, "bookSubjects"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setSubjects(newArray as any);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Header>
        <Title title="의 책" />
      </Header>
      <Container>
        <BookInfo>
          <img src={require("assets/떨림과_울림.jpeg")} alt="Book" />
          <h3>떨림과 울림</h3>
        </BookInfo>
        <BookDescBox />
        <Subtitle title="발제문 작성하기" />
        <div>
          <SubjectCreateBox uid={userData.uid} />
          <Subject>
            {subjects.map(({ text, createdAt, creatorId, id }) => (
              <SubjectBox
                key={id}
                id={id}
                uid={userData.uid}
                creatorId={creatorId}
                text={text}
                createdAt={createdAt}
              />
            ))}
          </Subject>
        </div>
      </Container>
    </>
  );
};

const Subject = styled.div`
  border-radius: 5px;
  margin: 10px 0;
  font-size: 13px;
`;

const BookInfo = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    height: 135px;
    width: auto;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
    margin-bottom: 10px;
  }
  h3 {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

export default Book;
