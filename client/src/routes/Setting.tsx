import { Link } from 'react-router-dom';

import { authService } from '@/fbase';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { DEVELOPER_EMAIL } from '@/appConstants';

import { useAlertAskJoin } from '@/hooks';

import MobileHeader from '@/layout/MobileHeader';

import LogOutBtn from '@/components/common/button/LogOutBtn';
import Section from '@/components/common/container/Section';

const Setting = () => {
  const { email } = useRecoilValue(currAuthUserAtom);

  const { blockLinkAndAlertJoinMember } = useAlertAskJoin('see');

  const settings = [
    {
      auth: !authService.currentUser.isAnonymous,
      name: '사용자 설정',
      list: [
        { to: 'edit-profile', name: '프로필 정보' },
        { to: 'edit-password', name: '비밀번호 변경' },
        { to: 'absence', name: '모임불참' },
        { to: 'notification', name: '알림' },
      ],
    },
    {
      auth: !authService.currentUser.isAnonymous,
      name: '인증',
      list: [
        { to: '', name: '로그아웃', children: <LogOutBtn /> },
        { to: 'delete-account', name: '탈퇴' },
      ],
    },
    {
      auth: email === DEVELOPER_EMAIL,
      name: '개발자도구',
      list: [{ to: 'developer', name: '알림보내기' }],
    },
  ];

  return (
    <>
      <MobileHeader
        title="설정"
        backBtn
        showDesktop={false}
        backTo={'/bookshelf'}
      />
      <main>
        {settings.map(({ name, list, auth }) =>
          auth ? (
            <Section className="!pb-8">
              <h4 className="block pb-1 text-sm font-medium text-green1 max-md:text-sm">
                {name}
              </h4>

              <ul className="divide-y divide-gray3">
                {list.map(({ to, name, children }) => (
                  <li key={to} className="py-2.5">
                    {children ? (
                      children
                    ) : (
                      <Link
                        to={to}
                        className="text-[15px]"
                        onClick={blockLinkAndAlertJoinMember}
                      >
                        {name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </Section>
          ) : (
            <></>
          ),
        )}
      </main>
    </>
  );
};

export default Setting;
