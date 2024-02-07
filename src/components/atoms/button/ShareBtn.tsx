import { currentUserState } from 'data/userAtom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { FiShare2 } from 'react-icons/fi';
import styled from 'styled-components';

interface IShareButtonProps {
  title: string;
  description: string;
  path: string;
  place?: string;
  schedule?: string;
}

const ShareBtn = ({
  title,
  description,
  path,
  place,
  schedule,
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
        schedule,
        userId: userData?.displayName,
        userImg: userData?.photoURL,
        title,
        description,
        path,
      },
    });
  };

  return (
    <Btn id='kakaotalk-sharing-btn'>
      <FiShare2 fontSize={15} stroke='#aaa' />
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
