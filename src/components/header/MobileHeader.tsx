import { Settings } from "@mui/icons-material";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import device from "theme/mediaQueries";
import styled from "styled-components";

const MobileHeader = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const searchDetailMatch = useMatch("/search/:id");
  const voteDetailMatch = useMatch("/vote/:id");
  const historyDetailMatch = useMatch("/history/:id");
  const bookMeetingMatch = useMatch("/bookmeeting/*");

  const onClick = () => {
    navigate(-1);
  };

  function mainPageTitle() {
    if (pathname === "/") return "독서모임 한페이지";
    if (pathname === "/history") return "지난 책모임";
    if (bookMeetingMatch) return "이달의 책모임";
    if (pathname === "/vote") return "한페이지의 투표함";
  }

  function detailPageTitle() {
    if (pathname === "find_pw") return "비밀번호 찾기";
    if (pathname === "/setting") return "설정";
    if (pathname === "/setting/update-request") return "업데이트 요청하기";
    if (pathname === "/setting/edit-profile") return "프로필 정보";
    if (pathname === "/setting/edit-password") return "비밀번호 변경하기";
    if (pathname === "/create_account") return "계정 생성하기";
    if (pathname === "/create_account/userInfo")
      return "개인정보과 취향 등록하기";
    if (pathname === "/setting/delete-account") return "탈퇴";
    if (pathname === "/search") return "책 검색하기";
    if (searchDetailMatch) return "도서 정보";
    if (voteDetailMatch) return "투표함";
    if (historyDetailMatch) return "지난 책모임";
  }

  return (
    <>
      {mainPageTitle() && <Header>{mainPageTitle()}</Header>}
      {detailPageTitle() && (
        <BackButtonHeader onClick={onClick}>
          <ArrowBackIosNewIcon />
          {detailPageTitle()}
        </BackButtonHeader>
      )}
      {pathname === "/profile" && (
        <SettingIconHeader>
          나의 책장
          <Link to="/setting">
            <Settings />
          </Link>
        </SettingIconHeader>
      )}
    </>
  );
};

export const Header = styled.header`
  color: ${(props) => props.theme.text.gray};
  display: flex;
  align-items: center;
  height: 50px;
  padding: 15px;
  font-size: 16px;
  font-weight: 700;
  @media ${device.tablet} {
    font-size: 22px;
  }
`;

export const SettingIconHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  button,
  a {
    display: flex;
    align-items: center;
    width: fit-content;
    font-size: 12px;
    color: ${(props) => props.theme.text.lightBlue};
    border: none;
    background-color: transparent;
    font-weight: 700;
    cursor: pointer;
    margin: 0;
    svg {
      fill: ${(props) => props.theme.text.lightBlue};
      width: 16px;
      height: 16px;
      margin-right: 3px;
    }
  }
  a {
    svg {
      fill: ${(props) => props.theme.text.default};
      width: 18px;
      height: 18px;
      margin-right: 0px;
    }
  }
  @media ${device.tablet} {
    margin: 0;
    button {
      font-size: 18px;
      svg {
        fill: ${(props) => props.theme.text.lightBlue};
        width: 18px;
        height: 18px;
        margin-right: 3px;
      }
    }
  }
`;

const BackButtonHeader = styled.header`
  color: ${(props) => props.theme.text.gray};
  display: flex;
  align-items: center;
  height: 50px;
  padding: 15px;
  font-size: 16px;
  font-weight: 700;
  width: fit-content;
  svg {
    cursor: pointer;
    width: 18px;
    height: 18px;
    padding-bottom: 2px;
    margin-right: 5px;
  }
  @media ${device.tablet} {
    margin-top: 30px;
    padding-left: 80px;
    font-size: 22px;
    svg {
      width: 22px;
      height: 22px;
    }
  }
  @media ${device.desktop} {
    padding-left: 160px;
  }
`;

export default MobileHeader;
