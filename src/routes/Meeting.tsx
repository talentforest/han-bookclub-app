import { currentUserState } from "data/atom";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Container, Header } from "theme/commonStyle";
import { DocumentType } from "components/book/SubjectBox";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import Subtitle from "components/common/Subtitle";
import Title from "components/common/Title";
import ReviewCreateBox from "components/meeting/ReviewCreateBox";
import Reviews from "components/meeting/Reviews";
import styled from "styled-components";

const Meeting = () => {
  const [meetingReviews, setMeetingReviews] = useState<DocumentType[]>([]);
  const userData = useRecoilValue(currentUserState);

  useEffect(() => {
    const q = query(
      collection(dbService, "Meeting_Review"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setMeetingReviews(newArray as DocumentType[]);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <Header>
        <Title title="의 모임" />
      </Header>
      <NewContainer>
        <Subtitle title="모임 일정" />

        <MeetingInfoBox />
        <Subtitle title="모임 후기 작성하기" />
        <ReviewCreateBox uid={userData?.uid} />
        {meetingReviews.map(({ text, createdAt, creatorId, id }) => (
          <Reviews
            key={id}
            id={id}
            uid={userData?.uid}
            creatorId={creatorId}
            text={text}
            createdAt={createdAt}
          />
        ))}
      </NewContainer>
    </>
  );
};

const NewContainer = styled(Container)`
  margin-top: 0;
  padding-top: 0;
`;

export default Meeting;
