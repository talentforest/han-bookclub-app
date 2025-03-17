import { Link } from 'react-router-dom';

import { DEVELOPER_EMAIL } from 'appConstants/account';

import useAlertAskJoin from 'hooks/useAlertAskJoin';

import { currAuthUserAtom } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { authService } from 'fbase';

import MobileHeader from 'layout/mobile/MobileHeader';

import LogOutBtn from 'components/common/button/LogOutBtn';

const Setting = () => {
  const { email } = useRecoilValue(currAuthUserAtom);

  const { blockLinkAndAlertJoinMember } = useAlertAskJoin('see');

  const userSettings = [
    { to: 'edit-profile', name: '프로필 정보' },
    { to: 'edit-password', name: '비밀번호 변경' },
    { to: 'absence', name: '모임불참' },
  ];

  const etcSettings = [
    { to: '', name: '로그아웃' },
    { to: 'delete-account', name: '탈퇴' },
  ];

  const anonymous = authService.currentUser?.isAnonymous;

  return (
    <>
      <MobileHeader title="설정" backBtn showDesktop={false} />
      <main>
        <h4 className="block pb-1 text-sm text-blue1 max-md:text-sm">
          사용자 설정
        </h4>
        <ul className="mb-14 divide-y">
          {userSettings.map(({ to, name }) => (
            <li key={to} className="py-3">
              <Link to={to} onClick={blockLinkAndAlertJoinMember}>
                {name}
              </Link>
            </li>
          ))}

          {!anonymous && (
            <li className="py-3">
              <Link to="notification">알림</Link>
            </li>
          )}
        </ul>

        <h4 className="block pb-1 text-sm text-blue1 max-md:text-sm">기타</h4>

        <ul className="divide-y">
          {etcSettings.map(({ to, name }) => (
            <li key={to} className="py-3">
              {to === '' ? (
                <LogOutBtn />
              ) : (
                <Link to={to} onClick={blockLinkAndAlertJoinMember}>
                  {name}
                </Link>
              )}
            </li>
          ))}

          {email === DEVELOPER_EMAIL && (
            <li className="py-3">
              <Link to="developer">개발자도구</Link>
            </li>
          )}
        </ul>
      </main>
    </>
  );
};

export default Setting;
