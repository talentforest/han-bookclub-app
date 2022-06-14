import { Container, Header } from "theme/commonStyle";
import { deviceSizes } from "theme/mediaQueries";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { currentUserState } from "data/userAtom";
import { DocumentType } from "components/bookmeeting/Subjects";
import { getAllRecommends, getBookMeetingInfoData } from "util/getFirebaseDoc";
import LinkButton from "components/common/LinkButton";
import useWindowSize from "hooks/useWindowSize";
import Subtitle from "components/common/Subtitle";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import VoteBox from "components/common/VoteBox";
import Title from "components/common/Title";
import styled from "styled-components";
import BookRecomCreateBox from "components/common/BookRecomCreateBox";
import BookRecomBox from "components/common/BookRecomBox";
import BookTitleImgBox from "components/common/BookTitleImgBox";

const Home = () => {
  const [recommendBook, setRecommendBook] = useState<DocumentType[]>([]);
  const [bookMeetingInfoDoc, setBookMeetingInfoDoc] = useState([]);
  const { windowSize } = useWindowSize();
  const userData = useRecoilValue(currentUserState);
  const Month = new Date().getMonth() + 1;

  useEffect(() => {
    getBookMeetingInfoData(setBookMeetingInfoDoc);
    getAllRecommends(setRecommendBook);

    return () => {
      getBookMeetingInfoData(setBookMeetingInfoDoc);
      getAllRecommends(setRecommendBook);
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
          <Subtitle title={`${Month}월의 책`} />
          <BookTitleImgBox docData={bookMeetingInfoDoc[0]?.book} />
          <LinkButton link={"/bookmeeting/subject"} title="발제하러 가기" />
        </section>
        <section>
          <Subtitle title={`${Month}월의 모임 일정`} />
          <p>한페이지 북클럽 멤버는 매월 셋째주 일요일에 만나요.</p>
          <MeetingInfoBox docData={bookMeetingInfoDoc[0]} />
          <LinkButton
            link={"/bookmeeting/review"}
            title="모임 후기 작성하러 가기"
          />
        </section>
        <section>
          <Subtitle title={`${Month}월의 투표`} />
          <ScrollContainer>
            <div>
              <VoteBox />
              <VoteBox />
            </div>
          </ScrollContainer>
          <LinkButton link={"/vote"} title="투표하러 가기" />
        </section>
        <section>
          <Subtitle title={`${Month}월의 책 추천`} />
          <BookRecomCreateBox
            uid={userData?.uid}
            thisMonthBook={bookMeetingInfoDoc[0]?.book}
          />
          {recommendBook.length !== 0 &&
            recommendBook?.map((item) => (
              <BookRecomBox
                key={item.id}
                item={item}
                thisMonthBook={bookMeetingInfoDoc[0]?.book}
              />
            ))}
        </section>
      </NewContainer>
    </>
  );
};

const NewContainer = styled(Container)`
  > section {
    margin: 0 auto;
    > h1 {
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
    > h1 {
      margin-top: 0;
    }
  }
`;

const ScrollContainer = styled.div`
  width: 100%;
  overflow: auto;
  margin-left: -5px;
  > div {
    width: fit-content;
    padding: 5px;
    display: flex;
  }
`;

export default Home;
