import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { getFbRoute } from 'util/index';
import { thisMonthClubState } from 'data/documentsAtom';
import useAddDoc from 'hooks/handleFbDoc/useAddDoc';
import styled from 'styled-components';
import PostBtn from 'components/atoms/buttons/PostBtn';
import BookRatingBox from '../BookRatingBox';
interface PropsType {
  docMonth: string;
}

const ReviewCreateBox = ({ docMonth }: PropsType) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState<number | null>(0);
  const clubInfo = useRecoilValue(thisMonthClubState);
  const userData = useRecoilValue(currentUserState);
  const collName = getFbRoute(docMonth).REVIEWS;

  const {
    book: { title, thumbnail },
  } = clubInfo;

  const docData = {
    createdAt: Date.now(),
    creatorId: userData.uid,
    text,
    title,
    thumbnail,
    rating: rating || 0,
  };

  const { onAddDocSubmit, onChange } = useAddDoc({
    setText,
    setRating,
    collName,
    docData,
  });

  return (
    <Form onSubmit={onAddDocSubmit}>
      <BookRatingBox
        thumbnail={thumbnail}
        title={title}
        rating={rating}
        setRating={setRating}
      />
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
  box-shadow: ${(props) => props.theme.boxShadow};
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
