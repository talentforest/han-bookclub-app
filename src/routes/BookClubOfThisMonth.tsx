import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { hostReviewState, clubInfoByMonthState } from 'data/documentsAtom';
import {
  getFbRoute,
  getMonthNm,
  thisYearMonthIso,
  thisYear,
  BOOK_FIELD_HOST,
  thisMonth,
} from 'util/index';
import { getCollection, getDocument } from 'api/getFbDoc';
import Loading from 'components/atoms/Loading';
import Subtitle from 'components/atoms/Subtitle';
import BookImgTitle from 'components/atoms/BookImgTitle';
import styled from 'styled-components';
import Guide from 'components/atoms/Guide';
import CategorySection from 'components/template/CategorySection';
import HostReviewArea from 'components/template/HostReviewArea';
import UsernameBox from 'components/organisms/UsernameBox';
import { fieldHostDocState } from 'data/bookFieldHostAtom';

const BookClubOfThisMonth = () => {
  const [thisMonthClub, setThisMonthClub] =
    useRecoilState(clubInfoByMonthState);
  const { id, book } = thisMonthClub;
  const [bookFields, setBookFields] = useRecoilState(fieldHostDocState);
  const setHostReview = useSetRecoilState(hostReviewState);
  const checkThisMonthDoc = Object.keys(thisMonthClub).length;

  useEffect(() => {
    getDocument(BOOK_FIELD_HOST, `${thisYear}`, setBookFields);
    getDocument(
      `BookClub-${thisYear}`,
      `${thisYearMonthIso}`,
      setThisMonthClub
    );
    getCollection(getFbRoute(thisYearMonthIso).HOST_REVIEW, setHostReview);
  }, [setThisMonthClub, setHostReview, setBookFields]);

  return checkThisMonthDoc === 0 ? (
    <Loading />
  ) : (
    thisMonthClub && (
      <main>
        <Subtitle title={`${getMonthNm(id)}월의 책`} />
        <MonthInfo>
          <BookImgTitle thumbnail={book?.thumbnail} title={book?.title} />
          {book?.url && (
            <a href={book?.url} target='_blank' rel='noreferrer'>
              Daum책 상세정보 보러가기
            </a>
          )}
        </MonthInfo>
        <Guide text='모임이 끝난 후, 이달의 책에 대한 모든 글은 달의 마지막 날까지 작성할 수 있어요. 다음 책이 업데이트 되면, 이전 책에 대한 글은 수정만 가능할 뿐 새로 작성이 불가능한 점 유의해주세요.' />
        <Subtitle title='발제자 모임 정리 기록' />
        {bookFields.info &&
          bookFields?.info[thisMonth - 1].host !== 'no_host' && (
            <HostInfo>
              <span>이달의 발제자: </span>
              <UsernameBox creatorId={bookFields?.info[thisMonth - 1].host} />
            </HostInfo>
          )}
        <HostReviewArea />
        <Subtitle title='독서모임 기록' />
        <CategorySection />
      </main>
    )
  );
};

const HostInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  span {
    font-size: 14px;
  }
`;
const MonthInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 40px;
  > a {
    border: 1px solid ${(props) => props.theme.text.lightGray};
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 12px;
    color: ${(props) => props.theme.text.accent};
    background-color: ${(props) => props.theme.container.default};
  }
`;

export default BookClubOfThisMonth;
