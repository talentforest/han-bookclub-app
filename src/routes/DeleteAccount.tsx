import styled from 'styled-components';
import useDeleteAccount from 'hooks/useDeleteAccount';
import Header from 'layout/mobile/Header';
import Guide from 'components/atoms/Guide';
import device from 'theme/mediaQueries';
import SquareBtn from 'components/atoms/buttons/SquareBtn';
import Input from 'components/atoms/inputs/Input';

const DeleteAccount = () => {
  const {
    onDeleteSubmit,
    showMessage,
    password,
    onChange, //
  } = useDeleteAccount();

  return (
    <>
      <Header title='탈퇴' backBtn />
      <main>
        <Form onSubmit={onDeleteSubmit}>
          {showMessage && <Msg>비밀번호가 맞지 않습니다.</Msg>}
          <LabelInputBtnBox>
            <label>비밀번호 확인</label>

            <div>
              <Input
                name='password'
                type='password'
                placeholder='현재 비밀번호를 입력해주세요.'
                value={password}
                onChange={onChange}
                autoComplete='current-password'
              />

              <SquareBtn type='submit' name='탈퇴하기' />
            </div>
          </LabelInputBtnBox>
        </Form>

        <Guide text=' 탈퇴할 시 회원님의 데이터는 즉시 모두 삭제되며, 데이터는 복구 불가능합니다.' />
      </main>
    </>
  );
};

const Form = styled.form`
  margin: 10px 0 15px;
  gap: 5px;
`;

export const LabelInputBtnBox = styled.div`
  label {
    padding-left: 5px;
    font-size: 14px;
    color: ${(props) => props.theme.container.blue};
  }
  > div {
    padding-top: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
    input {
      flex: 1;
    }
  }
  @media ${device.tablet} {
    input {
      flex: none;
      width: 50%;
    }
    button {
      margin-top: 0;
    }
  }
`;

const Msg = styled.span`
  font-size: 13px;
  color: ${(props) => props.theme.text.lightBlue};
  margin-bottom: 3px;
  display: block;
`;

export default DeleteAccount;
