import { currentUserState } from "data/atom";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Container, Header } from "theme/commonStyle";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import Subtitle from "components/common/Subtitle";
import Title from "components/common/Title";
import ReviewCreateBox from "components/meeting/ReviewCreateBox";
import Reviews from "components/meeting/Reviews";

export interface MeetingReviewType {
  text: string;
  createdAt: number;
  creatorId: string;
  id: string;
  uid: string;
}

const Meeting = () => {
  const [meetingReviews, setMeetingReviews] = useState<MeetingReviewType[]>([]);
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
      setMeetingReviews(newArray as MeetingReviewType[]);
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
      <Container>
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
      </Container>
    </>
  );
};

export default Meeting;
