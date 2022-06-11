import { Container } from "theme/commonStyle";
import { Link } from "react-router-dom";
import LogOutButton from "components/settings/LogOutButton";
import styled from "styled-components";
import DeleteAccountButton from "components/settings/DeleteAccountButton";
import BackButtonHeader from "components/common/BackButtonHeader";

const Setting = () => {
  return (
    <>
      <BackButtonHeader title="설정" />
      <NewContainer>
        <span>사용자 설정</span>
        <ul>
          <li>
            <Link to="editprofile">프로필 편집</Link>
          </li>
          <li>
            <Link to="editpassword">비밀번호 변경하기</Link>
          </li>
        </ul>
        <span>기타</span>
        <ul>
          <li>
            <LogOutButton />
          </li>
          <li>
            <DeleteAccountButton />
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
    > li {
      border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
      font-size: 14px;
      padding: 10px 0 15px;
      > button {
        cursor: pointer;
        padding: 0;
      }
    }
  }
`;

export default Setting;
