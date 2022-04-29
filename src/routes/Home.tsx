import { Container, Header } from "theme/globalStyle";
import { ReactComponent as Hamburger } from "assets/view_headline.svg";
import LinkButton from "components/common/LinkButton";
import Subtitle from "components/common/Subtitle";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import VoteBox from "components/common/VoteBox";
import Title from "components/common/Title";
import styled from "styled-components";

const Home = () => {
  return (
    <>
      <NewHeader>
        <Title title="독서모임 한 페이지" />
        <Hamburger width="24px" height="24px" />
      </NewHeader>
      <NewContainer>
        <section>
          <Subtitle title="4월의 책" />
          <Book>
            <img src={require("assets/떨림과_울림.jpeg")} alt="Book" />
            <h3>떨림과 울림</h3>
          </Book>
          <LinkButton link={"/book"} title="발제하러 가기" />
        </section>
        <section>
          <Subtitle title="4월의 모임" />
          <MeetingInfoBox />
          <LinkButton link={"/meeting"} title="모임 후기 작성하러 가기" />
        </section>
        <section>
          <Subtitle title="4월의 투표" />
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

  > div {
    display: flex;
    align-items: center;
    > svg {
      margin-left: 5px;
      fill: ${(props) => props.theme.text.gray};
      cursor: pointer;
    }
  }
`;

const NewContainer = styled(Container)`
  > section {
    margin: 0 auto;
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

const Book = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    height: 135px;
    width: auto;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
    margin: 10px 0;
  }
  h3 {
    font-size: 14px;
  }
`;

const ScrollContainer = styled.div`
  overflow: scroll;
  margin: -5px -3px;
  padding: 5px 3px;
  > div {
    display: flex;
    width: fit-content;
  }
`;

export default Home;
