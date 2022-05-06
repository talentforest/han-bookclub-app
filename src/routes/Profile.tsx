import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Header } from "theme/globalStyle";
import { ReactComponent as SettingIcon } from "assets/settings.svg";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/atom";
import { AuthUser } from "../data/atom";
import { dbService, storageService } from "fbase";
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
import CategoryButton from "components/profile/CategoryButton";
import { ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";

interface PropsType {
  loggedInUserObj: any;
}

const Profile = ({ loggedInUserObj }: PropsType) => {
  const [ownRecord, setOwnRecord] = useState([]);
  const [category, setCategory] = useState("byBook");
  const [attachment, setAttachment] = useState(null);
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

    setOwnRecord(ownSubjects);
  };

  useEffect(() => {
    getMySubjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { files },
    } = event;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      setAttachment(result);
    };

    reader.readAsDataURL(theFile);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fileRef = ref(storageService, `${loggedInUserObj.uid}/${v4()}`);
    const response = await uploadString(fileRef, attachment, "data_url");
    console.log(response);
  };

  const onClearAttachmentClick = () => setAttachment(null);
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
        <form onSubmit={onSubmit}>
          <input type="file" accept="image/*" onChange={onFileChange} />
          <input type="submit" value="Upload" />
          {attachment && (
            <div>
              <img
                src={attachment}
                width="auto"
                height="50px"
                alt="user file"
              />
              <button onClick={onClearAttachmentClick}>Clear</button>
            </div>
          )}
        </form>
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
