import { getDocument } from 'api/getFbDoc';
import { useEffect, useState } from 'react';
import { getFbRoute } from 'util/index';
import PostRecommendedBookBox from './PostRecommendedBookBox';

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
    publisher: string;
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
    publisher: '',
  },
  text: '',
  thumbnail: '',
  title: '',
};

export default function RecommendedBookBoxById({ docIds }: Props) {
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
    <PostRecommendedBookBox
      recommendedBookDoc={recommendedBook}
      collName={getFbRoute(monthId).RECOMMENDED_BOOKS}
    />
  );
}
