import { Container, Header } from "theme/globalStyle";
import { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { ReactComponent as Plus } from "assets/plus.svg";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/atom";
import Title from "components/common/Title";
import BookDescBox from "components/book/BookDescBox";
import SubjectBox from "components/book/SubjectBox";
import Subtitle from "components/common/Subtitle";
import styled from "styled-components";
import SubjectCreateBox from "components/book/SubjectCreateBox";

export interface SubjectData {
  text: string;
  createdAt: number;
  creatorId: string;
  id: string;
}

export interface AuthUser {
  email?: string;
  displayName?: string;
  uid: string | undefined;
}

const Book = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const userData = useRecoilValue<AuthUser | null>(currentUserState);

  const openModalClick = () => {
    setModalOpen((prev) => !prev);
  };

  useEffect(() => {
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
      <NewContainer>
        <BookInfo>
          <img src={require("assets/떨림과_울림.jpeg")} alt="Book" />
          <h3>떨림과 울림</h3>
        </BookInfo>
        <BookDescBox />
        <Subtitle title="이달의 발제문 작성하기" />
        <>
          {subjects.length !== 0 ? (
            <></>
          ) : (
            <>
              <Guide>
                <div>발제문</div>
                <span>아직 발제문이 작성되지 않았어요.</span>
                <PlusSubject onClick={openModalClick}>
                  <Plus width="12" height="12" />
                  <span>발제문 추가하기</span>
                </PlusSubject>
              </Guide>
            </>
          )}
          {modalOpen ? (
            <SubjectCreateBox uid={userData?.uid} setModalOpen={setModalOpen} />
          ) : (
            <></>
          )}
          <Subject>
            {subjects.map(({ text, createdAt, creatorId, id }) => (
              <SubjectBox
                key={id}
                id={id}
                uid={userData?.uid}
                creatorId={creatorId}
                text={text}
                createdAt={createdAt}
              />
            ))}
          </Subject>
        </>
        {subjects.length !== 0 ? (
          <PlusSubject onClick={openModalClick}>
            <Plus width="12" height="12" />
            <span>발제문 추가하기</span>
          </PlusSubject>
        ) : (
          <></>
        )}
      </NewContainer>
    </>
  );
};

const NewContainer = styled(Container)`
  position: relative;
`;

const Subject = styled.div`
  border-radius: 5px;
  margin: 10px 0;
  font-size: 13px;
`;

const Guide = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.container.lightBlue};
  border-radius: 5px;
  padding: 10px 15px 20px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > div:first-child {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 20px;
    width: 100%;
  }
  > span {
    width: 100%;
    font-size: 13px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 15px;
  }
`;

const PlusSubject = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 3px;
  margin-top: 10px;
  cursor: pointer;
  span {
    font-size: 13px;
    font-weight: 700;
    margin-left: 5px;
  }
`;

export const BookInfo = styled.section`
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
