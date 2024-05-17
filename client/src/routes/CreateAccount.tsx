import { gender, bookFields } from 'constants/index';
import { createAccountSteps } from 'constants/createAccountSteps';
import device from 'theme/mediaQueries';
import styled from 'styled-components';
import useCreateAccount from 'hooks/useCreateAccount';
import BookFieldCheckBox from 'components/molecules/BookFieldCheckBox';
import Subtitle from 'components/atoms/Subtitle';
import GuideLine from 'components/atoms/GuideLine';
import SquareBtn from 'components/atoms/button/SquareBtn';
import Input from 'components/atoms/input/Input';
import MobileHeader from 'layout/mobile/MobileHeader';
import Tag from 'components/atoms/Tag';

const CreateAccount = () => {
  const {
    currentStep,
    keyword,
    onFirstStepChange,
    onFirstStepSubmit,
    email,
    password,
    checkPassword,
    showErrorMsg,
    onSecondStepChange,
    onSecondStepSubmit,
    username,
    onThirdStepChange,
    onThirdStepSubmit,
    checkedBoxHandler,
  } = useCreateAccount();

  return (
    <>
      <MobileHeader showDesktop title='계정 생성' backBtn />

      <main>
        <MainHeader>
          <Tag>
            <span>
              {currentStep.step} / {createAccountSteps.length}
            </span>
          </Tag>
          <Subtitle title={currentStep.stepName} />
        </MainHeader>

        {currentStep.step === 1 && (
          <Form onSubmit={onFirstStepSubmit}>
            <GuideLine text='한페이지 멤버들에게 제공된 키워드를 입력해 주세요.' />
            <Input
              id='키워드'
              name=''
              type='text'
              placeholder='키워드를 작성해주세요'
              value={keyword}
              onChange={onFirstStepChange}
              required
            />
            <SquareBtn type='submit' name='완료' />
          </Form>
        )}

        {currentStep.step === 2 && (
          <Form onSubmit={onSecondStepSubmit}>
            <GuideLine text='사용하실 계정 정보를 입력해 주세요.' />
            {email && (
              <GuideLine text='유효한 이메일을 작성하셔야 비밀번호 찾기 등 다른 기능을 제대로 이용할 수 있어요. 이메일이 맞는지 다시 한번 확인해주세요.' />
            )}
            <Input
              name='email'
              type='email'
              placeholder='자주 사용하는 이메일 계정을 입력해주세요.'
              value={email}
              onChange={onSecondStepChange}
            />
            <Input
              name='password'
              type='password'
              placeholder='비밀번호는 8자 이상이어야 합니다.'
              value={password}
              onChange={onSecondStepChange}
            />
            <Input
              name='checkPassword'
              type='password'
              placeholder='비밀번호를 다시 한번 입력해주세요.'
              value={checkPassword}
              onChange={onSecondStepChange}
            />
            {showErrorMsg && <Msg>{showErrorMsg}</Msg>}

            <SquareBtn type='submit' name='계정 생성하기' />
          </Form>
        )}

        {currentStep.step === 3 && (
          <Form onSubmit={onThirdStepSubmit}>
            <label>이름</label>
            <Input
              name='username'
              value={username}
              placeholder='이름을 입력해주세요.'
              onChange={onThirdStepChange}
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
                    onChange={onThirdStepChange}
                    required
                  />
                </GenderBox>
              ))}
            </Fieldset>

            <label>관심 분야</label>
            <Fieldset className='bookfield'>
              {bookFields.map((item, index) => (
                <BookFieldCheckBox
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

const MainHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  > label {
    font-size: 14px;
    margin: 20px 5px 0;
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
  font-size: 14px;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.text.blue3};
  @media ${device.tablet} {
    font-size: 16px;
  }
`;

export default CreateAccount;
