import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Header } from "theme/commonStyle";
import { ReactComponent as SettingIcon } from "assets/settings.svg";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { dbService } from "fbase";
import { LogInUserInfo } from "components/App";
import { DocumentType } from "components/book/SubjectBox";
import UserIcon from "assets/account_circle.svg";
import {
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Title from "components/common/Title";
import styled from "styled-components";
import Subtitle from "components/common/Subtitle";
import BookRecomBox from "components/profile/BookRecomBox";
import BookRecomCreateBox from "components/profile/BookRecomCreateBox";
import MyRecords from "components/profile/MyRecords";

interface PropsType {
  userObj: LogInUserInfo;
}

const Profile = ({ userObj }: PropsType) => {
  const [recommendBook, setRecommendBook] = useState<DocumentType[]>([]);
  const [ownRecord, setOwnRecord] = useState([]);
  const userData = useRecoilValue<LogInUserInfo | null>(currentUserState);

  const getMySubjects = async () => {
    const q = query(
      collection(dbService, "Book_Subjects"),
      where("creatorId", "==", `${userData?.uid}`),
      orderBy("createdAt", "desc")
    );

    const mySubjects: DocumentData[] = [];
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      mySubjects.push(doc.data());
    });
    setOwnRecord(mySubjects);
  };

  useEffect(() => {
    getMySubjects();
    const q = query(
      collection(dbService, "Recommened_Book"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setRecommendBook(newArray as DocumentType[]);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <img
            src={userObj.photoURL === null ? UserIcon : userObj.photoURL}
            alt="profileimg"
          />
          <span>{userObj.displayName}</span>
        </div>
        <div>
          <Subtitle title="나의 기록" />
          <MyRecords />
          <Subtitle title="내가 읽은 책 추천하기" />
          <BookRecomCreateBox uid={userData?.uid} />
          {recommendBook.map(({ text, createdAt, creatorId, id }) => (
            <BookRecomBox
              key={id}
              id={id}
              uid={userData?.uid}
              creatorId={creatorId}
              text={text}
              createdAt={createdAt}
            />
          ))}
        </div>
      </NewContainer>
    </>
  );
};

const NewContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  > div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 140px;
    margin-top: 10px;
    > img {
      object-fit: cover;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: ${(props) => props.theme.container.green};
    }
    > span {
      font-size: 15px;
      font-weight: 700;
      padding-top: 10px;
    }
  }
  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
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

export default Profile;
