import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Home } from "assets/home.svg";
import { ReactComponent as Vote } from "assets/how_to_vote.svg";
import { ReactComponent as Place } from "assets/place.svg";
import { ReactComponent as Account } from "assets/account_circle.svg";
import { ReactComponent as Book } from "assets/book.svg";
import styled from "styled-components";

const Navigation = () => {
  const pathname = useLocation().pathname;
  return !pathname.includes("setting") ? (
    <Nav>
      <ul>
        <li>
          <Link to="/">
            <Home fill={pathname === "/" ? "#333" : "#aaa"} />
            <span>홈</span>
          </Link>
        </li>
        <li>
          <Link to="/book">
            <Book fill={pathname.includes("/book") ? "#333" : "#aaa"} />
            <span>이달의 책</span>
          </Link>
        </li>
        <li>
          <Link to="/meeting">
            <Place fill={pathname.includes("/meeting") ? "#333" : "#aaa"} />
            <span>이달의 모임</span>
          </Link>
        </li>
        <li>
          <Link to="/vote">
            <Vote fill={pathname.includes("/vote") ? "#333" : "#aaa"} />
            <span>투표하기</span>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <Account fill={pathname.includes("/profile") ? "#333" : "#aaa"} />
            <span>나의 책장</span>
          </Link>
        </li>
      </ul>
    </Nav>
  ) : (
    <></>
  );
};

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 3px 0;
  background-color: ${(props) => props.theme.bgColor};
  ul {
    display: flex;
    justify-content: space-evenly;
    li {
      width: 20%;
      font-size: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      > a {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

export default Navigation;
