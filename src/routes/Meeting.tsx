import MeetingInfoBox from "components/common/MeetingInfoBox";
import Subtitle from "components/common/Subtitle";
import Title from "components/common/Title";
import ReviewCreateBox from "components/meeting/ReviewCreateBox";
import Reviews from "components/meeting/Reviews";
import { Container, Header } from "theme/globalStyle";

const Meeting = () => {
  return (
    <>
      <Header>
        <Title title="의 모임" />
      </Header>
      <Container>
        <MeetingInfoBox />
        <Subtitle title="모임 후기 작성하기" />
        <ReviewCreateBox />
        <Reviews />
        <Reviews />
        <Reviews />
      </Container>
    </>
  );
};

export default Meeting;
