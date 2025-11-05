import { useState } from 'react';

type ErrorMsg = { error: string; condition: boolean };

export type ErrorMsgObj<T extends string> = {
  [key in T]: ErrorMsg[];
};

export const useHandleErrorMsg = () => {
  const [errorMsg, setErrorMsg] = useState<{
    [key in string]: string;
  }>({});

  const handleErrorMsg = <T extends string>(errorMsgObj: ErrorMsgObj<T>) => {
    const getFirstError = (errors: ErrorMsg[]) => {
      const error = errors?.find(err => err.condition)?.error;
      return error || '';
    };

    const errorMsg = Object.fromEntries(
      (Object.keys(errorMsgObj) as T[]).map(key => [
        key,
        getFirstError(errorMsgObj[key]),
      ]),
    ) as { [key in T]: string };

    setErrorMsg(errorMsg);

    // 에러가 하나라도 있으면 true 반환
    const hasError = Object.values(errorMsg).some(error => error !== '');

    return hasError;
  };

  return {
    errorMsg,
    handleErrorMsg,
  };
};
