import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Header } from "theme/globalStyle";
import { ReactComponent as SettingIcon } from "assets/settings.svg";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/atom";
import { AuthUser } from "../data/atom";
import { dbService, storageService } from "fbase";
import { ReactComponent as LinkIcon } from "assets/link.svg";
import { ReactComponent as CloseIcon } from "assets/close.svg";
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
        <FileForm onSubmit={onSubmit}>
          <div>
            <input
              id="input-file"
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
            <label htmlFor="input-file">
              <span>파일 찾기</span>
              <LinkIcon />
            </label>
            <span>이미지는 최대 한 장만 등록 가능합니다.</span>
          </div>
          {attachment && (
            <SubmmitedFile>
              <img src={attachment} alt="user file" />
              <button onClick={onClearAttachmentClick}>
                <CloseIcon />
              </button>
            </SubmmitedFile>
          )}
          <input type="submit" value="Upload" />
        </FileForm>
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

const FileForm = styled.form`
  > div:first-child {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    input:first-child {
      display: none;
    }
    label {
      width: 100%;
      font-size: 12px;
      padding: 3px 10px;
      border-radius: 5px;
      border: 1px solid ${(props) => props.theme.text.lightGray};
      height: 30px;
      border-radius: 5px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${(props) => props.theme.text.gray};
      svg {
        width: 14px;
        height: 14px;
        fill: ${(props) => props.theme.text.gray};
      }
      span {
        font-size: 12px;
      }
    }
    > span {
      font-size: 10px;
      color: ${(props) => props.theme.text.gray};
      margin-left: 7px;
    }
  }
  input {
    background-color: transparent;
    color: ${(props) => props.theme.text.accent};
    border: none;
    width: 100%;
    margin: 5px 0;
    border-radius: 5px;
    font-size: 12px;
    height: 26px;
    background-color: ${(props) => props.theme.container.lightBlue};
  }
`;

const SubmmitedFile = styled.div`
  margin: 10px 0;
  display: flex;
  position: relative;
  width: fit-content;
  img {
    height: 60px;
    width: auto;
  }
  button {
    position: absolute;
    border: none;
    background-color: transparent;
    width: fit-content;
    right: -5px;
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export default Profile;
