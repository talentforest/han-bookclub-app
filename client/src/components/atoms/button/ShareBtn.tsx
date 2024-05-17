import { currentUserState } from 'data/userAtom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { RiKakaoTalkFill } from 'react-icons/ri';
import styled from 'styled-components';

interface IShareButtonProps {
  title: string;
  description: string;
  path: string;
  place?: string;
  time?: string;
}

const ShareBtn = ({
  title,
  description,
  path,
  place,
  time,
}: IShareButtonProps) => {
  const userData = useRecoilValue(currentUserState);

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(process.env.REACT_APP_KAKAO_SHARE_API_KEY);
  }

  useEffect(() => {
    shareKakao();
  }, [userData]);

  const shareKakao = () => {
    window.Kakao.Link.createCustomButton({
      container: '#kakaotalk-sharing-btn',
      templateId: 85261,
      templateArgs: {
        place,
        schedule: time,
        userId: userData?.displayName,
        userImg: userData?.photoURL,
        title,
        description,
        path,
      },
    });
  };

  return (
    <Btn className='share-btn' id='kakaotalk-sharing-btn'>
      <RiKakaoTalkFill fontSize={18} fill='#FFCD00' />
    </Btn>
  );
};

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  line-height: 1;
`;

export default ShareBtn;
