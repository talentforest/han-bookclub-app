import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const HeadNav = () => {
  const pathname = useLocation().pathname;
  return !pathname.includes("setting") &&
    !pathname.includes("create_account") ? (
    <Nav>
      <Link to="/">
        <h1>한 페이지: Han Page</h1>
      </Link>
      <ul>
        <li>
          <Link to="/history">
            <span className={pathname.includes("/history") ? "isActive" : ""}>
              지난 책모임
            </span>
          </Link>
        </li>
        <li>
          <Link to="/bookmeeting">
            <span
              className={pathname.includes("/bookmeeting") ? "isActive" : ""}
            >
              이달의 책모임
            </span>
          </Link>
        </li>
        <li>
          <Link to="/vote">
            <span className={pathname.includes("/vote") ? "isActive" : ""}>
              투표하기
            </span>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <span className={pathname.includes("/profile") ? "isActive" : ""}>
              나의 책장
            </span>
          </Link>
        </li>
        <li>
          <Link to="/setting">
            <span className={pathname.includes("/setting") ? "isActive" : ""}>
              설정
            </span>
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
  height: 66px;
  padding: 4px 50px 0;
  > a {
    display: flex;
    align-items: center;
    h1 {
      font-size: 18px;
      font-weight: 700;
      color: ${(props) => props.theme.text.lightBlue};
    }
  }
  ul {
    display: flex;
    justify-content: end;
    gap: 0 30px;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      span {
        color: ${(props) => props.theme.text.default};
        &.isActive {
          color: ${(props) => props.theme.text.lightBlue};
        }
      }
    }
  }
`;

export default HeadNav;
