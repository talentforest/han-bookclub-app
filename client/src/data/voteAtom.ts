import { orderBy } from 'firebase/firestore';

import { atom, atomFamily, selectorFamily } from 'recoil';

import { getCollection, getDocument } from '@/api';

import { BOOK_VOTE, VOTED_ITEMS, isLoadingStatus } from '@/appConstants';

import { formatDate, todayWithHyphen } from '@/utils';

import {
  BookVote,
  BookVoteItem,
  BookVoteItemsByMember,
  LoadableStatus,
} from '@/types';

export const initialBookVote: BookVote = {
  id: '',
  title: '',
  creatorId: '',
  createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
  deadline: '',
  voteItems: [],
};

export const initialBookVoteItem: BookVoteItem = {
  id: 0,
  selectReason: '',
  book: {
    title: '',
    thumbnail: '',
    url: '',
  },
};

export const bookVoteListAtom = atom<LoadableStatus<BookVote[]>>({
  key: 'bookVoteListAtom',
  default: isLoadingStatus,
  effects: [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get') return;
      getCollection(BOOK_VOTE, setSelf, orderBy('createdAt', 'desc'));
    },
  ],
});

export const bookVoteAtomFamily = atomFamily<LoadableStatus<BookVote>, string>({
  key: 'bookVoteAtomFamily',
  default: isLoadingStatus,
  effects: (voteId: string) => [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get' || !voteId) return;
      getDocument(BOOK_VOTE, `VoteId-${voteId}`, setSelf);
    },
  ],
});

export const voteMemberListAtomFamily = atomFamily<
  LoadableStatus<BookVoteItemsByMember[]>,
  string
>({
  key: 'voteMemberListAtomFamily',
  default: isLoadingStatus,
  effects: (voteId: string) => [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get' || !voteId) return;
      getCollection(`${BOOK_VOTE}/VoteId-${voteId}/${VOTED_ITEMS}`, setSelf);
    },
  ],
});

export const bookVotesSelector = selectorFamily<
  BookVote[],
  'progress' | 'expired'
>({
  key: 'bookVotesSelector',
  get:
    (type: 'progress' | 'expired') =>
    ({ get }) => {
      const { status, data } = get(bookVoteListAtom);
      if (status === 'isLoading') return [];

      const result = data?.filter(vote => {
        if (type === 'progress') return vote.deadline >= todayWithHyphen;
        return vote.deadline < todayWithHyphen;
      });

      return result;
    },
});
