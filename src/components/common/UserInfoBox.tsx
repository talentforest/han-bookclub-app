import { ReactComponent as UserIcon } from "assets/account_circle.svg";
import { currentUserState } from "data/userAtom";
import { authService } from "fbase";
import { getAuth } from "firebase/auth";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const UserInfoBox = () => {
  const [userData, setUserData] = useRecoilState(currentUserState);

  console.log(authService.currentUser);

  // console.log(userData);
  return (
    <User>
      {userData.photoURL ? (
        <ProfileImg $bgPhoto={userData.photoURL} />
      ) : (
        <UserIcon />
      )}
      <span>{userData.displayName}</span>
    </User>
  );
};

const User = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 14px;
  }
  svg {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
`;

const ProfileImg = styled.div<{ $bgPhoto: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  margin-right: 5px;
`;

export default UserInfoBox;
