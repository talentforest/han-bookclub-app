import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getFbRoute } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import {
  hostReviewState,
  IBookClubMonthInfo,
  recommendsState,
  reviewsState,
  subjectsState,
} from 'data/documentsAtom';
import { useSetRecoilState } from 'recoil';
import BookImgTitle from 'components/atoms/BookImgTitle';
import Subtitle from 'components/atoms/Subtitle';
import styled from 'styled-components';
import ScheduleBox from 'components/organisms/ScheduleBox';
import CategorySection from 'components/template/CategorySection';
import HostReviewArea from 'components/template/HostReviewArea';

type LocationState = { state: { document: IBookClubMonthInfo } };

const BookClubHistoryDetail = () => {
  const setSubjects = useSetRecoilState(subjectsState);
  const setReviews = useSetRecoilState(reviewsState);
  const setRecommends = useSetRecoilState(recommendsState);
  const setHostReview = useSetRecoilState(hostReviewState);

  const {
    state: { document },
  } = useLocation() as LocationState;
  const { id, book, meeting } = document;

  useEffect(() => {
    getCollection(getFbRoute(id).SUBJECTS, setSubjects);
    getCollection(getFbRoute(id).REVIEWS, setReviews);
    getCollection(getFbRoute(id).RECOMMENDED_BOOKS, setRecommends);
    getCollection(getFbRoute(id).HOST_REVIEW, setHostReview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <main>
      <Infos>
        <BookImgTitle thumbnail={book.thumbnail} title={book.title} />
        <ScheduleBox schedule={meeting} />
      </Infos>
      <Subtitle title='발제자 모임 정리 기록' />
      <HostReviewArea />
      <Subtitle title='독서모임 기록' />
      <CategorySection />
    </main>
  );
};

const Infos = styled.div`
  margin: 20px 0 40px;
`;

export default BookClubHistoryDetail;
