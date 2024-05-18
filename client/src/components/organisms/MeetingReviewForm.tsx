import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { thisMonthBookClubState } from 'data/bookClubAtom';
import { getFbRoute } from 'util/index';
import useAddDoc from 'hooks/handleFbDoc/useAddDoc';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import SquareBtn from '../atoms/button/SquareBtn';
import useSendPushNotification from 'hooks/useSendPushNotification';

interface PropsType {
  docMonth: string;
}

const MeetingReviewForm = ({ docMonth }: PropsType) => {
  const [text, setText] = useState('');
  const clubInfo = useRecoilValue(thisMonthBookClubState);
  const userData = useRecoilValue(currentUserState);

  const { sendPostNotification } = useSendPushNotification();

  const collName = getFbRoute(docMonth).MEETING_REVIEWS;

  const {
    book: { title, thumbnail },
  } = clubInfo;

  const docData = {
    createdAt: Date.now(),
    creatorId: userData.uid,
    text,
    title,
    thumbnail,
  };

  const { onAddDocSubmit, onChange } = useAddDoc({
    setText,
    collName,
    docData,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddDocSubmit(event);
    sendPostNotification('모임 후기');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        placeholder='모임 후기나 기록하고 싶은 이야기를 작성해주세요(한 문장도 좋아요!).'
        value={text}
        onChange={onChange}
      />
      <div>
        <SquareBtn name='남기기' type='submit' />
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

export default MeetingReviewForm;
