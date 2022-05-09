import { currentUserState } from "data/atom";
import { dbService, storageService } from "fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { v4 } from "uuid";
import { ReactComponent as CameraIcon } from "assets/camera.svg";
import styled from "styled-components";

const ProfileImage = () => {
  const [imageUrl, setImageUrl] = useState("");

  const fileInput = useRef(null);
  const userData = useRecoilValue(currentUserState);

  useEffect(() => {
    const q = query(
      collection(dbService, "User_Project"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setImageUrl(newArray as any);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let attachmentUrl = "";
    if (imageUrl !== "") {
      const fileRef = ref(storageService, `${userData.uid}/${v4()}`);
      const response = await uploadString(fileRef, imageUrl, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }

    try {
      await addDoc(collection(dbService, "User_Profile"), {
        attachmentUrl,
      });
    } catch (error) {
      console.error("Error adding document:", error);
    }

    // setImageUrl("");
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { files },
    } = event;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onload = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      setImageUrl(result as string);
    };
    reader.readAsDataURL(theFile);
  };

  return (
    <Form onSubmit={onSubmit}>
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/jpg,impge/png,image/jpeg"
        name="profile_img"
        onChange={onChange}
        ref={fileInput}
      />
      <div>
        <img
          src={imageUrl}
          alt="profileimg"
          onClick={() => {
            fileInput.current.click();
          }}
        />
        <button
          onClick={() => {
            fileInput.current.click();
          }}
        >
          <CameraIcon />
        </button>
      </div>
      {/* <button type="submit">사진 수정완료</button> */}
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: center;
  > div {
    position: relative;
    > img {
      object-fit: cover;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin-top: 10px;
      background-color: ${(props) => props.theme.container.lightBlue};
    }
    > button {
      position: absolute;
      right: 8px;
      bottom: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: none;
      background-color: ${(props) => props.theme.container.lightBlue};
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

export default ProfileImage;
