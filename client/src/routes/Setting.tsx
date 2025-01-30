import { Link } from 'react-router-dom';

import useAlertAskJoin from 'hooks/useAlertAskJoin';

import MobileHeader from 'layout/mobile/MobileHeader';

import LogOutBtn from 'components/common/button/LogOutBtn';

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
      <MobileHeader title="설정" backBtn showDesktop={false} />
      <main>
        <h4 className="block pb-1 text-sm text-blue1 max-md:text-sm">
          사용자 설정
        </h4>
        <ul className="mb-10 divide-y">
          {useSettings.map(({ to, name }) => (
            <li key={to} className="mb-1 pb-1 pt-2">
              <Link to={to} onClick={blockLinkAndAlertJoinMember}>
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <h4 className="block pb-1 text-sm text-blue1 max-md:text-sm">기타</h4>
        <ul className="mb-10 divide-y">
          {etcSettings.map(({ to, name }) => (
            <li key={to} className="mb-1 pb-1 pt-2">
              {to === '' ? (
                <LogOutBtn />
              ) : (
                <Link to={to} onClick={blockLinkAndAlertJoinMember}>
                  {name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Setting;
