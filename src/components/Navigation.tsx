import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Home } from "assets/home.svg";
import { ReactComponent as Vote } from "assets/how_to_vote.svg";
import { ReactComponent as Place } from "assets/place.svg";
import { ReactComponent as Account } from "assets/account_circle.svg";
import { ReactComponent as Book } from "assets/book.svg";
import styled from "styled-components";

const Navigation = () => {
  const pathname = useLocation().pathname;
  return (
    <Nav>
      <ul>
        <li>
          <Home
            width={20}
            height={20}
            fill={pathname === "/" ? "#333" : "#aaa"}
          />
          <Link to="/">홈</Link>
        </li>
        <li>
          <Book
            width={20}
            height={20}
            fill={pathname.includes("/book") ? "#333" : "#aaa"}
          />
          <Link to="/book">이달의 책</Link>
        </li>
        <li>
          <Place
            width={20}
            height={20}
            fill={pathname.includes("/meeting") ? "#333" : "#aaa"}
          />
          <Link to="/meeting">이달의 모임</Link>
        </li>
        <li>
          <Vote
            width={20}
            height={20}
            fill={pathname.includes("/vote") ? "#333" : "#aaa"}
          />
          <Link to="/vote">투표하기</Link>
        </li>
        <li>
          <Account
            width={20}
            height={20}
            fill={pathname.includes("/profile") ? "#333" : "#aaa"}
          />
          <Link to="/profile">나의 책장</Link>
        </li>
      </ul>
    </Nav>
  );
};

const Nav = styled.nav`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 3px 0;
  z-index: 99;
  background-color: ${(props) => props.theme.bgColor};
  ul {
    display: flex;
    justify-content: space-evenly;
    li {
      font-size: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
    }
  }
`;

export default Navigation;
