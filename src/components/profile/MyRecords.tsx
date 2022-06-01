import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { Notes, Star } from "@mui/icons-material";
import styled from "styled-components";
import SubjectBox, { DocumentType } from "components/bookmeeting/Subjects";

const MyRecords = () => {
  const userData = useRecoilValue(currentUserState);
  const [allSubjects, setAllSubjects] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [filteredSub, setFilteredSub] = useState([]);

  useEffect(() => {
    getAllSubjects();
    getAllReviews();

    return () => {
      getAllSubjects();
      getAllReviews();
    };
  }, []);

  const getAllSubjects = async () => {
    const q = query(
      collection(dbService, "Book_Subjects"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as DocumentType;
      });
      setAllSubjects(newArray);
    });
  };

  const getAllReviews = async () => {
    const q = query(
      collection(dbService, "Meeting_Review"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as DocumentType;
      });
      setAllReviews(newArray);
    });
  };

  const mySubjects = allSubjects.filter(
    (item) => item.creatorId === userData.uid
  );
  const myReviews = allReviews.filter(
    (item) => item.creatorId === userData.uid
  );

  const myRecords = [...mySubjects, ...myReviews];

  const GroupedBySameBook = mySubjects.reduce((acc, current) => {
    acc[current.bookTitle] = acc[current.bookTitle] || [];
    acc[current.bookTitle].push(current);
    return acc;
  }, {});

  const GroupedBySameBookRecord = Object.keys(GroupedBySameBook).map((key) => {
    return { bookTitle: key, group: GroupedBySameBook[key] };
  });

  const onClick = (bookTitle: string) => {
    const filteredArr = mySubjects.filter(
      (item) => item.bookTitle === bookTitle
    );
    setFilteredSub(filteredArr);
  };

  const onRemove = (targetId: string) => {
    const newSubjectArr = filteredSub.filter((item) => item.id !== targetId);
    setFilteredSub(newSubjectArr);
  };

  return (
    <>
      <Container>
        <div>
          {GroupedBySameBookRecord.map((item, index) => (
            <Record key={index}>
              <div>
                <img
                  src={
                    item.group.map((item: DocumentType) => item.bookCover)[0]
                  }
                  alt="Book"
                />
                <h3>{item.bookTitle}</h3>
              </div>
              <Rate>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </Rate>
              <div>
                <button onClick={() => onClick(item.bookTitle)}>
                  <Notes />
                  <span>발제문 보기</span>
                </button>
                <button onClick={() => onClick(item.bookTitle)}>
                  <Notes />
                  <span>모임후기 보기</span>
                </button>
              </div>
            </Record>
          ))}
        </div>
      </Container>
      {filteredSub.map((item) => (
        <SubjectBox item={item} key={item.id} onRemove={onRemove} />
      ))}
    </>
  );
};

const Container = styled.div`
  overflow: scroll;
  > div {
    overflow: hidden;
    display: flex;
    width: fit-content;
  }
`;

const Record = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  border-radius: 5px;
  width: 200px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      height: 50px;
      width: auto;
      box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
    }
    h3 {
      font-size: 10px;
      font-weight: 700;
      margin-top: 6px;
      text-align: center;
    }
  }
  > div:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    width: 100%;
    > button {
      cursor: pointer;
      width: 50%;
      padding: 1px 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background-color: transparent;
      border-radius: 15px;
      svg {
        width: 18px;
        height: 18px;
        margin-right: 4px;
      }
      span {
        font-size: 10px;
      }
      &:hover {
        span {
          color: ${(props) => props.theme.text.accent};
        }
        svg {
          fill: ${(props) => props.theme.text.accent};
        }
      }
    }
  }
`;

const Rate = styled.div`
  margin-top: 5px;
  svg {
    fill: gold;
  }
`;

export default MyRecords;
