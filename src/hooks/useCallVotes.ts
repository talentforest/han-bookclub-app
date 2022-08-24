import { votesState } from "data/documentsAtom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getVotes } from "util/getFirebaseDoc";

const useCallVotes = () => {
  const [votes, setVotes] = useRecoilState(votesState);

  const getAllVotes = () => {
    if (votes.length) {
      return;
    } else {
      getVotes(setVotes);
    }
  };

  useEffect(() => {
    getAllVotes();

    return () => {
      getAllVotes();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    votes,
  };
};

export default useCallVotes;
