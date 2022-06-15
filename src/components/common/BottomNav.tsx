import { Link, useLocation } from "react-router-dom";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styled from "styled-components";
import { History } from "@mui/icons-material";

const BottomNav = () => {
  const pathname = useLocation().pathname;
  return !pathname.includes("setting") ? (
    <Nav>
      <ul>
        <li>
          <Link to="/">
            <HomeIcon className={pathname === "/" ? "isActive" : ""} />
            <span>홈</span>
          </Link>
        </li>
        <li>
          <Link to="/history">
            <History
              className={pathname.includes("/history") ? "isActive" : ""}
            />
            <span>지난 책모임</span>
          </Link>
        </li>
        <li>
          <Link to="/bookmeeting">
            <MenuBookIcon
              className={pathname.includes("/book") ? "isActive" : ""}
            />
            <span>이달의 책모임</span>
          </Link>
        </li>
        <li>
          <Link to="/vote">
            <HowToVoteIcon
              className={pathname.includes("/vote") ? "isActive" : ""}
            />
            <span>투표하기</span>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <AccountCircleIcon
              className={pathname.includes("/profile") ? "isActive" : ""}
            />
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
          margin-bottom: 5px;
          fill: #aaa;
          &.isActive {
            fill: #333;
          }
        }
      }
    }
  }
`;

export default BottomNav;
