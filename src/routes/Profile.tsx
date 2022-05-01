import { Link } from "react-router-dom";
import { Container, Header } from "theme/globalStyle";
import { ReactComponent as SettingIcon } from "assets/settings.svg";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/atom";
import { AuthUser } from "./Book";
import { dbService } from "fbase";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Title from "components/common/Title";
import styled from "styled-components";
import ProfileImage from "components/common/ProfileImage";
import Subtitle from "components/common/Subtitle";
import ByBook from "components/profile/ByBook";
import ByRecord from "components/profile/ByRecord";

const Profile = () => {
  const [own, setOwn] = useState([]);
  const [category, setCategory] = useState("byBook");
  const userData = useRecoilValue<AuthUser | null>(currentUserState);

  const getMySubjects = async () => {
    const q = query(
      collection(dbService, "bookSubjects"),
      where("creatorId", "==", `${userData?.uid}`),
      orderBy("createdAt", "desc")
    );

    const ownSubjects: DocumentData[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      ownSubjects.push(doc.data());
    });

    setOwn(ownSubjects);
  };

  console.log(own);

  useEffect(() => {
    getMySubjects();
  }, [userData]);

  return (
    <>
      <NewHeader>
        <Title title="나의 책장" />
        <Link to="/setting">
          <SettingIcon />
        </Link>
      </NewHeader>
      <NewContainer>
        <div>
          <ProfileImage />
        </div>

        <Subtitle title="나의 기록" />
        <SortButton>
          <button name="byBook" onClick={() => setCategory("byBook")}>
            책별
          </button>
          <button name="byRecord" onClick={() => setCategory("byRecord")}>
            기록별
          </button>
        </SortButton>
        {category === "byBook" && <ByBook />}
        {category === "byRecord" && (
          <div>
            {own.map((item) => (
              <ByRecord
                key={item.createdAt}
                uid={userData?.uid}
                creatorId={item.creatorId}
                text={item.text}
                createdAt={item.createdAt}
              />
            ))}
          </div>
        )}
        <Subtitle title="내가 읽은 책 추천하기" />
      </NewContainer>
    </>
  );
};

const NewContainer = styled(Container)`
  > div:first-child {
    display: flex;
    justify-content: center;
  }
`;

const NewHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > a {
    display: flex;
    align-items: center;
    svg {
      margin-top: 2px;
      width: 20px;
      height: 20px;
    }
  }
`;

const SortButton = styled.div`
  margin-bottom: 10px;
  button {
    font-size: 12px;
    margin-right: 5px;
  }
`;

export default Profile;
