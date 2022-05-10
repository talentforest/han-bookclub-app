import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Header } from "theme/commonStyle";
import { ReactComponent as SettingIcon } from "assets/settings.svg";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/atom";
import { dbService } from "fbase";
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
import ProfileImage from "components/common/ProfileImage";
import Subtitle from "components/common/Subtitle";
import ByBook from "components/profile/ByBook";
import ByRecord from "components/profile/ByRecord";
import CategoryButton from "components/profile/CategoryButton";
import BookRecommendationBox from "components/profile/BookRecommendationBox";
import BookRecommendationCreateBox from "components/profile/BookRecommendationCreateBox";
import { LogInUserInfo } from "components/App";
import { DocumentType } from "components/book/SubjectBox";

interface PropsType {
  loggedInUserObj: LogInUserInfo;
}

export interface recommendBookType extends DocumentType {
  attachmentUrl: string;
}

const Profile = ({ loggedInUserObj }: PropsType) => {
  const [recommendBook, setRecommendBook] = useState<recommendBookType[]>([]);
  const [ownRecord, setOwnRecord] = useState([]);
  const [category, setCategory] = useState("byBook");
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
      collection(dbService, "Books_I_recommened"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setRecommendBook(newArray as recommendBookType[]);
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
        <ProfileImage />
        <Subtitle title="나의 기록" />
        <CategoryButton category={category} setCategory={setCategory} />
        {category === "byBook" && <ByBook />}
        {category === "byRecord" && (
          <div>
            {ownRecord.map((item) => (
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
        <BookRecommendationCreateBox
          loggedInUserObj={loggedInUserObj}
          uid={userData?.uid}
        />
        <div>
          {recommendBook.map(
            ({ text, createdAt, creatorId, id, attachmentUrl }) => (
              <BookRecommendationBox
                key={id}
                id={id}
                uid={userData?.uid}
                creatorId={creatorId}
                text={text}
                createdAt={createdAt}
                attachmentUrl={attachmentUrl}
              />
            )
          )}
        </div>
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

export default Profile;
