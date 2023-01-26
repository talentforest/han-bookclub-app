import { useLocation } from 'react-router-dom';
import { IBookClubInfo } from 'data/documentsAtom';
import BookImgTitle from 'components/atoms/BookImgTitle';
import Subtitle from 'components/atoms/Subtitle';
import styled from 'styled-components';
import ScheduleBox from 'components/organisms/ScheduleBox';
import CategorySection from 'components/template/CategorySection';
import HostReviewArea from 'components/template/HostReviewArea';

type LocationState = { state: { document: IBookClubInfo } };

const BookClubHistoryDetail = () => {
  const {
    state: { document },
  } = useLocation() as LocationState;
  const {
    id,
    book: { thumbnail, title },
    meeting,
  } = document;

  return (
    <main>
      <Infos>
        <BookImgTitle thumbnail={thumbnail} title={title} />
        <ScheduleBox schedule={meeting} />
      </Infos>
      <Subtitle title='발제자의 정리 기록' />
      <HostReviewArea id={id} />
      <Subtitle title='독서모임 기록' />
      <CategorySection />
    </main>
  );
};

const Infos = styled.div`
  margin: 20px 0 40px;
`;

export default BookClubHistoryDetail;
