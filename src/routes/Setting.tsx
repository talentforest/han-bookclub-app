import { Container } from "theme/commonStyle";
import { Link } from "react-router-dom";
import LogOutButton from "components/settings/LogOutButton";
import styled from "styled-components";
import BackButtonHeader from "components/header/BackButtonHeader";
import device from "theme/mediaQueries";

const Setting = () => {
  return (
    <>
      <BackButtonHeader title="설정" />
      <NewContainer>
        <span>사용자 설정</span>
        <ul>
          <li>
            <Link to="edit-profile">프로필 편집</Link>
          </li>
          <li>
            <Link to="edit-password">비밀번호 변경하기</Link>
          </li>
        </ul>
        <span>의견사항</span>
        <ul>
          <li>
            <Link to="update-request">업데이트 요청</Link>
          </li>
        </ul>
        <span>기타</span>
        <ul>
          <li>
            <LogOutButton />
          </li>
          <li>
            <Link to="delete-account">탈퇴</Link>
          </li>
        </ul>
      </NewContainer>
    </>
  );
};

const NewContainer = styled(Container)`
  > span {
    display: block;
    font-size: 12px;
    font-weight: 700;
    padding-top: 15px;
  }
  > ul {
    margin-bottom: 20px;
    > li {
      border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
      font-size: 14px;
      padding: 15px 0;
      > button {
        font-size: 14px;
        cursor: pointer;
        padding: 0;
      }
    }
  }
  @media ${device.tablet} {
    > span {
      display: block;
      font-size: 16px;
      font-weight: 700;
      padding-top: 15px;
    }
    > ul {
      margin-bottom: 20px;
      > li {
        border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
        font-size: 18px;
        padding: 20px 0;
        > button {
          font-size: 18px;
          cursor: pointer;
          padding: 0;
        }
      }
    }
  }
`;

export default Setting;
