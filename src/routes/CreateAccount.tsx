import { useState } from 'react';
import { gender, bookFields } from 'util/index';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import useCreateAccount from 'hooks/useCreateAccount';
import BookField from 'components/organisms/login/BookField';
import Subtitle from 'components/atoms/Subtitle';
import Guide from 'components/atoms/Guide';
import Header from 'layout/desktop/Header';
import SquareBtn from 'components/atoms/buttons/SquareBtn';
import Input from 'components/atoms/inputs/Input';

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
    <>
      <Header title='계정 생성' />

      <main>
        {!showNextStep ? (
          <Form onSubmit={onFirstStepSubmit}>
            <Subtitle title='사용하실 계정 정보를 입력해 주세요.' />

            {email && (
              <Guide text='유효한 이메일을 작성하셔야 비밀번호 찾기 등 다른 기능을 제대로 이용할 수 있어요. 이메일이 맞는지 다시 한번 확인해주세요.' />
            )}

            <Input
              name='email'
              type='email'
              placeholder='자주 사용하는 이메일 계정을 입력해주세요.'
              value={email}
              onChange={onFirstStepChange}
            />
            <Input
              name='password'
              type='password'
              placeholder='비밀번호는 8자 이상이어야 합니다.'
              value={password}
              onChange={onFirstStepChange}
            />
            <Input
              name='checkPassword'
              type='password'
              placeholder='비밀번호를 다시 한번 입력해주세요.'
              value={checkPassword}
              onChange={onFirstStepChange}
            />
            {showErrorMsg && <Msg>{showErrorMsg}</Msg>}

            <SquareBtn type='submit' name='계정 생성하기' />
          </Form>
        ) : (
          <Form onSubmit={onLastStepSubmit}>
            <label>이름</label>
            <Input
              name='username'
              value={username}
              placeholder='이름을 입력해주세요.'
              onChange={onLastStepChange}
            />

            <label>성별</label>
            <Fieldset>
              {gender.map((item) => (
                <GenderBox key={item}>
                  <label htmlFor={item}>{item}</label>
                  <input
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

            <label>관심 분야</label>
            <Fieldset className='bookfield'>
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

            <SquareBtn type='submit' name='등록하기' />
          </Form>
        )}
      </main>
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;

  > label {
    font-size: 13px;
    margin: 20px 5px 5px;
    color: ${({ theme }) => theme.text.blue1};
    &:first-child {
      margin-top: 0;
    }
  }
  @media ${device.tablet} {
    > label {
      font-size: 14px;
    }
  }
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  gap: 15px 20px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.text.gray1};
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.boxShadow};
  &.bookfield {
    margin-bottom: 30px;
  }
  @media ${device.tablet} {
    padding: 10px;
  }
`;

const GenderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > label {
    min-width: 34px;
    padding-top: 3px;
  }
  > input {
    margin-bottom: 3px;
  }
  @media ${device.tablet} {
    margin-right: 3px;
    > label {
      min-width: 30px;
    }
  }
`;

const Msg = styled.p`
  font-size: 12px;
  font-weight: 700;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.text.blue3};
  @media ${device.tablet} {
    font-size: 16px;
  }
`;

export default CreateAccount;
