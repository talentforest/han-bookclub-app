import React, {
  ForwardedRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

import { FiChevronsDown, FiHash, FiMapPin, FiSearch } from 'react-icons/fi';

import Label from '@/components/common/input/Label';

interface InputProps {
  iconName?: 'FiMapPin' | 'FiSearch' | 'FiHash' | 'FiChevronsDown';
  inputType?: HTMLInputTypeAttribute & 'date-picker';
  label?: string;
  errorMsg?: string;
  containerClassName?: string;
  children?: ReactNode;
  tailIconChildren?: ReactNode;
}

/**
 * 공통 컴포넌트
 * Input이 필요한 다양한 곳에 다양한 형식으로 사용할 수 있는 공통 컴포넌트입니다.
 *
 * 1. 단순 인풋
 * 2. 라벨이 붙은 인풋
 * 3. 에러메시지를 나타낼 수 있는 인풋
 *
 * @param iconName input 왼쪽에 나타날 아이콘을 추가할 수 있습니다.
 * @param inputType input 타입을 지정합니다. input의 기본 속성 이외에 'date-picker'가 추가됩니다. 기본값은 'text'입니다.
 * @param label input에 대한 라벨을 붙일 때 해당 속성이 존재한다면 자동으로 인풋 상단에 라벨이 붙습니다.
 * @param errorMsg 에러메시지가 존재한다면 인풋 하단에 나타나게 됩니다.
 * @param containerClassName 인풋 컨테이너에 대한 스타일입니다.
 */

const Input = React.forwardRef(function (
  {
    iconName,
    inputType,
    label,
    errorMsg,
    containerClassName,
    children,
    tailIconChildren,
    ...rest
  }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const icon: { [key in InputProps['iconName']]: ReactNode } = {
    FiMapPin: <FiMapPin className="absolute left-3 top-3.5 size-[20px]" />,
    FiSearch: <FiSearch className="absolute left-3 top-3.5 size-[20px]" />,
    FiHash: <FiHash className="absolute left-3 top-3.5 size-[20px]" />,
    FiChevronsDown: (
      <FiChevronsDown
        className="absolute left-3 top-3.5 size-[20px]"
        onClick={() => console.log('hii')}
      />
    ),
  };

  const commonInputClassName =
    'h-12 w-full rounded-xl border focus:border-pointPurple border-gray1 focus:read-only:border-gray1 focus:read-only:border focus:border-2 placeholder:text-gray2 hover:bg-blue-50 focus:outline-none py-2';

  return (
    <div className={`relative flex w-full flex-col ${containerClassName}`}>
      {label && <Label text={label} />}

      {iconName ? (
        <div className="relative w-full">
          {icon[iconName]}
          <input
            {...rest}
            ref={ref}
            id={label || rest.id}
            className={`pl-10 pr-3 ${commonInputClassName} ${rest.className}`}
          />

          {tailIconChildren}
        </div>
      ) : (
        <>
          <input
            {...rest}
            ref={ref}
            id={label || rest.id}
            className={`px-3 ${commonInputClassName} ${rest.className}`}
          />
          {tailIconChildren}
        </>
      )}

      {errorMsg && <p className="pl-2 pt-1 text-sm text-red-500">{errorMsg}</p>}

      {children}
    </div>
  );
});

export default Input;
