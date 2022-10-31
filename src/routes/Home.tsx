import { Link } from "react-router-dom";
import { Container } from "theme/commonStyle";
import { useEffect } from "react";
import { thisYear, thisYearMonth, today } from "util/constants";
import { getCollection, getDocument, IVote } from "util/getFirebaseDoc";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  bookFieldsState,
  thisMonthState,
  votesState,
} from "data/documentsAtom";
import { getMonthNumber } from "util/getMonthNumber";
import { settings } from "util/sliderSetting";
import LinkButton from "components/common/LinkButton";
import Subtitle from "components/common/Subtitle";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import VoteBox from "components/vote/VoteBox";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Loading from "components/common/Loading";
import Guide from "components/common/Guide";
import device from "theme/mediaQueries";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import FieldScheduleBox from "components/FieldScheduleBox";
import { usersState } from "data/userAtom";

const Home = () => {
  const [thisMonthDoc, setThisMonthDoc] = useRecoilState(thisMonthState);
  const [bookFields, setBookFields] = useRecoilState(bookFieldsState);
  const [votes, setVotes] = useRecoilState(votesState);
  const setUserDocs = useSetRecoilState(usersState);

  useEffect(() => {
    getCollection("User Data", setUserDocs);
    getDocument("BookMeeting Info", `${thisYearMonth}`, setThisMonthDoc);
    getDocument("Book Field", `${thisYear}`, setBookFields);
    getCollection("Vote", setVotes);
  }, [setThisMonthDoc, setBookFields, setVotes, setUserDocs]);

  const progressVotes = votes.filter((item: IVote) => item.deadline >= today());
  const checkThisMonthDoc = Object.keys(thisMonthDoc).length;

  return (
    <>
      {checkThisMonthDoc === 0 ? (
        <Loading />
      ) : (
        <NewContainer>
          <section>
            <Subtitle title={`${getMonthNumber(thisMonthDoc?.id)}월의 책`} />
            <Guide
              margin={true}
              text="이달의 책은 매월 1일에 업데이트 됩니다."
            />
            <BookTitleImgBox
              thumbnail={thisMonthDoc?.book?.thumbnail}
              title={thisMonthDoc?.book?.title}
            />
          </section>
          <section>
            <Subtitle
              title={`${getMonthNumber(thisMonthDoc?.id)}월의 모임 일정`}
            />
            <Guide
              margin={true}
              text="한페이지 멤버는 매월 셋째주 일요일에 만나요."
            />
            <MeetingInfoBox docData={thisMonthDoc?.meeting} />
            <LinkButton link={"/bookmeeting"} title="발제하러 가기" />
          </section>
          <VoteSlider>
            <Subtitle title={"한페이지의 투표함"} />
            {progressVotes.length ? (
              <Slider {...settings(progressVotes.length)}>
                {progressVotes?.map((voteDetail) => (
                  <VoteBox key={voteDetail.id} voteDetail={voteDetail} />
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
          <FieldScheduleBox
            bookFields={bookFields?.bookField}
            thisMonthDoc={thisMonthDoc}
          />
        </NewContainer>
      )}
    </>
  );
};

const NewContainer = styled(Container)`
  > section {
    margin-top: 40px;
    &:first-child {
      margin-top: 0;
    }
  }
  @media ${device.tablet} {
    > section {
      &:first-child {
        > div:nth-child(2) {
          margin-bottom: 30px;
        }
      }
    }
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

export default Home;
