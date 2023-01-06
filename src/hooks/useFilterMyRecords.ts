import { useEffect, useState } from 'react';
import { getFbRoute } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';

const useFilterMyRecords = (id: string, userUid: string) => {
  const [subjects, setSubjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [mySubjectsByBook, setMySubjectsByBook] = useState([]);
  const [myReviewsByBook, setMyReviewsByBook] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [recommendBook, setRecommendBook] = useState([]);
  const [myRecommendByBook, setMyRecommendByBook] = useState([]);
  const [openRecommendModal, setOpenRecommendModal] = useState(false);
  const userData = useRecoilValue(currentUserState);

  useEffect(() => {
    getCollection(getFbRoute(id).SUBJECT, setSubjects);
    getCollection(getFbRoute(id).REVIEW, setReviews);
    getCollection(getFbRoute(id).RECOMMEND, setRecommendBook);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mySubjects = subjects?.filter((item) => item?.creatorId === userUid);
  const myReviews = reviews?.filter((item) => item?.creatorId === userUid);
  const myRecommendBooks = recommendBook?.filter(
    (item) => item?.creatorId === userData.uid
  );

  const onSubjectClick = (booktitle: string) => {
    const filteredArr = mySubjects.filter((item) => item.title === booktitle);
    setOpenModal((prev) => !prev);
    setMyReviewsByBook([]);
    setMySubjectsByBook(filteredArr);
  };

  const onReviewClick = (booktitle: string) => {
    const filteredArr = myReviews.filter((item) => item.title === booktitle);
    setOpenModal((prev) => !prev);
    setMySubjectsByBook([]);
    setMyReviewsByBook(filteredArr);
  };

  const onRecommendBookClick = (booktitle: string) => {
    const filteredArr = myRecommendBooks.filter(
      (item) => item.recommendBookThumbnail === booktitle
    );
    setOpenRecommendModal((prev) => !prev);
    setMyRecommendByBook(filteredArr);
  };

  return {
    mySubjects,
    myReviews,
    mySubjectsByBook,
    myReviewsByBook,
    openModal,
    setOpenModal,
    onSubjectClick,
    onReviewClick,
    myRecommendBooks,
    myRecommendByBook,
    openRecommendModal,
    setOpenRecommendModal,
    onRecommendBookClick,
  };
};

export default useFilterMyRecords;
