import { useEffect } from 'react';

import { RiKakaoTalkFill } from 'react-icons/ri';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

interface ShareBtnProps {
  title: string;
  description: string;
  path: string;
  place?: string;
  time?: string;
}

const ShareBtn = ({ title, description, path, place, time }: ShareBtnProps) => {
  const { uid, displayName, photoURL } = useRecoilValue(currAuthUserAtom);

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(import.meta.env.VITE_KAKAO_SHARE_API_KEY);
  }

  useEffect(() => {
    shareKakao();
  }, [uid]);

  const shareKakao = () => {
    window.Kakao.Link.createCustomButton({
      container: '#kakaotalk-sharing-btn',
      templateId: 85261,
      templateArgs: {
        place,
        schedule: time,
        userId: displayName,
        userImg: photoURL,
        title,
        description,
        path,
      },
    });
  };

  return (
    <button
      className="share-btn flex h-fit items-center justify-center leading-5"
      id="kakaotalk-sharing-btn"
    >
      <RiKakaoTalkFill fontSize={18} fill="#FFCD00" />
    </button>
  );
};

export default ShareBtn;
