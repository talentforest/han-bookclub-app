import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { SENTENCES2024 } from '@/appConstants';

import { ChallengeSentence } from '@/types';

import LikeBtn from '@/components/common/LikeBtn';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import EditorContent from '@/components/common/editor/EditorContent';
import UserImgName from '@/components/common/user/UserImgName';
import PostHandleBtns from '@/components/post/PostHandleBtns';

interface PostSentenceBoxProps {
  sentence: ChallengeSentence;
}

export default function PostSentenceBox({ sentence }: PostSentenceBoxProps) {
  const {
    data: { uid },
  } = useRecoilValue(currAuthUserAtom);

  const { text, thumbnail, title, creatorId, page } = sentence;

  return (
    <div>
      <div>
        <BookThumbnail thumbnail={thumbnail} title={title} />
        <div>
          <h4>{title}</h4>
          {creatorId === uid && (
            <PostHandleBtns
              collName={SENTENCES2024}
              postType="공유하고 싶은 문구"
              post={sentence}
            />
          )}
        </div>

        <BiSolidQuoteLeft className="quote-left" />
        <EditorContent text={text} />
        <BiSolidQuoteRight className="quote-right" />
      </div>

      <span>p.{page}</span>

      <div>
        <UserImgName userId={creatorId} />
        <LikeBtn postLike={sentence} collName={SENTENCES2024} />
      </div>
    </div>
  );
}
