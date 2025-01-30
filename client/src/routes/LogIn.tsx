import { Link, useNavigate } from 'react-router-dom';

import useLogIn from 'hooks/useLogIn';

import { authService } from 'fbase';

import SquareBtn from 'components/common/button/SquareBtn';
import Input from 'components/common/input/Input';

interface ILoginProps {
  isLoggedIn: boolean;
}

const LogIn = ({ isLoggedIn }: ILoginProps) => {
  const anonymous = authService.currentUser?.isAnonymous;
  const {
    email,
    password,
    error,
    onSubmit,
    onChange,
    onAnonymousLoginClick, //
  } = useLogIn(isLoggedIn);

  const navigate = useNavigate();

  return (
    <>
      <main className="mx-auto my-5 flex w-[90%] flex-col items-center justify-center">
        <header className="flex w-full flex-col items-center">
          <img
            src={`${process.env.PUBLIC_URL}/hanpage_logo.png`}
            alt="독서모임 한페이지 로고"
            className="size-1/2"
          />
          <h1 className="text-lg font-medium">독서모임 한페이지</h1>
        </header>

        <form
          onSubmit={onSubmit}
          className="mt-5 flex w-full flex-col items-center gap-3"
        >
          <Input
            name="email"
            type="email"
            value={email}
            placeholder="이메일 계정을 입력해주세요."
            onChange={onChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={onChange}
          />
          <span>{error}</span>

          <SquareBtn
            type="submit"
            name="로그인"
            color="darkBlue"
            className="w-full"
          />
          <SquareBtn
            type="button"
            handleClick={() => navigate('/create_account')}
            name="회원가입"
            className="w-full"
          />
          {!anonymous && (
            <SquareBtn
              type="button"
              color="blue"
              name="익명으로 로그인"
              handleClick={onAnonymousLoginClick}
              className="w-full"
            />
          )}
        </form>

        <Link to="/find_pw" className="mt-7 text-[13px] text-gray1">
          비밀번호 찾기
        </Link>
      </main>
    </>
  );
};

export default LogIn;
