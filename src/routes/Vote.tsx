import { AddCircleOutline } from "@mui/icons-material";
import { Overlay } from "components/bookmeeting/SubjectCreateModal";
import Title from "components/common/Title";
import VoteBox from "components/common/VoteBox";
import VoteCreateBox from "components/vote/VoteCreateBox";
import { useEffect, useState } from "react";
import { ButtonHeader, Container } from "theme/commonStyle";
import { getVote } from "util/getFirebaseDoc";

const Vote = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [voteDoc, setVoteDoc] = useState([]);

  useEffect(() => {
    getVote(setVoteDoc);
    return () => {
      getVote(setVoteDoc);
    };
  }, []);

  const onClick = () => {
    setModalOpen((prev) => !prev);
  };
  return (
    <>
      <ButtonHeader>
        <Title title="의 투표" />
        <button onClick={onClick}>
          <AddCircleOutline />
          투표 등록하기
        </button>
      </ButtonHeader>
      <Container>
        {modalOpen && (
          <section>
            <Overlay onClick={onClick} />
            <VoteCreateBox setModalOpen={setModalOpen} />
          </section>
        )}
        {voteDoc.map((item, index) => (
          <VoteBox key={item.id} item={item} index={index} />
        ))}
      </Container>
    </>
  );
};

export default Vote;
