import { Link } from 'react-router-dom';
import LogOutButton from 'components/organisms/setting/LogOutButton';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import Header from 'layout/mobile/Header';

const Setting = () => {
  return (
    <>
      <Header title='설정' backBtn />
      <main>
        <Title>사용자 설정</Title>
        <List>
          <Item>
            <Link to='edit-profile'>프로필 정보</Link>
          </Item>
          <Item>
            <Link to='edit-password'>비밀번호 변경하기</Link>
          </Item>
        </List>
        <Title>기타</Title>
        <List>
          <Item>
            <LogOutButton />
          </Item>
          <Item>
            <Link to='delete-account'>탈퇴</Link>
          </Item>
        </List>
      </main>
    </>
  );
};

const Title = styled.h4`
  display: block;
  font-size: 12px;
  font-weight: 700;
  @media ${device.tablet} {
    font-size: 16px;
  }
`;
const List = styled.ul`
  margin-bottom: 20px;
`;
const Item = styled.li`
  border-bottom: 1px solid ${(props) => props.theme.text.lightGray};
  font-size: 14px;
  padding: 15px 0;
  > button {
    font-size: 14px;
    padding: 0;
    cursor: pointer;
  }
  @media ${device.tablet} {
    font-size: 18px;
    padding: 20px 0;
    > button {
      font-size: 18px;
    }
  }
`;

export default Setting;
