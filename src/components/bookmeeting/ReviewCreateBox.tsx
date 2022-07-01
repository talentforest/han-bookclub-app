import { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { SubmitBtn } from "theme/commonStyle";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { currentUserState } from "data/userAtom";
import { BookDocument } from "data/bookAtom";

interface PropsType {
  bookInfo: BookDocument;
  docMonth: string;
}

const ReviewCreateBox = ({ bookInfo, docMonth }: PropsType) => {
  const userData = useRecoilValue(currentUserState);
  const [review, setReview] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (review === "") return;
      await addDoc(
        collection(dbService, `BookMeeting Info/${docMonth}/reviews`),
        {
          text: review,
          createdAt: Date.now(),
          creatorId: userData.uid,
          title: bookInfo.title,
          thumbnail: bookInfo.thumbnail,
        }
      );
    } catch (error) {
      console.error("Error adding document:", error);
    }
    setReview("");
  };

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setReview(event.currentTarget.value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        placeholder="모임에서 가장 인상적이었던 이야기나 모임 후기를 작성해주세요(한 문장도 좋아요!)."
        value={review}
        onChange={onChange}
      />
      <Button>
        <SubmitBtn type="submit" value="남기기" />
      </Button>
    </Form>
  );
};

const Form = styled.form`
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.2);
  padding: 10px 15px 0px;
  border-radius: 10px;
  margin: 20px 0 15px;
`;

const Button = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  -webkit-justify-content: end;
  padding: 0px 0 10px;
`;

const TextArea = styled.textarea`
  font-size: 16px;
  width: 100%;
  height: 100px;
  border: none;
  resize: none;
  &::placeholder {
    line-height: 22px;
  }
  &:focus {
    outline: none;
  }
`;

export default ReviewCreateBox;
