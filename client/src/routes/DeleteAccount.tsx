import useDeleteAccount from 'hooks/useDeleteAccount';

import MobileHeader from 'layout/mobile/MobileHeader';

import GuideLine from 'components/common/GuideLine';
import SquareBtn from 'components/common/button/SquareBtn';
import Input from 'components/common/input/Input';

const DeleteAccount = () => {
  const {
    onDeleteSubmit,
    showMessage,
    password,
    onChange, //
  } = useDeleteAccount();

  return (
    <>
      <MobileHeader title="탈퇴" backBtn />
      <main>
        <form className="mx-3 gap-1" onSubmit={onDeleteSubmit}>
          {showMessage && (
            <span className="text-sm">비밀번호가 맞지 않습니다.</span>
          )}
          <div>
            <label htmlFor="password">비밀번호 확인</label>

            <div>
              <Input
                name="password"
                type="password"
                placeholder="현재 비밀번호를 입력해주세요."
                value={password}
                onChange={onChange}
                autoComplete="current-password"
              />

              <SquareBtn type="submit" name="탈퇴하기" />
            </div>
          </div>
        </form>

        <GuideLine text=" 탈퇴할 시 회원님의 데이터는 즉시 모두 삭제되며, 데이터는 복구 불가능합니다." />
      </main>
    </>
  );
};

export default DeleteAccount;
