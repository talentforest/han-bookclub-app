import { Link } from 'react-router-dom';
import LogOutBtn from 'components/atoms/button/LogOutBtn';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import MobileHeader from 'layout/mobile/MobileHeader';
import useAlertAskJoin from 'hooks/useAlertAskJoin';

const Setting = () => {
  const { blockLinkAndAlertJoinMember } = useAlertAskJoin('see');

  const useSettings = [
    { to: 'edit-profile', name: '프로필 정보' },
    { to: 'edit-password', name: '비밀번호 변경' },
    { to: 'absence', name: '모임불참 설정' },
  ];

  const etcSettings = [
    { to: '', name: '로그아웃' },
    { to: 'delete-account', name: '탈퇴' },
  ];

  return (
    <>
      <MobileHeader title='설정' backBtn showDesktop={false} />
      <main>
        <SettingTitle>사용자 설정</SettingTitle>
        <List>
          {useSettings.map(({ to, name }) => (
            <Item key={to}>
              <Link to={to} onClick={blockLinkAndAlertJoinMember}>
                {name}
              </Link>
            </Item>
          ))}
        </List>

        <SettingTitle>기타</SettingTitle>
        <List>
          {etcSettings.map(({ to, name }) => (
            <Item key={to}>
              {to === '' ? (
                <LogOutBtn />
              ) : (
                <Link to={to} onClick={blockLinkAndAlertJoinMember}>
                  {name}
                </Link>
              )}
            </Item>
          ))}
        </List>
      </main>
    </>
  );
};

const SettingTitle = styled.h4`
  display: block;
  font-size: 14px;
  color: ${({ theme }) => theme.text.blue2};
  padding-bottom: 3px;
  @media ${device.tablet} {
    font-size: 14px;
  }
`;

const List = styled.ul`
  margin-bottom: 35px;
`;

const Item = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.text.gray1};
  padding: 12px 0;
  > button {
    font-size: 15px;
    padding: 0;
    cursor: pointer;
  }
  > a {
    font-size: 15px;
  }
  @media ${device.tablet} {
    padding: 15px 0;
    > button {
      font-size: 16px;
    }
    > a {
      font-size: 16px;
    }
  }
`;

export default Setting;
