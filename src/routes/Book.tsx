import { Container, Header } from "theme/commonStyle";
import { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { ReactComponent as PlusIcon } from "assets/plus.svg";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import Title from "components/common/Title";
import BookDescription from "components/book/BookDescription";
import SubjectBox, { DocumentType } from "components/book/SubjectBox";
import Subtitle from "components/common/Subtitle";
import styled from "styled-components";
import SubjectCreateBox from "components/book/SubjectCreateBox";
import { LogInUserInfo } from "components/App";

interface PropsType {
  userObj: LogInUserInfo;
}

const Book = ({ userObj }: PropsType) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [subjects, setSubjects] = useState<DocumentType[]>([]);

  const userData = useRecoilValue(currentUserState);

  const openModalClick = () => {
    setModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "Book_Subjects"),
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
        <BookDescription />
        <Subtitle title="이달의 발제문 작성하기" />
        <>
          {subjects.length !== 0 ? (
            <></>
          ) : (
            <SubjectGuide>
              <div>발제문</div>
              <span>아직 발제문이 작성되지 않았어요.</span>
              <AddSubject onClick={openModalClick}>
                <span>
                  <PlusIcon />
                  발제문 추가하기
                </span>
              </AddSubject>
            </SubjectGuide>
          )}
          {modalOpen ? (
            <SubjectCreateBox uid={userData?.uid} setModalOpen={setModalOpen} />
          ) : (
            <></>
          )}
          <SubjectContainer>
            {subjects.map(({ text, createdAt, creatorId, id }) => (
              <SubjectBox
                key={id}
                id={id}
                uid={userData?.uid}
                creatorId={creatorId}
                text={text}
                createdAt={createdAt}
                userObj={userObj}
              />
            ))}
          </SubjectContainer>
        </>
        {subjects.length !== 0 ? (
          <AddSubject onClick={openModalClick}>
            <span>
              <PlusIcon />
              발제문 추가하기
            </span>
          </AddSubject>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

const SubjectContainer = styled.div`
  border-radius: 5px;
  margin: 10px 0;
  font-size: 13px;
`;

const SubjectGuide = styled.div`
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
    font-size: 12px;
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

const AddSubject = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 3px;
  margin-top: 10px;
  span {
    cursor: pointer;
    font-size: 13px;
    font-weight: 700;
    svg {
      width: 12px;
      height: 12px;
      margin-right: 5px;
    }
  }
`;

export default Book;
