import { USER_DATA } from 'constants/index';
import { currentUserState } from 'data/userAtom';
import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import SquareBtn from 'components/atoms/button/SquareBtn';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

export default function AllowNotificationModalBox() {
  const [showModal, setShowModal] = useState(false);

  const { uid } = useRecoilValue(currentUserState);

  const toggleModal = () => setShowModal((prev) => !prev);

  const handleLocalStorage = (type: 'get' | 'set', notification?: boolean) => {
    const storeKey = 'notification';
    if (type === 'set') {
      return localStorage.setItem(storeKey, JSON.stringify(notification));
    }
    if (type === 'get') {
      return localStorage.getItem(storeKey);
    }
  };

  useEffect(() => {
    const notification = handleLocalStorage('get');

    if (notification === null) {
      setShowModal(true);
    }
  }, []);

  const onPermitNotificationClick = async (isPermitted: {
    notification: boolean;
  }) => {
    handleLocalStorage('set', isPermitted.notification);
    if (uid) {
      const document = doc(dbService, USER_DATA, uid);
      await updateDoc(document, isPermitted);
    }
    toggleModal();
  };

  return (
    <>
      {showModal ? (
        <NotificationBox>
          <h3>독서모임 한페이지는 알림(push)을 보낼 수 있어요.</h3>
          <p>
            발제문이나 모임 후기와 같은 게시물이 올라오면 알림을 받아보시겠어요?
          </p>
          <div>
            <SquareBtn
              name='허용하기'
              handleClick={() =>
                onPermitNotificationClick({ notification: true })
              }
            />
            <SquareBtn
              name='거절하기'
              color='gray'
              handleClick={() =>
                onPermitNotificationClick({ notification: false })
              }
            />
          </div>
        </NotificationBox>
      ) : (
        <></>
      )}
    </>
  );
}

export const NotificationBox = styled.div`
  width: 90%;
  position: fixed;
  bottom: 70px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 1;
  background-color: ${({ theme }) => theme.container.yellow2};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 15px;
  padding: 15px;
  > h3 {
    color: ${({ theme }) => theme.text.green};
    line-height: 1.4;
    margin-bottom: 10px;
  }
  > p {
    font-size: 15px;
    line-height: 1.5;
    margin-bottom: 15px;
  }
  > div {
    display: flex;
    gap: 10px;
  }
  @media ${device.tablet} {
    width: 60%;
    bottom: 50px;
  }
  @media ${device.desktop} {
    width: 40%;
  }
`;
