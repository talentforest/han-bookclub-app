import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  bookFieldsState,
  hostReviewState,
  thisMonthState,
} from 'data/documentsAtom';
import {
  getFbRoute,
  CLUB_INFO,
  getMonthNm,
  thisYearMonthIso,
  thisYear,
  BOOK_FIELD,
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

const BookClubOfThisMonth = () => {
  const [thisMonthDoc, setThisMonthDoc] = useRecoilState(thisMonthState);
  const { id, book } = thisMonthDoc;
  const [bookFields, setBookFields] = useRecoilState(bookFieldsState);
  const setHostReview = useSetRecoilState(hostReviewState);
  const checkThisMonthDoc = Object.keys(thisMonthDoc).length;

  useEffect(() => {
    getDocument(BOOK_FIELD, `${thisYear}`, setBookFields);
    getDocument(CLUB_INFO, `${thisYearMonthIso}`, setThisMonthDoc);
    getCollection(getFbRoute(thisYearMonthIso).HOST_REVIEW, setHostReview);
  }, [setThisMonthDoc, setHostReview, setBookFields]);

  return checkThisMonthDoc === 0 ? (
    <Loading full />
  ) : (
    thisMonthDoc && (
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
        <Guide text='모임이 끝난 후, 이달의 책에 대한 모든 글은 달의 마지막 날까지 작성할 수 있어요. 다음 책이 업데이트 되면, 이전 책에 대한 글은 작성이 불가능한 점 유의해주세요.' />
        <Subtitle title='발제자의 기록' />
        {bookFields.bookField &&
          bookFields?.bookField[thisMonth - 1].host !== 'no_host' && (
            <HostInfo>
              <span>이달의 발제자: </span>
              <UsernameBox
                creatorId={bookFields?.bookField[thisMonth - 1].host}
              />
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
