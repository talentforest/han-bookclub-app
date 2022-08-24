import { Link } from "react-router-dom";
import { Container } from "theme/commonStyle";
import { useEffect } from "react";
import { today } from "util/constants";
import { getFixedBookFields, IMonthField, IVote } from "util/getFirebaseDoc";
import { useRecoilState } from "recoil";
import { bookFieldsState } from "data/documentsAtom";
import { settings } from "util/sliderSetting";
import { Info } from "@mui/icons-material";
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
import Loading from "components/common/Loading";
import useCallBookMeeting from "hooks/useCallBookMeeting";
import useCallVotes from "hooks/useCallVotes";

const Home = () => {
  const [bookFields, setBookFields] = useRecoilState(bookFieldsState);
  const { bookMeetings } = useCallBookMeeting();
  const { votes } = useCallVotes();

  useEffect(() => {
    getFixedBookFields(setBookFields);

    return () => {
      getFixedBookFields(setBookFields);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progressVote = votes.filter((item: IVote) => item.deadline >= today());
  const latestDocMonth = bookMeetings[0]?.id?.slice(6);

  return (
    <>
      <MobileHeader title="독서모임 한페이지" />
      {bookMeetings && bookFields ? (
        <NewContainer>
          <section>
            <Subtitle title={`${latestDocMonth}월의 책`} />
            <BookTitleImgBox docData={bookMeetings[0]?.book} />
            <LinkButton link={"/bookmeeting/subject"} title="발제하러 가기" />
          </section>
          <section>
            <Subtitle
              title={bookMeetings[0] && `${latestDocMonth}월의 모임 일정`}
            />
            <Guide>
              <Info />
              <p>
                한페이지 멤버는 <span>매월 셋째주 일요일</span>에 만나요.
              </p>
            </Guide>
            <MeetingInfoBox docData={bookMeetings[0]?.meeting} />
            <LinkButton
              link={"/bookmeeting/review"}
              title="모임 후기 작성하러 가기"
            />
          </section>
          <VoteSlider>
            <Subtitle title={"한페이지의 투표함"} />
            {progressVote.length ? (
              <Slider {...settings}>
                {progressVote?.map((vote, index) => (
                  <VoteBox key={vote.id} vote={vote} index={index} />
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
              {bookFields[0]?.thisYearField?.map((item: IMonthField) => (
                <li key={item.month}>
                  <div>{item.month}</div>
                  <span>{item.value}</span>
                </li>
              ))}
            </ScheduleBox>
          </section>
        </NewContainer>
      ) : (
        <Loading />
      )}
    </>
  );
};

const NewContainer = styled(Container)`
  > section {
    margin-top: 60px;
    &:first-child {
      margin-top: 0;
    }
  }
`;

const Guide = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  margin: 0 15px 10px;
  span {
    color: ${(props) => props.theme.text.lightBlue};
  }
  svg {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
  @media ${device.tablet} {
    font-size: 16px;
  }
`;

const VoteSlider = styled.section`
  margin: 0 auto 0px;
  box-sizing: none;
  width: 100%;
  .slick-list {
    padding-bottom: 3px;
  }
  .slick-slider {
    margin: 0 -10px;
  }
  .slick-slide {
    padding: 0 10px;
  }
`;

const VoteEmptyBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
    padding: 5px 8px;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    background-color: ${(props) => props.theme.container.lightBlue};
    color: ${(props) => props.theme.text.lightBlue};
    font-size: 14px;
    cursor: pointer;
    svg {
      width: 14px;
      height: 14px;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    font-size: 14px;
    padding: 20px 0;
    border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
    > div {
      border-radius: 20px;
      padding: 3px 6px;
      margin-right: 5px;
      color: ${(props) => props.theme.text.accent};
      background-color: ${(props) => props.theme.text.lightGray};
    }
    > span {
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
    gap: 10px;
    li {
      height: 50px;
      font-size: 16px;
      > div {
        margin-right: 10px;
        color: ${(props) => props.theme.text.accent};
      }
      > span {
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
