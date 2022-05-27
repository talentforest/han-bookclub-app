import { Container, Header, ScrollContainer } from "theme/commonStyle";
import { ReactComponent as HamburgerIcon } from "assets/view_headline.svg";
import LinkButton from "components/common/LinkButton";
import Subtitle from "components/common/Subtitle";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import VoteBox from "components/common/VoteBox";
import Title from "components/common/Title";
import styled from "styled-components";
import { deviceSizes } from "theme/mediaQueries";
import BookImage from "components/book/BookImage";
import useWindowSize from "hooks/useWindowSize";
import { useRecoilState } from "recoil";
import { bookDescState } from "data/bookAtom";
import { bookSearch } from "api/api";
import { useEffect } from "react";

const Home = () => {
  const [bookInfo, setBookInfo] = useRecoilState(bookDescState);
  const Month = new Date().getMonth() + 1;
  const { windowSize } = useWindowSize();

  const bookSearchHandler = async (query: string, reset: boolean) => {
    const params = {
      query: query,
    };
    const { data } = await bookSearch(params);
    setBookInfo({
      title: data.documents[0].title,
      authors: data.documents[0].authors,
      translators: data.documents[0].translators,
      publisher: data.documents[0].publisher,
      datetime: data.documents[0].datetime,
      contents: data.documents[0].contents,
      thumbnail: data.documents[0].thumbnail,
      url: data.documents[0].url,
    });
  };

  useEffect(() => {
    if (bookInfo.title.length > 0) {
      bookSearchHandler("미움받을 용기", true);
    }
    return () => {
      bookSearchHandler("미움받을 용기", true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {windowSize.width < +deviceSizes.tablet ? (
        <NewHeader>
          <Title title="독서모임 한 페이지" />
          <HamburgerIcon />
        </NewHeader>
      ) : (
        <></>
      )}

      <NewContainer>
        <section>
          <Subtitle title={`${Month}월의 책`} />
          <BookImage />
          <LinkButton link={"/book"} title="발제하러 가기" />
        </section>
        <section>
          <Subtitle title={`${Month}월의 모임 일정`} />
          <p>: 매월 셋째주 일요일</p>
          <MeetingInfoBox />
          <LinkButton link={"/meeting"} title="모임 후기 작성하러 가기" />
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
          <Subtitle title="다른 사람 책장 구경하기" />
        </section>
      </NewContainer>
    </>
  );
};

const NewHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  > div {
    display: flex;
    align-items: center;
    > svg {
      margin-left: 5px;
      fill: ${(props) => props.theme.text.gray};
      cursor: pointer;
      width: 24px;
      height: 24px;
    }
  }
`;

const NewContainer = styled(Container)`
  > section {
    margin: 0 auto;
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

export default Home;
