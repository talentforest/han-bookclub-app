import { ReactNode } from 'react';

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
    <div className={`relative flex w-full flex-col py-6 ${className}`}>
      <img
        src={`${import.meta.env.BASE_URL}/confetti.png`}
        alt="컨페티"
        className="absolute left-0 right-0 top-0 mx-auto opacity-80"
      />

      <div className="z-10">
        <h3 className="text-center font-RomanticGumi text-2xl text-white">
          {title}
        </h3>

        {userIdList?.length !== 0 && (
          <div className="mx-auto my-4 flex justify-center gap-x-2">
            {userIdList?.map(userId => (
              <UserImgName
                key={userId}
                className="flex aspect-square size-20 flex-col items-center justify-center rounded-2xl border-[3px] border-yellow-400 bg-white p-2 text-base shadow-card [&>img]:size-10"
                userId={userId}
              />
            ))}
          </div>
        )}

        {marqueeText && (
          <h3 className="animate-marquee -mx-5 mt-4 whitespace-nowrap font-RomanticGumi font-bold italic text-purple4">
            {marqueeText}
          </h3>
        )}

        {children || children}
      </div>
    </div>
  );
}
