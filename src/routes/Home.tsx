import { Link } from "react-router-dom";
import { Container, Header } from "theme/globalStyle";
import { ReactComponent as Search } from "assets/search.svg";
import { ReactComponent as Setting } from "assets/settings.svg";
import { ReactComponent as ArrowRight } from "assets/chevron_right.svg";
import Subtitle from "components/common/Subtitle";
import BookDescBox from "components/common/BookDescBox";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import VoteBox from "components/common/VoteBox";
import Title from "components/common/Title";
import styled from "styled-components";

const Home = () => {
  return (
    <>
      <NewHeader>
        <Title title="독서모임 한 페이지" />
        <div>
          <Search width="22px" height="22px" />
          <Setting width="20px" height="20px" />
        </div>
      </NewHeader>
      <NewContainer>
        <Subtitle title="4월의 책" />
        <BookDescBox />
        <Link to="/book">
          <Button>발제문 작성하러 가기</Button>
          <ArrowRight width={16} height={18} />
        </Link>
        <Subtitle title="4월의 모임" />
        <ScrollCon>
          <div>
            <MeetingInfoBox />
            <MeetingInfoBox />
          </div>
        </ScrollCon>
        <Subtitle title="4월의 투표" />
        <ScrollCon>
          <div>
            <VoteBox />
            <VoteBox />
          </div>
        </ScrollCon>
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
      fill: ${(props) => props.theme.text.lightBlue};
      cursor: pointer;
    }
  }
`;

const NewContainer = styled(Container)`
  position: relative;
  overflow: hidden;
  > a {
    position: absolute;
    top: 202px;
    right: 15px;
    display: flex;
    align-items: center;
    svg {
      padding-top: 2px;
      fill: ${(props) => props.theme.text.lightBlue};
    }
  }
`;

const Button = styled.button`
  padding: 5px 0;
  border: none;
  background-color: transparent;
  font-size: 11px;
  color: ${(props) => props.theme.text.lightBlue};
`;

const ScrollCon = styled.div`
  overflow: scroll;
  margin: -5px -3px 30px;
  padding: 5px 3px;
  > div {
    display: flex;
    width: fit-content;
  }
`;

export default Home;
