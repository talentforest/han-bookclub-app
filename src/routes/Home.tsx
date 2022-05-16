import { BookInfo, Container, Header } from "theme/commonStyle";
import { ReactComponent as HamburgerIcon } from "assets/view_headline.svg";
import LinkButton from "components/common/LinkButton";
import Subtitle from "components/common/Subtitle";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import VoteBox from "components/common/VoteBox";
import Title from "components/common/Title";
import styled from "styled-components";
import { LogInUserInfo } from "components/App";

interface PropsType {
  userObj: LogInUserInfo;
}

const Home = ({ userObj }: PropsType) => {
  return (
    <>
      <NewHeader>
        <Title title="독서모임 한 페이지" />
        <HamburgerIcon />
      </NewHeader>
      <NewContainer>
        <section>
          <Subtitle title="4월의 책" />
          <BookInfo>
            <img src={require("assets/떨림과_울림.jpeg")} alt="Book" />
            <h3>떨림과 울림</h3>
          </BookInfo>
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
      width: 24px;
      height: 24px;
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
