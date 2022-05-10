import { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { SubmitBtn } from "theme/commonStyle";
import { LogInUserInfo } from "components/App";
import styled from "styled-components";

const ReviewCreateBox = ({ uid }: LogInUserInfo) => {
  const [review, setReview] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (review === "") return;
    try {
      await addDoc(collection(dbService, "Meeting_Review"), {
        text: review,
        createdAt: Date.now(),
        creatorId: uid,
      });
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
        placeholder="모임에서 가장 기억에 남았던 후기를 작성해주세요(한 문장도 좋아요!)."
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
  padding: 10px 15px 5px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const Button = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 10px 0;
`;

const TextArea = styled.textarea`
  font-size: 13px;
  width: 100%;
  height: 60px;
  border: none;
  &::placeholder {
    line-height: 22px;
  }
  &:focus {
    outline: none;
  }
`;

export default ReviewCreateBox;
