import useChangePw from 'hooks/useChangePw';

import { authService } from 'fbase';

import MobileHeader from 'layout/mobile/MobileHeader';

import SquareBtn from 'components/common/button/SquareBtn';
import Input from 'components/common/input/Input';

const ChangePassword = () => {
  const user = authService?.currentUser;
  const {
    onSubmit,
    originPassword,
    onOriginChange,
    newPassword,
    onNewChange,
    checkNewPassword,
    onCheckNewChange,
  } = useChangePw();

  return (
    <>
      <MobileHeader title="비밀번호 변경" backBtn />
      <main>
        <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
          <input
            hidden
            type="text"
            autoComplete="username"
            defaultValue={user?.email}
          />
          <Input
            name="password"
            type="password"
            value={originPassword}
            placeholder="기존 비밀번호를 작성해주세요."
            onChange={onOriginChange}
            autoComplete="current-password"
          />
          <Input
            name="password"
            type="password"
            value={newPassword}
            placeholder="새로운 비밀번호를 작성해주세요."
            onChange={onNewChange}
            autoComplete="new-password"
          />
          <Input
            name="password"
            type="password"
            value={checkNewPassword}
            placeholder="새로운 비밀번호를 다시 한번 작성해주세요."
            onChange={onCheckNewChange}
            autoComplete="new-password"
          />
          <SquareBtn type="submit" name="변경하기" className="mx-auto mt-10" />
        </form>
      </main>
    </>
  );
};

export default ChangePassword;
