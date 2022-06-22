import { Container, Header } from "theme/commonStyle";
import { deviceSizes } from "theme/mediaQueries";
import { useEffect, useState } from "react";
import { thisMonth } from "util/constants";
import {
  getBookMeetingInfoData,
  getThisYearBookField,
  getVote,
  thisYearField,
} from "util/getFirebaseDoc";
import LinkButton from "components/common/LinkButton";
import useWindowSize from "hooks/useWindowSize";
import Subtitle from "components/common/Subtitle";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import Title from "components/common/Title";
import styled from "styled-components";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import VoteBox from "components/common/VoteBox";

const Home = () => {
  const [bookMeetingInfoDoc, setBookMeetingInfoDoc] = useState([]);
  const [bookfieldDoc, setBookfieldDoc] = useState([]);
  const { windowSize } = useWindowSize();
  const [voteDoc, setVoteDoc] = useState([]);

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

  return (
    <>
      {windowSize.width < +deviceSizes.tablet ? (
        <Header>
          <Title title="독서모임 한 페이지" />
        </Header>
      ) : (
        <></>
      )}
      <NewContainer>
        <section>
          <Subtitle title={`${thisMonth}월의 책`} />
          <BookTitleImgBox docData={bookMeetingInfoDoc[0]?.book} />
          <LinkButton link={"/bookmeeting/subject"} title="발제하러 가기" />
        </section>
        <section>
          <Subtitle title={`${thisMonth}월의 모임 일정`} />
          <p>한페이지 북클럽 멤버는 매월 셋째주 일요일에 만나요.</p>
          <MeetingInfoBox docData={bookMeetingInfoDoc[0]?.meeting} />
          <LinkButton
            link={"/bookmeeting/review"}
            title="모임 후기 작성하러 가기"
          />
        </section>
        <section>
          <Subtitle title={`${thisMonth}월의 투표`} />
          <ScrollContainer>
            <div>
              {voteDoc.slice(0, 3).map((item, index) => (
                <VoteBox key={item.id} item={item} index={index} />
              ))}
            </div>
          </ScrollContainer>
          <LinkButton link={"/vote"} title="투표 더보기" />
        </section>
        <section>
          <Subtitle title={`한페이지의 독서 분야 일정`} />
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

const NewContainer = styled(Container)`
  > section {
    margin: 0 auto;
    position: relative;
    > h3 {
      margin-top: 20px;
    }
    > p {
      font-size: 12px;
      font-weight: 700;
      margin: 0 15px 10px;
      color: ${(props) => props.theme.text.lightBlue};
    }
    > a {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      svg {
        padding-top: 2px;
        fill: ${(props) => props.theme.text.lightBlue};
      }
    }
  }
  > section:first-child {
    > h3 {
      margin-top: 0;
    }
  }
`;

const ScrollContainer = styled.div`
  overflow: scroll;
  > div {
    overflow: hidden;
    display: flex;
    width: fit-content;
    > div {
      margin-right: 15px;
      > ul {
        max-height: 200px;
      }
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
`;

export default Home;
