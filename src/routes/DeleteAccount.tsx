import styled from 'styled-components';
import SubmitBtn from 'components/atoms/buttons/SubmitBtn';
import Subtitle from 'components/atoms/Subtitle';
import PwInput from 'components/atoms/inputs/PwInput';
import useDeleteAccount from 'hooks/useDeleteAccount';

const DeleteAccount = () => {
  const {
    onDeleteSubmit,
    showMessage,
    password,
    onChange, //
  } = useDeleteAccount();

  return (
    <main>
      <Subtitle
        title=' 탈퇴할 시 회원님의 데이터는 즉시 모두 삭제되며, 데이터는 복구
        불가능합니다.'
      />
      <Form onSubmit={onDeleteSubmit}>
        {showMessage && <Msg>비밀번호가 맞지 않습니다.</Msg>}
        <PwInput
          name='password'
          placeholder='현재 비밀번호를 입력해주세요.'
          value={password}
          onChange={onChange}
          autoComplete='false'
        />
        <SubmitBtn children='탈퇴하기' />
      </Form>
    </main>
  );
};

const Form = styled.form`
  input {
    margin-bottom: 10px;
  }
`;
const Msg = styled.span`
  font-size: 13px;
  color: ${(props) => props.theme.text.lightBlue};
  margin-bottom: 3px;
  display: block;
`;

export default DeleteAccount;
