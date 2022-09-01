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
import UserInfoBox from "components/common/UserInfoBox";
import styled from "styled-components";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import device from "theme/mediaQueries";

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
        <Form onSubmit={onEditSubmit}>
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
          <RegisterTime>{timestamp(recommend.createdAt)}</RegisterTime>
        </Form>
      ) : (
        <Form>
          <FormHeader>
            <UserInfoBox creatorId={recommend.creatorId} />
            {userData.uid === recommend.creatorId && (
              <EditDeleteIcon>
                <Edit role="button" onClick={toggleEditing} />
                <Delete role="button" onClick={onDeleteClick} />
              </EditDeleteIcon>
            )}
          </FormHeader>
          {recommend.recommendBookTitle && (
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
          )}
          <pre>{newText}</pre>
          <RegisterTime>{timestamp(recommend.createdAt)}</RegisterTime>
          <BookTitleImgBox
            thumbnail={recommend.thumbnail}
            title={recommend.title}
            smSize={"smSize"}
          />
        </Form>
      )}
    </>
  );
};

export const Form = styled.form`
  padding: 15px 10px 20px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  &:last-child {
    border: none;
  }
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1.6;
    font-size: 16px;
    min-height: 60px;
    margin: 10px 0;
  }
  @media ${device.tablet} {
    padding: 20px 10px 25px;
    font-size: 16px;
    pre {
      font-size: 18px;
      min-height: 80px;
    }
  }
`;

export const TextArea = styled.textarea`
  font-size: 16px;
  width: 100%;
  white-space: pre-wrap;
  word-wrap: break-word;
  border: none;
  border-radius: 5px;
  height: 100px;
  line-height: 1.6;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  resize: none;
  &:focus {
    outline: none;
  }
  @media ${device.tablet} {
    font-size: 18px;
    min-height: 100px;
  }
`;

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
  @media ${device.tablet} {
    padding: 15px;
    > img {
      height: 65px;
    }
    > div {
      font-size: 16px;
    }
  }
`;

const RegisterTime = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.text.gray};
  text-align: end;
  @media ${device.tablet} {
    font-size: 15px;
  }
`;

export default BookRecomBox;
