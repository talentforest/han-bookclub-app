import { Link } from 'react-router-dom';

import useLogIn from 'hooks/useLogIn';

import { authService } from 'fbase';

import SquareBtn from 'components/common/button/SquareBtn';

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

  return (
    <>
      <main>
        <header>
          <img
            src={`${process.env.PUBLIC_URL}/hanpage_logo.png`}
            alt="독서모임 한페이지 로고"
          />
          <h1>독서모임 한페이지</h1>
        </header>

        <form onSubmit={onSubmit}>
          <input
            name="email"
            type="email"
            value={email}
            placeholder="이메일 계정을 입력해주세요."
            onChange={onChange}
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={onChange}
          />
          <span>{error}</span>

          <div>
            <SquareBtn type="submit" name="로그인" />
            <Link to="/create_account">
              <span>회원가입</span>
            </Link>
            {!anonymous && (
              <SquareBtn
                type="button"
                name="익명으로 로그인"
                handleClick={onAnonymousLoginClick}
              />
            )}
          </div>
        </form>

        <Link to="/find_pw">비밀번호 찾기</Link>
      </main>
    </>
  );
};

export default LogIn;
