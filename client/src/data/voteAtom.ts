import { atom } from 'recoil';

import { BookVote, BookVoteItem } from '@/types';
import { formatDate } from '@/utils';
import { v4 } from 'uuid';

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

export const bookVotesState = atom<BookVote[]>({
  key: `bookVoteDocs/${v4()}`,
  default: null,
});

export const voteItemState = atom<BookVoteItem[]>({
  key: `voteItem${v4()}`,
  default: [],
});
