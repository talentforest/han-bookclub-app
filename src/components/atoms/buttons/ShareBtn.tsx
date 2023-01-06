import { currentUserState } from 'data/userAtom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <img
        src='https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png'
        alt='카카오링크 보내기 버튼'
      />
    </Btn>
  );
};

const Btn = styled.button`
  border: none;
  background-color: transparent;
  width: 30px;
  height: 30px;
  padding: 0;
  margin: 0;
  > img {
    width: 30px;
    height: 30px;
    border-radius: 30px;
  }
`;

export default ShareBtn;
