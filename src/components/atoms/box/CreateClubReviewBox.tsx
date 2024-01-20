import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { getFbRoute } from 'util/index';
import { thisMonthClubState } from 'data/documentsAtom';
import useAddDoc from 'hooks/handleFbDoc/useAddDoc';
import styled from 'styled-components';
import PostBtn from 'components/atoms/buttons/PostBtn';
// import RatingBox from 'components/organisms/RatingBox';
import device from 'theme/mediaQueries';

interface PropsType {
  docMonth: string;
}

const CreateClubReviewBox = ({ docMonth }: PropsType) => {
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
      <TextArea
        placeholder='모임 후기나 기록하고 싶은 이야기를 작성해주세요(한 문장도 좋아요!).'
        value={text}
        onChange={onChange}
      />
      <div>
        {/* <RatingBox
          thumbnail={thumbnail}
          title={title}
          rating={rating}
          setRating={setRating}
        /> */}

        <PostBtn value='남기기' />
      </div>
    </Form>
  );
};

const Form = styled.form`
  background-color: ${({ theme }) => theme.container.blue2};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

const TextArea = styled.textarea`
  font-size: 16px;
  width: 100%;
  height: 100px;
  border: none;
  resize: none;
  background-color: ${({ theme }) => theme.container.default};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 8px;

  @media ${device.tablet} {
    height: 150px;
  }
  @media ${device.desktop} {
    height: 150px;
  }
`;

export default CreateClubReviewBox;
