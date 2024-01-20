import { getDocument } from 'api/getFbDoc';
import { useEffect, useState } from 'react';
import { getFbRoute } from 'util/index';
import PostRecommendedBook from '../post/PostRecommendedBook';

interface Props {
  docIds: { docId: string; monthId: string };
}

interface RecommendedBook {
  createdAt: number;
  creatorId: string;
  id: string;
  likeUsers: string[];
  likes: number;
  recommendedBook: {
    authors: string[];
    thumbnail: string;
    title: string;
    url: string;
  };
  text: string;
  thumbnail: string;
  title: string;
}

const initialValue = {
  createdAt: 0,
  creatorId: '',
  id: '',
  likeUsers: [''],
  likes: 0,
  recommendedBook: {
    authors: [''],
    thumbnail: '',
    title: '',
    url: '',
  },
  text: '',
  thumbnail: '',
  title: '',
};

export default function RecommendedBookBox({ docIds }: Props) {
  const [recommendedBook, setRecommendedBook] =
    useState<RecommendedBook>(initialValue);

  const { docId, monthId } = docIds;

  const year = monthId.slice(0, 4);

  useEffect(() => {
    getDocument(
      `BookClub-${year}/${monthId}/RecommendedBooks/`,
      docId,
      setRecommendedBook
    );
  }, []);

  return (
    <PostRecommendedBook
      recommendedBookDoc={recommendedBook}
      collName={getFbRoute(monthId).RECOMMENDED_BOOKS}
    />
  );
}
