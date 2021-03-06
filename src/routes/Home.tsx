import { Link } from "react-router-dom";
import { Container, Header } from "theme/commonStyle";
import device, { deviceSizes } from "theme/mediaQueries";
import { useEffect, useState } from "react";
import { today } from "util/constants";
import {
  getBookMeetingInfoData,
  getThisYearBookField,
  getVote,
  thisYearField,
  VoteDocument,
} from "util/getFirebaseDoc";
import LinkButton from "components/common/LinkButton";
import useWindowSize from "hooks/useWindowSize";
import Subtitle from "components/common/Subtitle";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import styled from "styled-components";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import VoteBox from "components/vote/VoteBox";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Home = () => {
  const [bookMeetingInfoDoc, setBookMeetingInfoDoc] = useState([]);
  const [bookfieldDoc, setBookfieldDoc] = useState([]);
  const [voteDoc, setVoteDoc] = useState([]);
  const { windowSize } = useWindowSize();

  useEffect(() => {
    getBookMeetingInfoData(setBookMeetingInfoDoc);
    getThisYearBookField(setBookfieldDoc);
    getVote(setVoteDoc);

    return () => {
      getBookMeetingInfoData(setBookMeetingInfoDoc);
      getThisYearBookField(setBookfieldDoc);
      getVote(setVoteDoc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progressVote = voteDoc.filter(
    (item: VoteDocument) => item.deadline >= today()
  );

  const docMonth = bookMeetingInfoDoc[0]?.id.slice(6);

  let settings = {
    arrows: false,
    dots: true,
    infinite: progressVote.length > 1,
    pauseOnHover: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {windowSize.width < +deviceSizes.tablet ? (
        <Header>
          <h1>???????????? ??? ?????????</h1>
        </Header>
      ) : (
        <></>
      )}
      <NewContainer>
        <section>
          <Subtitle
            title={bookMeetingInfoDoc[0] ? `${docMonth}?????? ???` : "?????? ???"}
          />
          <BookTitleImgBox docData={bookMeetingInfoDoc[0]?.book} />
          <LinkButton link={"/bookmeeting/subject"} title="???????????? ??????" />
        </section>
        <section>
          <Subtitle
            title={
              bookMeetingInfoDoc[0]
                ? `${docMonth}?????? ?????? ??????`
                : "?????? ?????? ??????"
            }
          />
          <p>???????????? ????????? ?????? ????????? ???????????? ?????????.</p>
          <MeetingInfoBox docData={bookMeetingInfoDoc[0]?.meeting} />
          <LinkButton
            link={"/bookmeeting/review"}
            title="?????? ?????? ???????????? ??????"
          />
        </section>
        <SliderSection>
          <Subtitle title={"??????????????? ?????????"} />
          <Slider {...settings}>
            {progressVote.length ? (
              progressVote.map((item, index) => (
                <VoteBox key={item.id} item={item} index={index} />
              ))
            ) : (
              <EmptyBox>
                <span>???????????? ????????? ????????????.</span>
                <Link to={"/vote"}>
                  ?????? ???????????? ?????? <ArrowForwardIosIcon />
                </Link>
              </EmptyBox>
            )}
          </Slider>
          <LinkButton link={"/vote"} title="?????? ?????????" />
        </SliderSection>
        <section>
          <Subtitle title={`??????????????? ?????? ?????? ??????`} />
          <ScheduleBox>
            {bookfieldDoc[0]?.thisYearField?.map(
              (item: thisYearField, index: number) => (
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
  );
};

const EmptyBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding-top: 20px;
  margin-bottom: 3px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  height: 100px;
  > span {
    color: ${(props) => props.theme.text.gray};
    display: block;
    margin-bottom: 10px;
    text-align: center;
  }
  > a {
    width: fit-content;
    margin: 0 auto;
    color: ${(props) => props.theme.text.lightBlue};
    display: flex;
    align-items: center;
    svg {
      width: 16px;
      height: 16px;
      fill: ${(props) => props.theme.text.lightBlue};
    }
  }
`;

const NewContainer = styled(Container)`
  > section {
    margin-top: 60px;
    position: relative;
    > p {
      font-size: 14px;
      font-weight: 700;
      margin: 0 15px 10px;
      color: ${(props) => props.theme.text.lightBlue};
    }
  }
  > section:first-child {
    margin-top: 0;
  }
  @media ${device.tablet} {
    > section {
      > p {
        font-size: 16px;
      }
    }
  }
`;

const SliderSection = styled.section`
  position: relative;
  margin: 0 auto 50px;
  box-sizing: none;
  .slick-slider {
    margin: 0 -10px;
  }
  .slick-slide {
    width: 100%;
    padding: 0 10px;
  }
  > div {
    > a {
      margin-top: 30px;
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
