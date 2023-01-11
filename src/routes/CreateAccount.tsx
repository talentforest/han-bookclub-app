import { useState } from 'react';
import { gender, bookFields } from 'util/index';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import TextInput from 'components/atoms/inputs/TextInput';
import SubmitBtn from 'components/atoms/buttons/SubmitBtn';
import useCreateAccount from 'hooks/useCreateAccount';
import BookField from 'components/organisms/login/BookField';
import Subtitle from 'components/atoms/Subtitle';
import Guide from 'components/atoms/Guide';
import EmailInput from 'components/atoms/inputs/EmailInput';
import PwInput from 'components/atoms/inputs/PwInput';

const CreateAccount = () => {
  const [showNextStep, setShowNextStep] = useState(false);
  const {
    email,
    password,
    checkPassword,
    showErrorMsg,
    onFirstStepChange,
    onFirstStepSubmit,
    username,
    onLastStepChange,
    onLastStepSubmit,
    checkedBoxHandler,
  } = useCreateAccount(setShowNextStep);

  return (
    <main>
      {!showNextStep ? (
        <Form onSubmit={onFirstStepSubmit}>
          <Subtitle title='사용하실 계정 정보를 입력해 주세요.' />
          {email && (
            <Guide text='유효한 이메일을 작성하셔야 비밀번호 찾기 등 다른 기능을 제대로 이용할 수 있어요. 이메일이 맞는지 다시 한번 확인해주세요.' />
          )}
          <EmailInput
            placeholder='자주 사용하는 이메일 계정을 입력해주세요.'
            value={email}
            onChange={onFirstStepChange}
          />
          <PwInput
            name='password'
            placeholder='비밀번호는 8자 이상이어야 합니다.'
            value={password}
            onChange={onFirstStepChange}
            autoComplete='false'
          />
          <PwInput
            name='checkPassword'
            placeholder='비밀번호를 다시 한번 입력해주세요.'
            value={checkPassword}
            onChange={onFirstStepChange}
            autoComplete='false'
          />
          {showErrorMsg && <Msg>{showErrorMsg}</Msg>}
          <SubmitBtn>계정 생성하기</SubmitBtn>
        </Form>
      ) : (
        <Form onSubmit={onLastStepSubmit}>
          <Info>이름</Info>
          <TextInput
            name='username'
            value={username}
            placeholder='이름을 입력해주세요.'
            onChange={onLastStepChange}
          />
          <Info>성별</Info>
          <Fieldset>
            {gender.map((item) => (
              <GenderBox key={item}>
                <label htmlFor={item}>{item}</label>
                <CheckboxInput
                  id={item}
                  type='radio'
                  name='gender'
                  value={item}
                  onChange={onLastStepChange}
                  required
                />
              </GenderBox>
            ))}
          </Fieldset>
          <Info>관심 분야</Info>
          <Fieldset>
            {bookFields.map((item, index) => (
              <BookField
                key={index}
                bookFieldName={item.name}
                bookFields={item}
                checkedBoxHandler={checkedBoxHandler}
              />
            ))}
          </Fieldset>
          {showErrorMsg && <Msg>{showErrorMsg}</Msg>}
          <SubmitBtn children='등록하기' />
        </Form>
      )}
    </main>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  button {
    margin-top: 10px;
  }
`;
const Info = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.text.gray};
  margin: 10px 0 5px;
  &:first-child {
    margin: 0 0 5px;
  }
  @media ${device.tablet} {
    font-size: 16px;
  }
`;
const Fieldset = styled.fieldset`
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px 20px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.text.lightGray};
  background-color: ${(props) => props.theme.text.white};
  @media ${device.tablet} {
    padding: 20px 10px;
  }
`;
const GenderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > label {
    min-width: 50px;
    font-size: 16px;
    width: fit-content;
    color: ${(props) => props.theme.text.gray};
  }
  @media ${device.tablet} {
    margin-bottom: 10px;
    gap: 10px;
    > label {
      font-size: 18px;
      color: ${(props) => props.theme.text.gray};
      margin-top: 4px;
    }
  }
`;
const CheckboxInput = styled.input`
  width: fit-content;
  height: 20px;
  margin: 0;
  padding: 0;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.text.lightGray};

  &::placeholder {
    font-size: 16px;
  }
`;
const Msg = styled.p`
  font-size: 12px;
  font-weight: 700;
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.text.accent};
  @media ${device.tablet} {
    font-size: 16px;
  }
`;

export default CreateAccount;
