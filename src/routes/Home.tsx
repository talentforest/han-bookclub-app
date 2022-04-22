import Title from "components/common/Title";
import styled from "styled-components";
import { Container } from "theme/globalStyle";
import { ReactComponent as Search } from "assets/search.svg";
import { ReactComponent as Setting } from "assets/settings.svg";
import Subtitle from "components/common/Subtitle";
import BookInfoBox from "components/common/BookInfoBox";
import { ReactComponent as ArrowRight } from "assets/chevron_right.svg";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import VoteInfoBox from "components/common/VoteInfoBox";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <NewContainer>
      <Header>
        <Title title="한겨레 독서모임" />
        <div>
          <Search width="22px" height="22px" />
          <Setting width="20px" height="20px" />
        </div>
      </Header>
      <Subtitle title="4월의 책" />
      <BookInfoBox />
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
          <VoteInfoBox />
          <VoteInfoBox />
        </div>
      </ScrollCon>
    </NewContainer>
  );
};

const NewContainer = styled(Container)`
  position: relative;
  overflow: hidden;
  > a {
    position: absolute;
    top: 245px;
    right: 0;
    display: flex;
    align-items: center;
    svg {
      padding-top: 2px;
      fill: ${(props) => props.theme.text.lightBlue};
    }
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    > svg {
      margin-left: 5px;
      cursor: pointer;
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
  padding: 0 2px 10px;
  > div {
    display: flex;
    width: fit-content;
  }
`;

export default Home;
