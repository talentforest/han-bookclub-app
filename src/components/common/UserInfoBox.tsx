import { AccountCircle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getUserData } from "util/getFirebaseDoc";
import styled from "styled-components";
import device from "theme/mediaQueries";

interface PropsType {
  creatorId: string;
}

const UserInfoBox = ({ creatorId }: PropsType) => {
  console.log(creatorId);
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
        <div>
          <ProfileImg $bgPhoto={userDataDoc.photoUrl} />
        </div>
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
  > div {
    padding: 1px;
    width: 22px;
    height: 22px;
  }
  span {
    font-size: 14px;
    margin-left: 5px;
  }
  svg {
    display: block;
    line-height: 0;
    width: 22px;
    height: 22px;
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
  border-radius: 10px;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center;
`;

export default UserInfoBox;
