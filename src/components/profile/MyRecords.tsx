import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "fbase";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import styled from "styled-components";
import SubjectBox, { DocumentType } from "components/bookmeeting/Subjects";
import Reviews from "components/bookmeeting/Reviews";
import MyRecord from "./MyRecord";

export interface IRecord {
  bookTitle: string;
  subjects: DocumentType[];
  reviews: DocumentType[];
}

const MyRecords = () => {
  const userData = useRecoilValue(currentUserState);
  const [allSubjects, setAllSubjects] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [filteredSubject, setFilteredSubject] = useState([]);
  const [filteredReview, setFilteredReview] = useState([]);

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

  const mySubjects = allSubjects?.filter(
    (item) => item.creatorId === userData.uid
  );
  const myReviews = allReviews?.filter(
    (item) => item.creatorId === userData.uid
  );

  const GroupedBySameBookSubjects = mySubjects?.reduce((acc, current) => {
    acc[current.bookTitle] = acc[current.bookTitle] || [];
    acc[current.bookTitle].push(current);
    return acc;
  }, {});

  const GroupedBySameBookReviews = myReviews?.reduce((acc, current) => {
    acc[current.bookTitle] = acc[current.bookTitle] || [];
    acc[current.bookTitle].push(current);
    return acc;
  }, {});

  const record = { ...GroupedBySameBookSubjects, ...GroupedBySameBookReviews };

  const GroupedBySameBookRecord: IRecord[] = Object.keys(record).map((key) => {
    return {
      bookTitle: key,
      subjects: GroupedBySameBookSubjects[key] || [],
      reviews: GroupedBySameBookReviews[key] || [],
    };
  });

  const onSubjectClick = (bookTitle: string) => {
    const filteredArr = GroupedBySameBookRecord.filter(
      (item) => item.bookTitle === bookTitle
    );
    const subjects = filteredArr[0]?.subjects;
    setFilteredReview([]);
    setFilteredSubject(subjects);
  };

  const onReviewClick = (bookTitle: string) => {
    const filteredArr = GroupedBySameBookRecord.filter(
      (item) => item.bookTitle === bookTitle
    );
    const reviews = filteredArr[0]?.reviews;
    setFilteredSubject([]);
    setFilteredReview(reviews);
  };

  const onSubjectRemove = (targetId: string) => {
    const newSubjectArr = filteredSubject.filter(
      (item) => item.id !== targetId
    );
    setFilteredSubject(newSubjectArr);
  };

  const onReviewRemove = (targetId: string) => {
    const newSubjectArr = filteredReview.filter((item) => item.id !== targetId);
    setFilteredReview(newSubjectArr);
  };

  return (
    <>
      <Container>
        <div>
          {GroupedBySameBookRecord.length !== 0 ? (
            GroupedBySameBookRecord.map((item, index) => (
              <MyRecord
                item={item}
                index={index}
                onSubjectClick={onSubjectClick}
                onReviewClick={onReviewClick}
              />
            ))
          ) : (
            <EmptySign>아직 등록된 책이 없습니다.</EmptySign>
          )}
        </div>
      </Container>
      {filteredSubject?.map((item) => (
        <SubjectBox
          item={item}
          key={item.id}
          onSubjectRemove={onSubjectRemove}
        />
      ))}
      {filteredReview?.map((item) => (
        <Reviews item={item} key={item.id} onReviewRemove={onReviewRemove} />
      ))}
    </>
  );
};

const EmptySign = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.lightBlue};
  font-size: 14px;
`;

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
