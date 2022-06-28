import { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { timestamp } from "util/timestamp";
import {
  DocumentType,
  DoneBtn,
  EditDeleteIcon,
  FormHeader,
  GuideTextBox,
} from "components/bookmeeting/Subjects";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { Delete, Edit } from "@mui/icons-material";
import { TextArea, TextBox } from "./Reviews";
import UserInfoBox from "components/common/UserInfoBox";
import styled from "styled-components";
import BookTitleImgBox from "components/common/BookTitleImgBox";

interface PropsType {
  item: DocumentType;
  lastDocMonth: string;
}

const BookRecomBox = ({ item, lastDocMonth }: PropsType) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);
  const [showingGuide, setShowingGuide] = useState(false);
  const userData = useRecoilValue(currentUserState);

  const RecommendedBookRef = doc(
    dbService,
    `BookMeeting Info/${lastDocMonth}/recommended book`,
    `${item.id}`
  );

  const onEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateDoc(RecommendedBookRef, { text: newText });
    if (newText === "") {
      setTimeout(() => {
        setShowingGuide((toggle) => !toggle);
      }, 1000);
      setShowingGuide((toggle) => !toggle);
      setEditing(true);
    } else {
      setShowingGuide(false);
      setEditing(false);
    }
  };

  const onDeleteClick = async () => {
    await deleteDoc(RecommendedBookRef);
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setNewText(event.currentTarget.value);
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <>
      {editing ? (
        <TextBox>
          <form onSubmit={onEditSubmit}>
            <FormHeader>
              <UserInfoBox creatorId={item.creatorId} />
              {showingGuide && (
                <GuideTextBox>
                  한 글자 이상 작성해주세요. <div></div>
                </GuideTextBox>
              )}
              {showingGuide ? (
                <DoneBtn type="submit" value="수정완료" eventdone />
              ) : (
                <DoneBtn type="submit" value="수정완료" />
              )}
            </FormHeader>
            {item.recommendBookTitle ? (
              <RecommendBook>
                <img src={item.recommendBookThumbnail} alt="recommend book" />
                <div>
                  <h5>{item.recommendBookTitle}</h5>
                  <span>{item.recommendBookAuthor?.join(", ")}</span>
                  <a
                    href={item.recommendBookUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    상세정보 보러가기
                  </a>
                </div>
              </RecommendBook>
            ) : (
              <></>
            )}
            <TextArea
              value={newText}
              placeholder="수정해주세요."
              onChange={onChange}
            />
          </form>
          <RegisterTime>{timestamp(item.createdAt)}</RegisterTime>
        </TextBox>
      ) : (
        <TextBox>
          <FormHeader>
            <UserInfoBox creatorId={item.creatorId} />
            {userData.uid === item.creatorId && (
              <EditDeleteIcon>
                <Edit role="button" onClick={toggleEditing} />
                <Delete role="button" onClick={onDeleteClick} />
              </EditDeleteIcon>
            )}
          </FormHeader>
          {item.recommendBookTitle ? (
            <RecommendBook>
              <img src={item.recommendBookThumbnail} alt="recommend book" />
              <div>
                <h5>{item.recommendBookTitle}</h5>
                <span>{item.recommendBookAuthor?.join(", ")}</span>
                <a
                  href={item.recommendBookUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  상세정보 보러가기
                </a>
              </div>
            </RecommendBook>
          ) : (
            <></>
          )}
          <pre>{newText}</pre>
          <RegisterTime>{timestamp(item.createdAt)}</RegisterTime>
          <BookTitleImgBox docData={item} smSize={"smSize"} />
        </TextBox>
      )}
    </>
  );
};

const RecommendBook = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  > img {
    width: auto;
    height: 50px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin-right: 10px;
  }
  > div {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    > h5 {
      font-weight: 700;
    }
    > a {
      color: ${(props) => props.theme.text.accent};
    }
  }
`;

const RegisterTime = styled.div`
  font-size: 10px;
  color: ${(props) => props.theme.text.gray};
  text-align: end;
`;

export default BookRecomBox;
