import { Link } from 'react-router-dom';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import EmailInput from 'components/atoms/inputs/EmailInput';
import PwInput from 'components/atoms/inputs/PwInput';
import useLogIn from 'hooks/useLogIn';
import SubmitBtn from 'components/atoms/buttons/SubmitBtn';
import LinkBtn from 'components/atoms/buttons/LinkBtn';

const LogIn = () => {
  const {
    email,
    password,
    error,
    onSubmit,
    onChange, //
  } = useLogIn();

  return (
    <Main>
      <Header>북클럽 한페이지</Header>
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
      <Footer>
        <Link to='/find_pw'>비밀번호 찾기</Link>
      </Footer>
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;
const Header = styled.header`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.text.lightBlue};
  padding-bottom: 5px;
  @media ${device.tablet} {
    font-size: 36px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export const ErrorMessage = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${(props) => props.theme.text.white};
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
  }
  @media ${device.tablet} {
    > a {
      font-size: 16px;
    }
  }
`;

export default LogIn;
