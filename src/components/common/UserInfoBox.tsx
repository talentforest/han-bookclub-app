import { AccountCircle } from "@mui/icons-material";
import { currentUserState } from "data/userAtom";
import { dbService } from "fbase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

interface PropsType {
  creatorId?: string;
}

const UserInfoBox = ({ creatorId }: PropsType) => {
  const [userDataDoc, setUserDataDoc] = useState({
    displayName: "",
    email: "",
    favoriteBookField: [],
    gender: "",
    name: "",
    photoUrl: "",
  });

  useEffect(() => {
    onSnapshot(doc(dbService, "User Data", `${creatorId}`), (doc) =>
      setUserDataDoc(doc.data() as any)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userData = useRecoilValue(currentUserState);

  return (
    <User>
      {userData.photoURL ? (
        <ProfileImg $bgPhoto={userData.photoURL} />
      ) : (
        <AccountCircle />
      )}
      <span>{userDataDoc?.displayName}</span>
    </User>
  );
};

const User = styled.div`
  border: 1px solid red;
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
