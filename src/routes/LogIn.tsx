import { Link } from 'react-router-dom';
import { authService } from 'fbase';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import EmailInput from 'components/atoms/inputs/EmailInput';
import PwInput from 'components/atoms/inputs/PwInput';
import useLogIn from 'hooks/useLogIn';
import SubmitBtn from 'components/atoms/buttons/SubmitBtn';
import LinkBtn from 'components/atoms/buttons/LinkBtn';
import HandleBtn from 'components/atoms/buttons/HandleBtn';

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
    <Main $anonymous={anonymous}>
      <Header>
        <Logo src='hanpage_logo.png' alt='hanpage bookclub logo' />
        <h1>한페이지 독서모임</h1>
      </Header>
      <Form onSubmit={onSubmit}>
        <EmailInput
          value={email}
          placeholder='이메일 계정을 입력해주세요.'
          onChange={onChange}
        />
        <PwInput
          name='password'
          placeholder='비밀번호를 입력해주세요.'
          value={password}
          onChange={onChange}
          autoComplete='false'
        />
        <ErrorMessage>{error}</ErrorMessage>
        <SubmitBtn children='로그인' />
        <LinkBtn to='/create_account'>회원가입</LinkBtn>
      </Form>
      {!anonymous && (
        <HandleBtn
          children='익명으로 로그인'
          handleClick={onAnonymousLoginClick}
        />
      )}
      <Footer>
        <Link to='/find_pw'>비밀번호 찾기</Link>
      </Footer>
    </Main>
  );
};

const Main = styled.main<{ $anonymous: boolean }>`
  height: ${(props) => (props.$anonymous ? '90vh' : '100vh')};
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
const Logo = styled.img`
  height: 100px;
  width: 100px;
  margin-bottom: 20px;
`;
const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.text.lightBlue};
  padding-bottom: 5px;
  @media ${device.tablet} {
    font-size: 30px;
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
export const ErrorMessage = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.theme.text.accent};
  margin-bottom: 20px;
  @media ${device.tablet} {
    font-size: 16px;
  }
`;
const Footer = styled.footer`
  text-align: center;
  margin-top: 20px;
  > a {
    font-size: 13px;
    text-decoration: underline;
  }
  @media ${device.tablet} {
    > a {
      font-size: 16px;
    }
  }
`;

export default LogIn;
