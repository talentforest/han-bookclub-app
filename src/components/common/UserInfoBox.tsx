import { AccountCircle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getUserData } from "util/getFirebaseDoc";
import styled from "styled-components";
import device from "theme/mediaQueries";

interface PropsType {
  creatorId: string;
}

const UserInfoBox = ({ creatorId }: PropsType) => {
  const [userDataDoc, setUserDataDoc] = useState({
    displayName: "",
    email: "",
    favoriteBookField: [],
    name: "",
    photoUrl: "",
  });

  useEffect(() => {
    getUserData(creatorId, setUserDataDoc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <User>
      {userDataDoc?.photoUrl ? (
        <ProfileImg $bgPhoto={userDataDoc.photoUrl} />
      ) : (
        <AccountCircle />
      )}
      <span>{userDataDoc?.displayName}</span>
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
  @media ${device.tablet} {
    span {
      font-size: 18px;
    }
    svg {
      width: 24px;
      height: 24px;
      margin-right: 5px;
    }
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
