import { ReactNode } from 'react';

import { FaMedal } from 'react-icons/fa';

import UserImgName from '@/components/common/user/UserImgName';

interface ConfettiProps {
  title: '우수 멤버' | '최고의 모임책' | '최고의 발제문';
  userIdList?: string[];
  className?: string;
  children?: ReactNode;
  marqueeText?: string;
}

export default function Confetti({
  userIdList,
  className,
  children,
  title,
  marqueeText,
}: ConfettiProps) {
  return (
    <div className={`relative flex w-full flex-col pt-8 ${className}`}>
      <img
        src={`${import.meta.env.BASE_URL}/confetti.png`}
        alt="컨페티"
        className="absolute left-0 right-0 top-0 mx-auto rounded-2xl opacity-80"
      />

      <div className="z-10">
        <h3 className="text-center font-RomanticGumi text-2xl text-white">
          {title}
        </h3>

        {userIdList?.length !== 0 && (
          <ul className="mx-auto my-4 flex justify-center gap-x-2">
            {userIdList?.map(userId => (
              <li
                key={userId}
                className="relative flex aspect-square size-24 items-center justify-center rounded-2xl border-[4px] border-yellow-400 bg-[#312a2a] text-base shadow-card"
              >
                <FaMedal className="absolute -top-0.5 right-2 size-8 text-yellow-400" />
                <UserImgName
                  className="mt-2 flex flex-col gap-y-2 font-semibold text-white [&>img]:!size-10 [&>img]:shadow-card [&>img]:shadow-gray1"
                  userId={userId}
                />
              </li>
            ))}
          </ul>
        )}

        {marqueeText && (
          <h3 className="mt-4 animate-marquee whitespace-nowrap font-RomanticGumi font-bold italic text-purple4">
            {marqueeText}
          </h3>
        )}

        {children || children}
      </div>
    </div>
  );
}
