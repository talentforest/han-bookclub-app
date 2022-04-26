import { useState, useEffect } from "react";
import { authService, dbService } from "fbase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import SubjectCreateBox from "./SubjectCreateBox";
import styled from "styled-components";

export interface SubjectData {
  text: string;
  createdAt: number;
  creatorId: string;
  id: string;
}
export interface UserData {
  uid: string;
}

const SubjectBox = () => {
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
  }, [subjects]);

  return (
    <div>
      <SubjectCreateBox uid={userData.uid} />
      <Subject>
        {subjects.map(({ text, createdAt, creatorId, id }) => (
          <Text key={id}>
            <div>
              <span>발제자 </span>
              <span>전예림</span>
            </div>
            <pre>{text}</pre>
            <div>
              <span>등록일자: </span>
              <span>{createdAt}</span>
            </div>
          </Text>
        ))}
      </Subject>
    </div>
  );
};

const Subject = styled.div`
  border-radius: 5px;
  margin: 10px 0;
  padding: 10px 15px;
  font-size: 13px;
  background-color: ${(props) => props.theme.container.lightBlue};
`;

const Text = styled.div`
  margin: 10px 0;
  padding: 10px;
  background-color: ${(props) => props.theme.container.default};
  border-radius: 5px;
  > div:first-child {
    color: ${(props) => props.theme.text.accent};
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
    span:last-child {
      background-color: ${(props) => props.theme.container.yellow};
      color: ${(props) => props.theme.text.accent};
      padding: 2px 8px;
      border-radius: 20px;
    }
  }
  pre {
    white-space: pre-wrap;
  }
  > div:last-child {
    font-size: 12px;
    text-align: end;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid ${(props) => props.theme.text.lightGray};
  }
`;

export default SubjectBox;
