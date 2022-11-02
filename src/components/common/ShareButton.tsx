import { currentUserState } from "data/userAtom";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

interface IShareButtonProps {
  item: string;
  description: string;
  path: string;
}

const ShareButton = ({ item, description, path }: IShareButtonProps) => {
  const userData = useRecoilValue(currentUserState);

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(process.env.REACT_APP_KAKAO_SHARE_API_KEY);
  }

  useEffect(() => {
    shareKakao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shareKakao = () => {
    window.Kakao.Link.createCustomButton({
      container: "#kakaotalk-sharing-btn",
      templateId: 85261,
      templateArgs: {
        userId: userData.displayName,
        THU: userData.photoURL,
        title: `새로운 ${item} 등록되었어요!`,
        description,
        path,
      },
    });
  };

  return (
    <Btn id="kakaotalk-sharing-btn">
      <img
        src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
        alt="카카오링크 보내기 버튼"
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

export default ShareButton;
