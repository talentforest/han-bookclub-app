import { useState } from "react";
import { timestamp } from "util/timestamp";
import { IWrittenDocs, FormHeader } from "components/common/SubjectBox";
import UserInfoBox from "components/common/UserInfoBox";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import useEditDeleteDoc from "hooks/useEditDeleteDoc";
import EditDeleteButton from "./EditDeleteButton";
import styled from "styled-components";
import device from "theme/mediaQueries";

interface PropsType {
  recommend: IWrittenDocs;
  docMonth?: string;
  setShowDetail?: (detail: []) => void;
}

const RecommandBox = ({ recommend, docMonth, setShowDetail }: PropsType) => {
  const [newText, setNewText] = useState(recommend.text);
  const [editing, setEditing] = useState(false);
  const collectionName = `BookMeeting Info/${docMonth}/recommended book`;

  const { showingGuide, onNewTextSubmit, onDeleteClick, onNewTextChange } =
    useEditDeleteDoc({
      docId: recommend.id,
      newText,
      setNewText,
      collectionName,
      setEditing,
    });

  const HandleDeleteClick = async () => {
    onDeleteClick();
    if (setShowDetail) {
      setShowDetail([]);
    }
  };

  return (
    <>
      {editing ? (
        <Form onSubmit={onNewTextSubmit}>
          <FormHeader>
            <UserInfoBox creatorId={recommend.creatorId} />
            <EditDeleteButton
              editing={editing}
              showingGuide={showingGuide}
              creatorId={recommend.creatorId}
              onDeleteClick={HandleDeleteClick}
              toggleEditing={() => setEditing((prev) => !prev)}
            />
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
            onChange={onNewTextChange}
          />
          <RegisterTime>{timestamp(recommend.createdAt)}</RegisterTime>
        </Form>
      ) : (
        <Form>
          <FormHeader>
            <UserInfoBox creatorId={recommend.creatorId} />
            <EditDeleteButton
              editing={editing}
              showingGuide={showingGuide}
              creatorId={recommend.creatorId}
              onDeleteClick={HandleDeleteClick}
              toggleEditing={() => setEditing((prev) => !prev)}
            />
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

export default RecommandBox;