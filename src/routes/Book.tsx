import { Container, Header, TopButton } from "theme/commonStyle";
import { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { LogInUserInfo } from "components/App";
import { Link } from "react-router-dom";
import { DocumentType } from "components/book/SubjectBox";
import Title from "components/common/Title";
import BookDescription from "components/book/BookDescription";
import SubjectCreateBox from "components/book/SubjectCreateBox";
import BookImage from "components/book/BookImage";
import SubjectBoxes from "components/book/SubjectBoxes";
import styled from "styled-components";

interface PropsType {
  userObj: LogInUserInfo;
}

const Book = ({ userObj }: PropsType) => {
  const [category, setCategory] = useState("book");
  const [subjects, setSubjects] = useState<DocumentType[]>([]);
  const userData = useRecoilValue(currentUserState);

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

  const onCategoryClick = (name: string) => {
    setCategory(name);
  };

  return (
    <>
      <NewHeader>
        <Title title="의 책" />
        <Link to="/book/find">
          <TopButton>책 등록하기</TopButton>
        </Link>
      </NewHeader>
      <Container>
        <BookImage />
        <BookSection>
          <button
            onClick={() => onCategoryClick("book")}
            className={category === "book" ? "isActive" : null}
          >
            도서 정보
          </button>
          <button
            onClick={() => onCategoryClick("show")}
            className={category === "show" ? "isActive" : null}
          >
            발제문 보기
          </button>
          <button
            onClick={() => onCategoryClick("join")}
            className={category === "join" ? "isActive" : null}
          >
            발제문 참여
          </button>
        </BookSection>
        {category === "book" ? <BookDescription /> : null}
        {category === "show" ? (
          <SubjectBoxes subjects={subjects} userObj={userObj} />
        ) : null}
        {category === "join" ? <SubjectCreateBox uid={userData?.uid} /> : null}
      </Container>
    </>
  );
};

const BookSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 8px;
  margin-top: 25px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.container.lightBlue};
  button {
    font-size: 11px;
    width: 32%;
    border: none;
    border-radius: 30px;
    height: 30px;
    font-weight: 700;
    color: #aaa;
    background-color: ${(props) => props.theme.text.lightGray};
    cursor: pointer;
    &.isActive {
      background-color: #5f9fff;
      color: #fff;
    }
  }
`;
const NewHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Book;
