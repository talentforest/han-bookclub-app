import { setting } from "util/sliderSetting";
import {
  DoneBtn,
  EditDeleteIcon,
  GuideTextBox,
  IWrittenDocs,
} from "components/bookmeeting/Subjects";
import { timestamp } from "util/timestamp";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { currentUserState } from "data/userAtom";
import UserInfoBox from "components/common/UserInfoBox";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { Delete, Edit } from "@mui/icons-material";
import device from "theme/mediaQueries";

interface PropsType {
  finalReview: IWrittenDocs;
  docMonth: string;
  onRemove?: (targetId: string) => void;
}

const FinalReview = ({ finalReview, docMonth, onRemove }: PropsType) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(finalReview.text);
  const [showingGuide, setShowingGuide] = useState(false);
  const userData = useRecoilValue(currentUserState);

  const finalReviewRef = doc(
    dbService,
    `BookMeeting Info/${docMonth}/presenter's review`,
    `${finalReview.id}`
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!docMonth) {
      await updateDoc(finalReviewRef, { text: newText });
    } else {
      await updateDoc(finalReviewRef, { text: newText });
    }
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
    await deleteDoc(finalReviewRef);
    if (onRemove) {
      onRemove(finalReview.id);
    }
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setNewText(event.currentTarget.value);
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  function calculatePageNumbers(textLength: number) {
    return Math.ceil(textLength / 435);
  }

  function makePageNumberArray(textLength: number) {
    return Array.from(
      { length: calculatePageNumbers(textLength) },
      (item, index) => index
    );
  }

  function sliceTextToFitPage(text: string, pageNumber: number) {
    return text.slice(435 * pageNumber, 435 * pageNumber + 435);
  }

  return (
    <Article>
      {editing ? (
        <form onSubmit={onSubmit}>
          <DocInfo>
            <UserInfoBox creatorId={finalReview.creatorId} />
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
          </DocInfo>

          <Slider {...setting}>
            {makePageNumberArray(finalReview.text.length).map((pageNumber) => (
              <Page key={pageNumber}>
                <textarea
                  value={newText}
                  placeholder="발제문을 수정해주세요."
                  onChange={onChange}
                >
                  {sliceTextToFitPage(finalReview.text, pageNumber)}
                </textarea>
                <div>
                  {pageNumber + 1} /{" "}
                  {calculatePageNumbers(finalReview.text.length)}
                </div>
              </Page>
            ))}
          </Slider>
          <span>{timestamp(finalReview.createdAt)}</span>
        </form>
      ) : (
        <form>
          <DocInfo>
            <UserInfoBox creatorId={finalReview.creatorId} />
            {userData.uid === finalReview.creatorId && (
              <EditDeleteIcon>
                <Edit role="button" onClick={toggleEditing} />
                <Delete role="button" onClick={onDeleteClick} />
              </EditDeleteIcon>
            )}
          </DocInfo>
          <Slider {...setting}>
            {makePageNumberArray(finalReview.text.length).map((pageNumber) => (
              <Page key={pageNumber}>
                <pre>{sliceTextToFitPage(newText, pageNumber)}</pre>
                <div>
                  {pageNumber + 1} / {calculatePageNumbers(newText.length)}
                </div>
              </Page>
            ))}
          </Slider>
          <span>{timestamp(finalReview.createdAt)}</span>
        </form>
      )}
    </Article>
  );
};

const Article = styled.article`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  width: 100%;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.container.default};
  border-radius: 5px;
  .slick-slider {
    margin: 0 -10px;
    padding: 5px 0;
  }
  .slick-slide {
    padding: 0 10px;
  }
  > form {
    > span {
      color: ${(props) => props.theme.text.gray};
      font-size: 14px;
      display: block;
      text-align: end;
    }
  }
  @media ${device.tablet} {
    padding: 20px 40px;
    > form {
      > span {
        font-size: 16px;
      }
    }
  }
`;

const DocInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > span {
    font-size: 12px;
    color: ${(props) => props.theme.text.gray};
  }
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
  > textarea {
    width: 100%;
    min-height: 350px;
    padding: 5px;
    white-space: pre-wrap;
    word-wrap: break-word;
    resize: none;
    border: none;
    line-height: 1.6;
    font-size: 16px;
    &:focus {
      outline: none;
    }
  }
  > pre {
    width: 100%;
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1.6;
    font-size: 16px;
    min-height: 350px;
    padding: 5px;
  }
  > div {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    font-size: 14px;
    color: ${(props) => props.theme.text.accent};
  }
  @media ${device.tablet} {
    > pre {
      line-height: 1.8;
    }
    > div {
      font-size: 16px;
    }
  }
`;

export default FinalReview;
