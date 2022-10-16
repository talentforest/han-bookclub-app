import { currentUserState } from "data/userAtom";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import useAddDoc from "hooks/useAddDoc";
import styled from "styled-components";
import device from "theme/mediaQueries";

const UpdateCreateBox = () => {
  const [text, setText] = useState("");
  const [requestType, setRequestType] = useState("bug");
  const userData = useRecoilValue(currentUserState);
  const collectionName = "Update Request";

  const docData = {
    text,
    createdAt: Date.now(),
    creatorId: userData.uid,
    type: requestType,
  };

  const { onAddDocSubmit } = useAddDoc({
    text,
    setText,
    collectionName,
    docData,
  });

  const onRequestChange = (
    event: React.FormEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = event.currentTarget;

    if (name === "request") {
      setText(event.currentTarget.value);
    }
    if (name === "request-type") {
      setRequestType(event.currentTarget.value);
    }
  };

  return (
    <Form onSubmit={onAddDocSubmit}>
      <textarea
        name="request"
        placeholder="앱에서 불편한 점을 발견하셨거나 추가되었으면 하는 기능이 있다면 여기에 이야기해주세요."
        value={text}
        onChange={onRequestChange}
      />
      <Bottom>
        <select name="request-type" onChange={onRequestChange}>
          <option value="bug">불편사항 수정</option>
          <option value="feature">기능 추가</option>
        </select>
        <button type="submit">요청하기</button>
      </Bottom>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 30px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  textarea {
    font-size: 16px;
    resize: none;
    width: 100%;
    height: 100px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.container.default};
    &:focus {
      outline: none;
    }
  }
  @media ${device.tablet} {
    textarea {
      font-size: 18px;
      height: 100px;
      padding: 15px;
      border-radius: 10px;
    }
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  select {
    font-size: 16px;
    border-radius: 5px;
    padding: 0 4px;
    color: ${(props) => props.theme.text.gray};
    border: 1px solid ${(props) => props.theme.text.lightGray};
    &:focus {
      outline: none;
    }
  }
  button {
    font-size: 16px;
    cursor: pointer;
    padding: 3px 5px;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.text.lightGray};
    background-color: ${(props) => props.theme.container.lightBlue};
    color: ${(props) => props.theme.text.accent};
  }
  @media ${device.tablet} {
    padding: 10px 15px 5px;
    select {
      font-size: 16px;
    }
    button {
      font-size: 16px;
      padding: 5px;
    }
  }
`;

export default UpdateCreateBox;
