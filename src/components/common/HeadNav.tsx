import { MenuBook } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const HeadNav = () => {
  const pathname = useLocation().pathname;
  return !pathname.includes("setting") ? (
    <Nav>
      <Link to="/">
        <MenuBook />
        <h1>한 페이지: Han Page</h1>
      </Link>
      <ul>
        <li>
          <Link to="/book">
            <span>이달의 책</span>
          </Link>
        </li>
        <li>
          <Link to="/meeting">
            <span>이달의 모임</span>
          </Link>
        </li>
        <li>
          <Link to="/vote">
            <span>투표하기</span>
          </Link>
        </li>
        <li>
          <Link to="/profile">
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 20px;
  background-color: ${(props) => props.theme.container.blue};
  padding-top: 4px;
  > a {
    display: flex;
    align-items: center;
    svg {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      padding-bottom: 8px;
      fill: #ffea00;
    }
    h1 {
      font-size: 26px;
      font-weight: 700;
      color: ${(props) => props.theme.text.white};
    }
  }
  ul {
    width: 60%;
    display: flex;
    justify-content: end;
    li {
      margin-left: 20px;
      font-size: 18px;
      font-weight: 500;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      span {
        color: ${(props) => props.theme.text.white};
      }
    }
  }
`;

export default HeadNav;
