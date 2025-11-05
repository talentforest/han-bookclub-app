import { Link, useNavigate } from 'react-router-dom';

import { authService } from '@/fbase';

import { useLogIn } from '@/hooks';

import SquareBtn from '@/components/common/button/SquareBtn';
import Input from '@/components/common/input/Input';

interface LoginProps {
  isLoggedIn: boolean;
}

const LogIn = ({ isLoggedIn }: LoginProps) => {
  const anonymous = authService.currentUser?.isAnonymous;

  const {
    currEmail,
    currPassword,
    onSubmit,
    onChange,
    onAnonymousLoginClick, //
  } = useLogIn(isLoggedIn);

  const navigate = useNavigate();

  return (
    <>
      <main className="mx-auto flex h-screen w-[50%] flex-col items-center justify-center max-sm:w-[90%]">
        <header className="mt-[45%] flex w-full flex-col items-center">
          <img
            src={`${import.meta.env.VITE_PUBLIC_URL}/hanpage_logo.png`}
            alt="독서모임 한페이지 로고"
            className="size-40"
          />
          <h1 className="text-lg font-medium">독서모임 한페이지</h1>
        </header>

        <form onSubmit={onSubmit} className="mt-5 flex w-full flex-col gap-3">
          <Input
            name="email"
            type="email"
            value={currEmail.email}
            placeholder="이메일 계정을 입력해주세요."
            onChange={onChange}
            autoComplete="email"
            errorMsg={currEmail.error}
          />
          <Input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={currPassword.password}
            onChange={onChange}
            autoComplete="current-password"
            errorMsg={currPassword.error}
          />
          <SquareBtn
            type="submit"
            name="로그인"
            color="blue"
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
