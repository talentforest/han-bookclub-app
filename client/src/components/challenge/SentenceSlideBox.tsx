import LikeBtnWithPeopleInfo from '@/components/common/LikeBtnWithPeopleInfo';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import EditorContent from '@/components/common/editor/EditorContent';
import UserName from '@/components/common/user/UserName';
import { ChallengeSentence } from '@/types';
import { cutLetter, formatDate } from '@/utils';
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi';

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

        <UserName userId={creatorId} />
      </div>

      <div>
        <BiSolidQuoteLeft className="quote-left" />
        <EditorContent text={cutLetter(text, 260)} />
        <BiSolidQuoteRight className="quote-right" />
      </div>

      <span>p.{page}</span>

      <div>
        <span>{formatDate(createdAt)}</span>
        <LikeBtnWithPeopleInfo post={sentence} />
      </div>
    </div>
  );
}
