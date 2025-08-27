import { clubBookFieldList, createAccountSteps, gender } from '@/appConstants';

import { useCreateAccount } from '@/hooks';

import MobileHeader from '@/layout/mobile/MobileHeader';

import BookFieldCheckBox from '@/components/auth/BookFieldCheckBox';
import GuideLine from '@/components/common/GuideLine';
import Subtitle from '@/components/common/Subtitle';
import Tag from '@/components/common/Tag';
import SquareBtn from '@/components/common/button/SquareBtn';
import Input from '@/components/common/input/Input';

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
      <MobileHeader showDesktop title="계정 생성" backBtn />

      <main>
        <header>
          <Tag
            color="lightBlue"
            shape="rounded"
            text={`${currentStep.step} / ${createAccountSteps.length}`}
            className="mb-2"
          />
          <Subtitle title={currentStep.stepName} />
        </header>

        {currentStep.step === 1 && (
          <form onSubmit={onFirstStepSubmit}>
            <GuideLine text="한페이지 멤버들에게 제공된 키워드를 입력해 주세요." />
            <Input
              id="키워드"
              name=""
              type="text"
              placeholder="키워드를 작성해주세요"
              value={keyword}
              onChange={onFirstStepChange}
              required
            />
            <SquareBtn
              type="submit"
              name="다음"
              className="mx-auto mt-10 !px-6"
            />
          </form>
        )}

        {currentStep.step === 2 && (
          <form onSubmit={onSecondStepSubmit} className="flex flex-col gap-3">
            <div>
              <GuideLine text="사용하실 계정 정보를 입력해 주세요." />
              {email && (
                <GuideLine text="유효한 이메일을 작성하셔야 비밀번호 찾기 등 다른 기능을 제대로 이용할 수 있어요. 이메일이 맞는지 다시 한번 확인해주세요." />
              )}
            </div>
            <Input
              name="email"
              type="email"
              placeholder="자주 사용하는 이메일 계정을 입력해주세요."
              value={email}
              onChange={onSecondStepChange}
            />
            <Input
              name="password"
              type="password"
              placeholder="비밀번호는 8자 이상이어야 합니다."
              value={password}
              onChange={onSecondStepChange}
            />
            <Input
              name="checkPassword"
              type="password"
              placeholder="비밀번호를 다시 한번 입력해주세요."
              value={checkPassword}
              onChange={onSecondStepChange}
            />
            {showErrorMsg && (
              <span className="text-sm text-pointCoral">{showErrorMsg}</span>
            )}

            <SquareBtn
              type="submit"
              name="계정 생성하기"
              className="mx-auto mt-4"
            />
          </form>
        )}

        {currentStep.step === 3 && (
          <form onSubmit={onThirdStepSubmit}>
            <label htmlFor="username">이름</label>
            <Input
              name="username"
              value={username}
              placeholder="이름을 입력해주세요."
              onChange={onThirdStepChange}
            />

            <label htmlFor="gender">성별</label>
            <fieldset>
              {gender.map(item => (
                <div key={item}>
                  <label htmlFor={item}>{item}</label>
                  <input
                    id={item}
                    type="radio"
                    name="gender"
                    value={item}
                    onChange={onThirdStepChange}
                    required
                  />
                </div>
              ))}
            </fieldset>

            <label htmlFor="bookFields">관심 분야</label>
            <fieldset className="bookfield">
              {clubBookFieldList.map(bookField => (
                <BookFieldCheckBox
                  key={bookField.id}
                  bookFieldName={bookField.name}
                  bookFields={bookField}
                  checkedBoxHandler={checkedBoxHandler}
                />
              ))}
            </fieldset>

            {showErrorMsg && <span>{showErrorMsg}</span>}

            <SquareBtn type="submit" name="등록하기" />
          </form>
        )}
      </main>
    </>
  );
};

export default CreateAccount;
