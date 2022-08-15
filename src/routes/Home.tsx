import { Link } from "react-router-dom";
import { Container } from "theme/commonStyle";
import { useEffect } from "react";
import { today } from "util/constants";
import {
  getBookMeeting,
  getFixedBookFields,
  getVotes,
  IMonthField,
  IVote,
} from "util/getFirebaseDoc";
import { useRecoilState } from "recoil";
import {
  bookFieldDocsState,
  bookMeetingDocsState,
  voteDocsState,
} from "data/documentsAtom";
import { settings } from "util/sliderSetting";
import LinkButton from "components/common/LinkButton";
import Subtitle from "components/common/Subtitle";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import VoteBox from "components/vote/VoteBox";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MobileHeader from "components/header/MobileHeader";
import device from "theme/mediaQueries";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const Home = () => {
  const [bookMeetingDocs, setBookMeetingDocs] =
    useRecoilState(bookMeetingDocsState);
  const [bookFieldDocs, setBookFieldDocs] = useRecoilState(bookFieldDocsState);
  const [voteDocs, setVoteDocs] = useRecoilState(voteDocsState);

  useEffect(() => {
    getBookMeeting(setBookMeetingDocs);
    getFixedBookFields(setBookFieldDocs);
    getVotes(setVoteDocs);

    return () => {
      getBookMeeting(setBookMeetingDocs);
      getFixedBookFields(setBookFieldDocs);
      getVotes(setVoteDocs);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progressVote = voteDocs.filter(
    (item: IVote) => item.deadline >= today()
  );

  const latestDocMonth = bookMeetingDocs[0]?.id.slice(6);

  return (
    <>
      {bookFieldDocs && bookMeetingDocs && (
        <>
          <MobileHeader title="독서모임 한페이지" />
          <NewContainer>
            <section>
              <Subtitle title={`${latestDocMonth}월의 책`} />
              <BookTitleImgBox docData={bookMeetingDocs[0]?.book} />
              <LinkButton link={"/bookmeeting/subject"} title="발제하러 가기" />
            </section>
            <section>
              <Subtitle
                title={bookMeetingDocs[0] && `${latestDocMonth}월의 모임 일정`}
              />
              <MeetingInfo>
                한페이지 멤버는 매월 셋째주 일요일에 만나요.
              </MeetingInfo>
              <MeetingInfoBox docData={bookMeetingDocs[0]?.meeting} />
              <LinkButton
                link={"/bookmeeting/review"}
                title="모임 후기 작성하러 가기"
              />
            </section>
            <VoteSlider>
              <Subtitle title={"한페이지의 투표함"} />
              {progressVote.length ? (
                <Slider {...settings}>
                  {progressVote.map((item, index) => (
                    <VoteBox key={item.id} item={item} index={index} />
                  ))}
                </Slider>
              ) : (
                <VoteEmptyBox>
                  <span>진행중인 투표가 없습니다.</span>
                  <Link to={"/vote"}>
                    투표 등록하러 가기 <ArrowForwardIosIcon />
                  </Link>
                </VoteEmptyBox>
              )}
              <LinkButton link={"/vote"} title="투표 더보기" />
            </VoteSlider>
            <section>
              <Subtitle title={`한페이지의 독서 분야 일정`} />
              <ScheduleBox>
                {bookFieldDocs[0]?.thisYearField?.map(
                  (item: IMonthField, index: number) => (
                    <li key={index}>
                      <span>{item.month}</span>
                      <span>{item.value}</span>
                    </li>
                  )
                )}
              </ScheduleBox>
            </section>
          </NewContainer>
        </>
      )}
    </>
  );
};

const NewContainer = styled(Container)`
  > section {
    margin-top: 60px;
    position: relative;
    &:first-child {
      margin-top: 0;
    }
  }
`;

const MeetingInfo = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin: 0 15px 10px;
  color: ${(props) => props.theme.text.lightBlue};
  @media ${device.tablet} {
    font-size: 16px;
  }
`;

const VoteSlider = styled.section`
  position: relative;
  margin: 0 auto 50px;
  box-sizing: none;
  width: 100%;
  .slick-slider {
    margin: 0 -10px;
  }
  .slick-slide {
    padding: 0 10px;
  }
  > div {
    > a {
      border: 1px solid red;
      margin-top: 30px;
    }
  }
`;

const VoteEmptyBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  > span {
    color: ${(props) => props.theme.text.gray};
    display: block;
    text-align: center;
  }
  > a {
    display: flex;
    align-items: center;
    align-self: center;
    color: ${(props) => props.theme.text.lightBlue};
    svg {
      width: 16px;
      height: 16px;
      fill: ${(props) => props.theme.text.lightBlue};
    }
  }
`;

const ScheduleBox = styled.ul`
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
  li {
    border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    font-size: 14px;
    padding: 20px 0;
    > span:first-child {
      margin-right: 10px;
      color: ${(props) => props.theme.text.accent};
    }
    > span:last-child {
      display: flex;
      align-items: center;
      height: 26px;
      padding: 0 5px;
      border-radius: 5px;
      font-weight: 700;
    }
  }
  @media ${device.tablet} {
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      width: 45%;
      height: 50px;
      font-size: 16px;
      > span:first-child {
        margin-right: 10px;
        color: ${(props) => props.theme.text.accent};
      }
      > span:last-child {
        display: flex;
        align-items: center;
        height: 26px;
        padding: 0 5px;
        border-radius: 5px;
        font-weight: 700;
      }
    }
  }
`;

export default Home;
