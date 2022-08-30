import { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { timestamp } from "util/timestamp";
import {
  IWrittenDocs,
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
  recommend: IWrittenDocs;
  docMonth?: string;
  setShowDetail?: (detail: []) => void;
}

const BookRecomBox = ({ recommend, docMonth, setShowDetail }: PropsType) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(recommend.text);
  const [showingGuide, setShowingGuide] = useState(false);
  const userData = useRecoilValue(currentUserState);

  const RecommendedBookRef = doc(
    dbService,
    `BookMeeting Info/${docMonth}/recommended book`,
    `${recommend.id}`
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
    if (setShowDetail) {
      setShowDetail([]);
    }
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
              <UserInfoBox creatorId={recommend.creatorId} />
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
            {recommend.recommendBookTitle ? (
              <RecommendBook>
                <img
                  src={recommend.recommendBookThumbnail}
                  alt="recommend book"
                />
                <div>
                  <h5>{recommend.recommendBookTitle}</h5>
                  <span>{recommend.recommendBookAuthor?.join(", ")}</span>
                  {recommend.recommendBookUrl && (
                    <a
                      href={recommend.recommendBookUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      상세정보 보러가기
                    </a>
                  )}
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
          <RegisterTime>{timestamp(recommend.createdAt)}</RegisterTime>
        </TextBox>
      ) : (
        <TextBox>
          <FormHeader>
            <UserInfoBox creatorId={recommend.creatorId} />
            {userData.uid === recommend.creatorId && (
              <EditDeleteIcon>
                <Edit role="button" onClick={toggleEditing} />
                <Delete role="button" onClick={onDeleteClick} />
              </EditDeleteIcon>
            )}
          </FormHeader>
          {recommend.recommendBookTitle ? (
            <RecommendBook>
              <img
                src={recommend.recommendBookThumbnail}
                alt="recommend book"
              />
              <div>
                <h5>{recommend.recommendBookTitle}</h5>
                <span>{recommend.recommendBookAuthor?.join(", ")}</span>
                <a
                  href={recommend.recommendBookUrl}
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
          <RegisterTime>{timestamp(recommend.createdAt)}</RegisterTime>
          <BookTitleImgBox
            thumbnail={recommend.thumbnail}
            title={recommend.title}
            smSize={"smSize"}
          />
        </TextBox>
      )}
    </>
  );
};

const RecommendBook = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 5px;
  > img {
    width: auto;
    height: 50px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin-right: 15px;
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
  font-size: 13px;
  color: ${(props) => props.theme.text.gray};
  text-align: end;
`;

export default BookRecomBox;
