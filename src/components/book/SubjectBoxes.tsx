import { Add } from "@mui/icons-material";
import { currentUserState } from "data/userAtom";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import SubjectBox, { DocumentType } from "./SubjectBox";
import SubjectCreateBox from "./SubjectCreateBox";

const SubjectBoxes = () => {
  const [subjects, setSubjects] = useState<DocumentType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

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

  const onModalClick = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <SubjectContainer>
      <AddSubject onClick={onModalClick}>
        <span>
          <Add /> 발제문 참여하기
        </span>
      </AddSubject>
      {modalOpen ? (
        <SubjectCreateBox
          uid={userData?.uid}
          setModalOpen={setModalOpen}
          bookInfo={undefined}
        />
      ) : (
        <></>
      )}
      {subjects.map((item) => (
        <SubjectBox key={item.id} item={item} />
      ))}
    </SubjectContainer>
  );
};

const SubjectContainer = styled.div`
  border-radius: 5px;
  margin: 10px 5px;
  font-size: 13px;
`;

const AddSubject = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 10px 3px;
  margin-top: 10px;
  span {
    color: ${(props) => props.theme.text.accent};
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    svg {
      fill: ${(props) => props.theme.text.accent};
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
`;

export default SubjectBoxes;
