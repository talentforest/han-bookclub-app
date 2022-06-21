import { currentUserState } from "data/userAtom";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

interface PropsType {
  request: string;
  setRequest: (request: string) => void;
}

const UpdateCreateBox = ({ request, setRequest }: PropsType) => {
  const [requestType, setRequestType] = useState("bug");
  const userData = useRecoilValue(currentUserState);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (request === "") return;
      await addDoc(collection(dbService, "Update Request"), {
        request: request,
        createdAt: Date.now(),
        creatorId: userData.uid,
        type: requestType,
      });
    } catch (error) {
      console.error("Error adding document:", error);
    }
    setRequest("");
  };

  const onChange = (
    event: React.FormEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = event.currentTarget;
    if (name === "request") {
      setRequest(event.currentTarget.value);
    }
    if (name === "request-type") {
      setRequestType(event.currentTarget.value);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <textarea
        name="request"
        placeholder="앱에서 오류를 발견하셨거나 추가되었으면 하는 기능이 있다면 여기에 이야기해주세요."
        value={request}
        onChange={onChange}
      />
      <div>
        <select name="request-type" onChange={onChange}>
          <option value="bug">버그 수정</option>
          <option value="feature">기능 추가</option>
        </select>
        <button type="submit">요청하기</button>
      </div>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-bottom: 30px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  textarea {
    resize: none;
    width: 100%;
    height: 80px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.container.default};
    &:focus {
      outline: none;
    }
  }
  > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    select {
      border-radius: 5px;
      padding: 0 4px;
      color: ${(props) => props.theme.text.gray};
      border: 1px solid ${(props) => props.theme.text.lightGray};
      &:focus {
        outline: none;
      }
    }
    button {
      cursor: pointer;
      padding: 3px 5px;
      border-radius: 5px;
      border: 1px solid ${(props) => props.theme.text.lightGray};
      background-color: ${(props) => props.theme.container.lightBlue};
      color: ${(props) => props.theme.text.accent};
    }
  }
`;

export default UpdateCreateBox;
