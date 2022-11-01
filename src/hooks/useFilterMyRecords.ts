import { useEffect, useState } from "react";
import { clubInfoCollection } from "util/constants";
import { getCollection } from "util/getFirebaseDoc";

const useFilterMyRecords = (itemId: string, userDataUid: string) => {
  const [subjects, setSubjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [mySubjectsByBook, setMySubjectsByBook] = useState([]);
  const [myReviewsByBook, setMyReviewsByBook] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [guide, setGuide] = useState("");

  useEffect(() => {
    getCollection(clubInfoCollection(itemId).SUBJECT, setSubjects);
    getCollection(clubInfoCollection(itemId).REVIEW, setReviews);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mySubjects = subjects?.filter(
    (item) => item?.creatorId === userDataUid
  );

  const myReviews = reviews?.filter((item) => item?.creatorId === userDataUid);

  const onSubjectClick = (booktitle: string) => {
    const filteredArr = mySubjects.filter((item) => item.title === booktitle);
    setGuide("");
    if (filteredArr.length === 0) {
      setGuide("작성한 발제문이 없어요.");
      return;
    }
    setOpenModal((prev) => !prev);
    setMyReviewsByBook([]);
    setMySubjectsByBook(filteredArr);
  };

  const onReviewClick = (booktitle: string) => {
    const filteredArr = myReviews.filter((item) => item.title === booktitle);
    setGuide("");
    if (filteredArr.length === 0) {
      setGuide("작성한 모임후기가 없어요.");
      return;
    }
    setOpenModal((prev) => !prev);
    setMySubjectsByBook([]);
    setMyReviewsByBook(filteredArr);
  };

  const onSubjectRemove = (targetId: string) => {
    const newSubjectArr = mySubjectsByBook.filter(
      (item) => item.id !== targetId
    );
    setMySubjectsByBook(newSubjectArr);
  };

  const onReviewRemove = (targetId: string) => {
    const newSubjectArr = myReviewsByBook.filter(
      (item) => item.id !== targetId
    );
    setMyReviewsByBook(newSubjectArr);
  };

  return {
    mySubjects,
    myReviews,
    mySubjectsByBook,
    myReviewsByBook,
    openModal,
    setOpenModal,
    guide,
    onSubjectClick,
    onReviewClick,
    onSubjectRemove,
    onReviewRemove,
  };
};

export default useFilterMyRecords;
