type AccountStep = {
  step: number;
  stepName: '키워드 확인' | '계정 정보' | '멤버 정보';
};

export const createAccountSteps: AccountStep[] = [
  { step: 1, stepName: '키워드 확인' },
  { step: 2, stepName: '계정 정보' },
  { step: 3, stepName: '멤버 정보' },
];
