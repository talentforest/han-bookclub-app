import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi';

import { cutLetter, formatDate } from '@/utils';

import { ChallengeSentence } from '@/types';

import LikeBtn from '@/components/common/LikeBtn';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import EditorContent from '@/components/common/editor/EditorContent';
import UserImgName from '@/components/common/user/UserImgName';

interface SentenceSlideBoxProps {
  sentence: ChallengeSentence;
}

export default function SentenceSlideBox({ sentence }: SentenceSlideBoxProps) {
  const { text, createdAt, thumbnail, title, creatorId, page } = sentence;

  return (
    <div className="rounded-xl border bg-white p-4">
      <div>
        <div>
          <BookThumbnail thumbnail={thumbnail} title={title} />
          <span className="title">{title}</span>
        </div>

        <UserImgName userId={creatorId} />
      </div>

      <div>
        <BiSolidQuoteLeft className="quote-left" />
        <EditorContent text={cutLetter(text, 260)} />
        <BiSolidQuoteRight className="quote-right" />
      </div>

      <span>p.{page}</span>

      <div>
        <span>{formatDate(createdAt, 'M월 d일 HH:mm')}</span>
        <LikeBtn postLike={sentence} />
      </div>
    </div>
  );
}
