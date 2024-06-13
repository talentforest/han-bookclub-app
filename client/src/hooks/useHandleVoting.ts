import { dbService } from 'fbase';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getCollection, getDocument } from 'api/getFbDoc';
import {
  IBookVote,
  IVoteItemsByMember,
  IVote,
  initialBookVote,
} from 'data/voteAtom';
import { getVoteCountsById, turnVoteToBookVote } from 'util/index';
import { useRecoilValue } from 'recoil';
import { currentUserState } from 'data/userAtom';
import { BOOK_VOTE, VOTEDITEMS_BY_MEMBER, VOTED_ITEMS } from 'constants/index';
import { useNavigate } from 'react-router-dom';
import useAlertAskJoin from './useAlertAskJoin';

interface Props {
  collName: string;
  docId: string;
}

const useHandleVoting = ({ collName, docId }: Props) => {
  const { uid } = useRecoilValue(currentUserState);

  const { anonymous, alertAskJoinMember } = useAlertAskJoin('see');

  const [currentVote, setCurrentVote] = useState<IBookVote>(initialBookVote);

  const [selectedVoteItems, setSelectedVoteItems] = useState([]);

  const [votedItemsByMember, setVotedItemsByMember] = useState([]);

  const [isRevote, setIsRevoting] = useState(false);

  const onToggleRevoteClick = () => setIsRevoting((prev) => !prev);

  const navigate = useNavigate();

  const bookVote: IBookVote =
    collName === BOOK_VOTE
      ? currentVote
      : turnVoteToBookVote(currentVote as unknown as IVote);

  const VoteItemsColl = `${collName}/${docId}/${
    collName === BOOK_VOTE ? VOTEDITEMS_BY_MEMBER : VOTED_ITEMS
  }`;

  useEffect(() => {
    getCollection(VoteItemsColl, setVotedItemsByMember);
    if (docId) {
      getDocument(collName, docId, setCurrentVote);
    }
  }, [collName, docId, setCurrentVote, setVotedItemsByMember]);

  const onVoteDeleteClick = async () => {
    const confirm = window.confirm('정말로 삭제하시겠어요?');

    if (confirm) {
      const currentVoteRef = doc(dbService, collName, docId);
      await deleteDoc(currentVoteRef);
      navigate(-1);
    }
  };

  const onVotingSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (anonymous) return alertAskJoinMember();

    if (selectedVoteItems.length === 0)
      return window.alert('투표할 항목이 선택되지 않았습니다.');

    try {
      const personalVoteRef = doc(dbService, VoteItemsColl, uid);

      await setDoc(personalVoteRef, {
        createdAt: Date.now(),
        votedItem: selectedVoteItems,
      });

      window.alert('투표가 완료되었습니다!');

      if (myVotedItems) {
        onToggleRevoteClick();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 내가 선택한 항목
  const selectedItem = (voteId: number) => {
    return selectedVoteItems.find(({ id }) => id === voteId);
  };

  // 투표 항목 선택 / 해제
  const onVoteItemClick = (voteId: number) => {
    const isSelected = selectedItem(voteId);

    if (isSelected) {
      setSelectedVoteItems(selectedVoteItems.filter(({ id }) => id !== voteId));
    } else {
      setSelectedVoteItems([...selectedVoteItems, { id: voteId }]);
    }
  };

  // 내가 투표완료한 항목
  const myVotedItems: IVoteItemsByMember | undefined = votedItemsByMember?.find(
    ({ id }) => id === uid
  );

  const isMyVotedItems = (voteId: number) => {
    return !!myVotedItems?.votedItem?.find(({ id }) => id === voteId);
  };

  // 항목별 투표수
  const voteCountsById = getVoteCountsById(
    bookVote.voteItems,
    votedItemsByMember
  );

  // 총 투표수
  const totalVoteCount = voteCountsById
    ?.map((item) => item.voteCount)
    ?.reduce((acc, curr) => acc + curr, 0);

  return {
    bookVote,
    votedItemsByMember,
    voteCountsById,
    totalVoteCount,
    selectedItem,
    onVotingSubmit,
    onVoteItemClick,
    myVotedItems,
    isMyVotedItems,
    onVoteDeleteClick,
    isRevote,
    onToggleRevoteClick,
  };
};

export default useHandleVoting;
