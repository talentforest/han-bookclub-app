import { useEffect } from "react";
import { Container } from "theme/commonStyle";
import { useRecoilState } from "recoil";
import { hostReviewState, thisMonthState } from "data/documentsAtom";
import { getCollection, getDocument } from "util/getFirebaseDoc";
import { thisYearMonth } from "util/constants";
import { getMonthNumber } from "util/getMonthNumber";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Loading from "components/common/Loading";
import Subtitle from "components/common/Subtitle";
import { EmptyRecord } from "components/template/RecommendationArea";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import styled from "styled-components";
import device from "theme/mediaQueries";
import Guide from "components/common/Guide";
import HostReviewCreateModal from "components/bookmeeting/HostReviewCreateModal";
import HostReviewBox from "components/common/HostReviewBox";
import SubjectArea from "components/template/SubjectArea";

const BookMeeting = () => {
  const [thisMonthDoc, setThisMonthDoc] = useRecoilState(thisMonthState);
  const [hostReview, setHostReview] = useRecoilState(hostReviewState);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    getDocument("BookMeeting Info", `${thisYearMonth}`, setThisMonthDoc);
    getCollection(
      `BookMeeting Info/${thisYearMonth}/host review`,
      setHostReview
    );
  }, [setThisMonthDoc, setHostReview]);

  const checkThisMonthDoc = Object.keys(thisMonthDoc).length;

  return (
    <>
      {checkThisMonthDoc === 0 ? (
        <Loading />
      ) : (
        <Container>
          <Subtitle title={`${getMonthNumber(thisMonthDoc?.id)}월의 책`} />
          <MeetingBox>
            <BookTitleImgBox
              thumbnail={thisMonthDoc.book.thumbnail}
              title={thisMonthDoc.book.title}
              detailInfo={thisMonthDoc.book}
            />
            {thisMonthDoc.book.url && (
              <a href={thisMonthDoc.book.url} target="_blank" rel="noreferrer">
                Daum책 상세정보 보러가기
              </a>
            )}
            <MeetingInfoBox docData={thisMonthDoc.meeting} />
          </MeetingBox>
          <Guide text="모임이 끝난 후, 이달의 책에 대한 모든 글은 달의 마지막 날까지 작성할 수 있어요. 다음 책이 업데이트 되면, 이전 책에 대한 글은 작성이 불가능한 점 유의해주세요." />
          <AfterMeetingRecord>
            <Subtitle title="발제자의 모임 정리" />
            {hostReview?.length !== 0 ? (
              hostReview?.map((review) => (
                <HostReviewBox
                  key={review.id}
                  review={review}
                  yearMonthId={thisYearMonth}
                />
              ))
            ) : (
              <>
                <HostReviewCreateModal
                  bookInfo={thisMonthDoc?.book}
                  docMonth={thisMonthDoc.id}
                />
                <EmptyRecord>아직 모임 후 정리된 기록이 없습니다.</EmptyRecord>
              </>
            )}
          </AfterMeetingRecord>
          <Categories>
            <Category
              $isActive={pathname === "/bookmeeting/recommends"}
              onClick={() => {
                navigate("/bookmeeting/recommends");
              }}
            >
              추천책 작성
            </Category>
            <Category
              $isActive={
                pathname === "/bookmeeting" ||
                pathname === "/bookmeeting/subjects"
              }
              onClick={() => {
                navigate("/bookmeeting/subjects");
              }}
            >
              발제문 작성
            </Category>
            <Category
              $isActive={pathname === "/bookmeeting/reviews"}
              onClick={() => {
                navigate("/bookmeeting/reviews");
              }}
            >
              모임후기 작성
            </Category>
          </Categories>
          {pathname === "/bookmeeting/subjects" ? <SubjectArea /> : <Outlet />}
        </Container>
      )}
    </>
  );
};

const AfterMeetingRecord = styled.section`
  margin: 20px 0;
`;

const MeetingBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto 15px;
  > div:first-child {
    margin-bottom: 50px;
  }
  > p {
    font-size: 13px;
    color: ${(props) => props.theme.text.gray};
  }
  a {
    border: 1px solid ${(props) => props.theme.text.lightGray};
    position: absolute;
    bottom: 115px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 12px;
    color: ${(props) => props.theme.text.accent};
    background-color: ${(props) => props.theme.container.default};
  }
`;

const Categories = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 5px;
  margin: 20px 0 10px;
  border-radius: 60px;
  background-color: ${(props) => props.theme.container.lightBlue};
  @media ${device.tablet} {
    border-radius: 30px;
    padding: 8px 10px;
  }
`;

const Category = styled.button<{ $isActive: boolean }>`
  cursor: pointer;
  width: 100%;
  padding: 8px;
  font-size: 13px;
  font-weight: 700;
  border: none;
  border-radius: 30px;
  background-color: ${(props) =>
    props.$isActive ? props.theme.container.blue : "#eaeaea"};
  color: ${(props) => (props.$isActive ? props.theme.text.white : "#aaa")};
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${device.tablet} {
    padding: 12px 8px;
    height: 100%;
    font-size: 16px;
  }
`;

export default BookMeeting;
