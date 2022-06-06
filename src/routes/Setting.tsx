import { Container } from "theme/commonStyle";
import { Link } from "react-router-dom";
import BackButton from "components/common/BackButton";
import Subtitle from "components/common/Subtitle";
import LogOutButton from "components/settings/LogOutButton";
import styled from "styled-components";
import DeleteAccountButton from "components/settings/DeleteAccountButton";

const Setting = () => {
  return (
    <>
      <Header>
        <BackButton />
        <Subtitle title="설정" />
      </Header>
      <NewContainer>
        <span>사용자 설정</span>
        <ul>
          <li>
            <Link to="editprofile">프로필 편집</Link>
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

export const Header = styled.header`
  display: flex;
  align-items: center;
  margin: 15px 15px 0;
  h1 {
    margin: 0;
    margin-left: 10px;
    padding-top: 2px;
  }
`;

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
