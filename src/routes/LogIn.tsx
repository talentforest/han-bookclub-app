import { Link } from 'react-router-dom';
import { authService } from 'fbase';
import device from 'theme/mediaQueries';
import useLogIn from 'hooks/useLogIn';
import SquareBtn, { Btn } from 'components/atoms/buttons/SquareBtn';
import styled from 'styled-components';
import Input from 'components/atoms/inputs/Input';

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
      <Main $anonymous={anonymous}>
        <LogoBox>
          <img
            src={`${process.env.PUBLIC_URL}/hanpage_logo.png`}
            alt='독서모임 한페이지 로고'
          />
          <h1>독서모임 한페이지</h1>
        </LogoBox>

        <Form onSubmit={onSubmit}>
          <Input
            name='email'
            type='email'
            value={email}
            placeholder='이메일 계정을 입력해주세요.'
            onChange={onChange}
          />
          <Input
            name='password'
            type='password'
            placeholder='비밀번호를 입력해주세요.'
            value={password}
            onChange={onChange}
          />
          <ErrorMsg>{error}</ErrorMsg>

          <BtnBox>
            <SquareBtn type='submit' name='로그인' />
            <Btn
              $color='purple'
              as={Link}
              to='/create_account'
              $disabled={false}
            >
              <span>회원가입</span>
            </Btn>
            {!anonymous && (
              <SquareBtn
                type='button'
                name='익명으로 로그인'
                handleClick={onAnonymousLoginClick}
              />
            )}
          </BtnBox>
        </Form>

        <FindPasswordLink to='/find_pw'>비밀번호 찾기</FindPasswordLink>
      </Main>
    </>
  );
};

const Main = styled.main<{ $anonymous: boolean }>`
  height: ${({ $anonymous }) => ($anonymous ? '90vh' : '100vh')};
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 0;
  position: relative;
  @media ${device.tablet} {
    > button {
      width: 50%;
      margin: 0 auto;
    }
  }
`;

const LogoBox = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  img {
    width: 100px;
  }
  h1 {
    font-size: 18px;
    color: ${({ theme }) => theme.text.blue1};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
  width: 100%;
  @media ${device.tablet} {
    width: 50%;
  }
`;

export const ErrorMsg = styled.span`
  font-size: 14px;
  width: 100%;
  padding-left: 5px;
  color: ${({ theme }) => theme.text.red};
  margin-bottom: 20px;
  @media ${device.tablet} {
    font-size: 16px;
  }
`;

const FindPasswordLink = styled(Link)`
  text-align: center;
  margin-top: 20px;
  font-size: 13px;
  text-decoration: underline;
  @media ${device.tablet} {
    font-size: 14px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

export default LogIn;
