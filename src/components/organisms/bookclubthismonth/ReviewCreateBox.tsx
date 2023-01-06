import { useState } from 'react';
import { IBookApi } from 'data/bookAtom';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { getFbRoute } from 'util/index';
import useAddDoc from 'hooks/handleFbDoc/useAddDoc';
import styled from 'styled-components';
import PostBtn from 'components/atoms/buttons/PostBtn';

interface PropsType {
  bookInfo: IBookApi;
  docMonth: string;
}

const ReviewCreateBox = ({ bookInfo, docMonth }: PropsType) => {
  const [text, setText] = useState('');
  const collectionName = getFbRoute(docMonth).REVIEW;
  const userData = useRecoilValue(currentUserState);

  const docData = {
    text,
    createdAt: Date.now(),
    creatorId: userData.uid,
    title: bookInfo.title,
    thumbnail: bookInfo.thumbnail,
  };

  const { onAddDocSubmit, onChange } = useAddDoc({
    text,
    setText,
    collectionName,
    docData,
  });

  return (
    <Form onSubmit={onAddDocSubmit}>
      <TextArea
        placeholder='모임에서 가장 인상적이었던 이야기나 모임 후기를 작성해주세요(한 문장도 좋아요!).'
        value={text}
        onChange={onChange}
      />
      <PostBtn value='남기기' />
    </Form>
  );
};

const Form = styled.form`
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.2);
  padding: 10px 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
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
